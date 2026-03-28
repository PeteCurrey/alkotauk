import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const token = process.env.SANITY_API_TOKEN;

    if (!projectId || !dataset || !token) {
      console.warn("Missing Sanity credentials, simulating success for development");
      // Simulate success if no token is available (for demo/development environment)
      return NextResponse.json({ success: true, message: 'Lead captured (simulated)' }, { status: 200 });
    }

    const mutation = {
      mutations: [
        {
          create: {
            _type: 'lead',
            name,
            email,
            company: company || '',
            phone: phone || '',
            message: message || '',
            status: 'new',
            source: source || 'maintenance_splash',
          }
        }
      ]
    };

    const response = await fetch(`https://${projectId}.api.sanity.io/v2023-01-01/data/mutate/${dataset}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(mutation)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sanity creation failed:', errorText);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Lead captured' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
