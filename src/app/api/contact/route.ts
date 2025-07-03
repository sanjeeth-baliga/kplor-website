import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // It's a good practice to store this URL in an environment variable
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      console.error('GOOGLE_SCRIPT_URL environment variable not set.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully' });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { success: false, message: 'Error from Google Apps Script', error: errorText },
        { status: response.status, statusText: response.statusText }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Internal Server Error', error: errorMessage }, { status: 500 });
  }
}
