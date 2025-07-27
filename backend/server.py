from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import stripe
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe configuration
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY', 'sk_test_placeholder')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class CartItem(BaseModel):
    productId: int
    variantId: int
    name: str
    price: str
    quantity: int
    image: Optional[str] = None

class Customer(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    name: Optional[str] = None

class ShippingRate(BaseModel):
    id: str
    name: str
    rate: str
    currency: str

class CheckoutSessionRequest(BaseModel):
    items: List[CartItem]
    customer: Optional[Customer] = None
    shipping: Optional[ShippingRate] = None

class ShippingRatesRequest(BaseModel):
    recipient: dict
    items: List[CartItem]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    try:
        # Calculate total amount
        total_amount = sum(float(item.price) * item.quantity for item in request.items)
        
        # Convert to cents for Stripe
        amount_cents = int(total_amount * 100)
        
        # Create line items for Stripe
        line_items = []
        for item in request.items:
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item.name,
                        'images': [item.image] if item.image else [],
                    },
                    'unit_amount': int(float(item.price) * 100),
                },
                'quantity': item.quantity,
            })
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='https://14b92af9-950e-48b4-b5b1-395e2a81fc29.preview.emergentagent.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='https://14b92af9-950e-48b4-b5b1-395e2a81fc29.preview.emergentagent.com/',
            customer_email=request.customer.email if request.customer and request.customer.email else None,
        )
        
        return {
            "success": True,
            "sessionId": session.id,
            "url": session.url
        }
    except Exception as e:
        logging.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/printful/products")
async def get_printful_products():
    try:
        headers = {
            'Authorization': f'Bearer {os.environ.get("PRINTFUL_API_TOKEN", "")}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get('https://api.printful.com/store/products', headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch products from Printful")
            
    except Exception as e:
        logging.error(f"Error fetching Printful products: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/shipping-rates")
async def get_shipping_rates(request: ShippingRatesRequest):
    try:
        # Mock shipping rates for now - in production you'd calculate real rates
        rates = [
            {
                "id": "standard",
                "name": "Standard Shipping",
                "rate": "5.99",
                "currency": "USD"
            },
            {
                "id": "express",
                "name": "Express Shipping",
                "rate": "12.99",
                "currency": "USD"
            }
        ]
        
        return {
            "success": True,
            "rates": rates
        }
    except Exception as e:
        logging.error(f"Error getting shipping rates: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
