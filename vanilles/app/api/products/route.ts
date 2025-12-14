import { NextRequest, NextResponse } from "next/server";

interface GoogleSheetsResponse {
  values?: string[][];
  error?: any;
}

export async function GET(request: NextRequest) {
  try {
    const SHEET_ID = process.env.SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;
    const SHEET_NAME = process.env.SHEET_NAME || "Products";

    if (!SHEET_ID || !API_KEY) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("id");
    
    // Dynamic range - adjust as needed
    const RANGE = `${SHEET_NAME}!A:Z`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    console.log(`Fetching from Google Sheets: ${SHEET_ID}, range: ${RANGE}`);

    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Sheets API error (${response.status}):`, errorText);
      
      return NextResponse.json(
        {
          error: "Failed to fetch data from Google Sheets",
          details: `Status: ${response.status}`
        },
        { status: response.status }
      );
    }

    const data: GoogleSheetsResponse = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.log("No data found in Google Sheets");
      return NextResponse.json([], { status: 200 });
    }

    console.log(`Got ${data.values.length} rows from Google Sheets`);

    // Assuming first row is headers
    const rows = data.values.slice(1); // Skip header row
    const products = rows
      .map((row, index) => {
        try {
          return {
            id: (row[0] || `product-${index + 2}`).toString().trim(),
            name: (row[1] || "").toString().trim(),
            price: parseFloat((row[2] || "0").toString().replace(/[^0-9.-]+/g, "")) || 0,
            image: (row[3] || "/placeholder.svg").toString().trim(),
            gender: (row[4] || "").toString().trim(),
            category: (row[5] || "").toString().trim(),
            collection: (row[6] || "").toString().trim(),
            color: (row[7] || "").toString().trim(),
          };
        } catch (error) {
          console.error(`Error parsing row ${index}:`, row, error);
          return null;
        }
      })
      .filter((product): product is NonNullable<typeof product> => 
        product !== null && product.name.trim() !== ""
      );

    console.log(`Parsed ${products.length} valid products`);

    // If productId is provided, return single product
    if (productId) {
      const normalizedId = productId.trim();
      console.log(`Looking for product with ID: "${normalizedId}"`);
      
      // Try exact match first
      let product = products.find(p => p.id === normalizedId);
      
      // If not found, try case-insensitive
      if (!product) {
        product = products.find(p => 
          p.id.toLowerCase() === normalizedId.toLowerCase() ||
          p.id.toLowerCase().includes(normalizedId.toLowerCase())
        );
      }
      
      if (product) {
        console.log(`Found product: ${product.name}`);
        return NextResponse.json(product);
      } else {
        console.log(`Product not found. Available IDs:`, products.map(p => p.id));
        return NextResponse.json(
          { error: "Product not found", searchedId: productId },
          { status: 404 }
        );
      }
    }

    // Return all products if no ID specified
    return NextResponse.json(products);
    
  } catch (error) {
    console.error("Unexpected error in Google Sheets API:", error);
    
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}