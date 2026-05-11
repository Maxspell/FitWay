import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const strapiToken = process.env.STRAPI_API_TOKEN;

    if (!strapiToken) {
      console.error('STRAPI_API_TOKEN is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(`${strapiUrl}/api/newsletter-subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email,
          subscribedAt: new Date().toISOString(),
          source: 'homepage-newsletter',
          status: 'active',
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle Strapi errors (e.g., unique constraint)
      if (result.error && result.error.message === 'This attribute must be unique') {
         // We might want to return success anyway to not leak email existence, 
         // but for this task let's handle it gracefully.
         return NextResponse.json(
           { message: 'You are already subscribed!' },
           { status: 200 }
         );
      }
      
      return NextResponse.json(
        { error: result.error?.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
