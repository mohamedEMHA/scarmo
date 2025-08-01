import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const PRINTFUL_API_TOKEN = Deno.env.get('PRINTFUL_API_TOKEN')
    
    if (!PRINTFUL_API_TOKEN) {
      throw new Error('Printful API token not configured in Supabase secrets')
    }

    const url = new URL(req.url)
    const endpoint = url.searchParams.get('endpoint') || '/products'
    
    const response = await fetch(`https://api.printful.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})