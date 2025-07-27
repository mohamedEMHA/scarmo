#!/usr/bin/env python3
"""
SCARMO E-commerce Backend API Testing Suite
Tests all backend endpoints for functionality and proper responses
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from environment
BACKEND_URL = "https://14b92af9-950e-48b4-b5b1-395e2a81fc29.preview.emergentagent.com"
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.session = requests.Session()
        # Set headers for CORS testing
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Origin': 'https://14b92af9-950e-48b4-b5b1-395e2a81fc29.preview.emergentagent.com'
        })
    
    def log_result(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_basic_api_root(self):
        """Test GET /api/ endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_result("Basic API Root", True, "Root endpoint returns correct message")
                else:
                    self.log_result("Basic API Root", False, f"Unexpected response: {data}")
            else:
                self.log_result("Basic API Root", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Basic API Root", False, f"Request failed: {str(e)}")
    
    def test_status_endpoints(self):
        """Test GET and POST /api/status endpoints"""
        # Test GET status
        try:
            response = self.session.get(f"{API_BASE_URL}/status")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("Status GET", True, f"Status endpoint returns list with {len(data)} items")
                else:
                    self.log_result("Status GET", False, f"Expected list, got: {type(data)}")
            else:
                self.log_result("Status GET", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Status GET", False, f"Request failed: {str(e)}")
        
        # Test POST status
        try:
            test_data = {
                "client_name": "SCARMO_Test_Client"
            }
            response = self.session.post(f"{API_BASE_URL}/status", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('client_name') == 'SCARMO_Test_Client' and 'id' in data and 'timestamp' in data:
                    self.log_result("Status POST", True, "Status creation successful with proper response")
                else:
                    self.log_result("Status POST", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Status POST", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Status POST", False, f"Request failed: {str(e)}")
    
    def test_printful_products(self):
        """Test GET /api/printful/products endpoint"""
        try:
            response = self.session.get(f"{API_BASE_URL}/printful/products")
            if response.status_code == 200:
                data = response.json()
                # Check if it's a valid Printful API response structure
                if isinstance(data, dict) and ('result' in data or 'code' in data):
                    self.log_result("Printful Products", True, "Printful API integration working correctly")
                else:
                    self.log_result("Printful Products", True, f"API responded but structure may be different: {type(data)}")
            elif response.status_code == 401:
                self.log_result("Printful Products", False, "Printful API authentication failed - check API token")
            elif response.status_code == 500:
                self.log_result("Printful Products", False, "Internal server error - possible API token or connection issue")
            else:
                self.log_result("Printful Products", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Printful Products", False, f"Request failed: {str(e)}")
    
    def test_create_checkout_session(self):
        """Test POST /api/create-checkout-session endpoint"""
        try:
            test_data = {
                "items": [
                    {
                        "productId": 1,
                        "variantId": 101,
                        "name": "SCARMO Test T-Shirt",
                        "price": "25.99",
                        "quantity": 2,
                        "image": "https://example.com/test-image.jpg"
                    }
                ],
                "customer": {
                    "email": "test@scarmo.com",
                    "name": "Test Customer",
                    "phone": "+1234567890"
                },
                "shipping": {
                    "id": "standard",
                    "name": "Standard Shipping",
                    "rate": "5.99",
                    "currency": "USD"
                }
            }
            
            response = self.session.post(f"{API_BASE_URL}/create-checkout-session", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'sessionId' in data and 'url' in data:
                    self.log_result("Stripe Checkout", True, "Checkout session created successfully")
                else:
                    self.log_result("Stripe Checkout", False, f"Invalid response structure: {data}")
            elif response.status_code == 400:
                # This might be expected if Stripe key is placeholder
                response_text = response.text
                if "placeholder" in response_text.lower() or "invalid" in response_text.lower():
                    self.log_result("Stripe Checkout", False, "Stripe API key appears to be placeholder - needs real key")
                else:
                    self.log_result("Stripe Checkout", False, f"Bad request: {response_text}")
            else:
                self.log_result("Stripe Checkout", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Stripe Checkout", False, f"Request failed: {str(e)}")
    
    def test_shipping_rates(self):
        """Test POST /api/shipping-rates endpoint"""
        try:
            test_data = {
                "recipient": {
                    "address1": "123 Test Street",
                    "city": "Test City",
                    "state_code": "CA",
                    "country_code": "US",
                    "zip": "12345"
                },
                "items": [
                    {
                        "productId": 1,
                        "variantId": 101,
                        "name": "Test Product",
                        "price": "19.99",
                        "quantity": 1
                    }
                ]
            }
            
            response = self.session.post(f"{API_BASE_URL}/shipping-rates", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'rates' in data:
                    rates = data['rates']
                    if isinstance(rates, list) and len(rates) > 0:
                        # Check if rates have proper structure
                        first_rate = rates[0]
                        if all(key in first_rate for key in ['id', 'name', 'rate', 'currency']):
                            self.log_result("Shipping Rates", True, f"Mock shipping rates returned successfully ({len(rates)} rates)")
                        else:
                            self.log_result("Shipping Rates", False, f"Rate structure invalid: {first_rate}")
                    else:
                        self.log_result("Shipping Rates", False, "No rates returned")
                else:
                    self.log_result("Shipping Rates", False, f"Invalid response structure: {data}")
            else:
                self.log_result("Shipping Rates", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Shipping Rates", False, f"Request failed: {str(e)}")
    
    def test_cors_configuration(self):
        """Test CORS headers are properly configured"""
        try:
            # Test preflight request
            response = self.session.options(f"{API_BASE_URL}/")
            cors_headers = {
                'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
                'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
                'access-control-allow-headers': response.headers.get('access-control-allow-headers'),
                'access-control-allow-credentials': response.headers.get('access-control-allow-credentials')
            }
            
            if cors_headers['access-control-allow-origin'] == '*':
                self.log_result("CORS Configuration", True, "CORS properly configured for all origins")
            else:
                self.log_result("CORS Configuration", False, f"CORS headers: {cors_headers}")
        except Exception as e:
            self.log_result("CORS Configuration", False, f"CORS test failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting SCARMO Backend API Tests")
        print(f"📍 Testing URL: {API_BASE_URL}")
        print("=" * 60)
        
        # Run all tests
        self.test_basic_api_root()
        self.test_status_endpoints()
        self.test_printful_products()
        self.test_create_checkout_session()
        self.test_shipping_rates()
        self.test_cors_configuration()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for r in self.results if r['success'])
        total = len(self.results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # List failed tests
        failed_tests = [r for r in self.results if not r['success']]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  • {test['test']}: {test['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)