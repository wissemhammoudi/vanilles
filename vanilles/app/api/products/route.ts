import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    const SHEET_NAME = process.env.SHEET_NAME || 'Products';
    
    if (!SHEET_ID || !API_KEY) {
      return NextResponse.json(
        { error: 'Missing environment variables' },
        { status: 500 }
      );
    }
    
    // Get product ID from query parameter
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    
    const RANGE = `${SHEET_NAME}!A2:H100`; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    
    console.log('Fetching products from Google Sheets...');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      console.error('Google Sheets API Error:', errorData);
      return NextResponse.json(
        { 
          error: `Google Sheets API returned ${response.status}`,
          message: errorData?.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    const rows = data.values;
    
    if (!rows || rows.length === 0) {
      console.log('No products found in sheet');
      return productId 
        ? NextResponse.json({ error: 'Product not found' }, { status: 404 })
        : NextResponse.json([]);
    }
    
    console.log(`Found ${rows.length} products`);
    
    // Process all products
    const products = rows.map((row, index) => ({
      id: row[0] || `product-${index + 2}`, // +2 because rows start at 2
      name: row[1] || '',
      price: parseFloat(row[2]) || 0,
      image: row[3] || '',
      gender: row[4] || '',
      category: row[5] || '',
      collection: row[6] || '',
      color: row[7] || '',
    })).filter(product => product.name);
    
    // If product ID is specified, return that specific product
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }
    
    console.log('✅ Successfully fetched products');
    return NextResponse.json(products);
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}