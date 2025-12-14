import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    // STEP 1: Check if environment variables exist
    console.log('=== DEBUGGING GOOGLE SHEETS API ===');
    console.log('SHEET_ID exists:', !!SHEET_ID);
    console.log('API_KEY exists:', !!API_KEY);
    console.log('SHEET_ID length:', SHEET_ID?.length);
    console.log('API_KEY length:', API_KEY?.length);
    
    if (!SHEET_ID || !API_KEY) {
      return NextResponse.json(
        { 
          error: 'Missing environment variables',
          details: {
            hasSheetId: !!SHEET_ID,
            hasApiKey: !!API_KEY
          }
        },
        { status: 500 }
      );
    }
    
    const RANGE = 'Sheet1!A:E';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    
    console.log('Requesting URL:', url.replace(API_KEY, 'API_KEY_HIDDEN')); // Hide API key in logs
    
    const response = await fetch(url);
    
    // STEP 2: Get detailed error information
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }
      
      console.error('=== GOOGLE SHEETS API ERROR ===');
      console.error('Status:', response.status);
      console.error('Status Text:', response.statusText);
      console.error('Error Details:', JSON.stringify(errorData, null, 2));
      
      return NextResponse.json(
        { 
          error: `Google Sheets API error: ${response.status}`,
          statusText: response.statusText,
          details: errorData,
          help: response.status === 403 
            ? 'Make sure: 1) Sheet is public (Anyone with link can view), 2) Google Sheets API is enabled, 3) API key has no restrictions or allows Sheets API'
            : 'Check the error details'
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found in sheet.' }, { status: 404 });
    }

    const filterOptions = {
      genders: rows[0]?.slice(1).filter(Boolean) || [],
      categories: rows[1]?.slice(1).filter(Boolean) || [],
      collections: rows[2]?.slice(1).filter(Boolean) || [],
      colors: rows[3]?.slice(1).filter(Boolean) || [],
      sizes: rows[4]?.slice(1).filter(Boolean) || [],
    };

    console.log('✅ Successfully fetched filter options');
    console.log('Data preview:', {
      genders: filterOptions.genders.length,
      categories: filterOptions.categories.length,
      collections: filterOptions.collections.length,
      colors: filterOptions.colors.length,
      sizes: filterOptions.sizes.length,
    });
    
    return NextResponse.json(filterOptions);
    
  } catch (error) {
    console.error('=== UNEXPECTED ERROR ===');
    console.error(error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch filter options',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}