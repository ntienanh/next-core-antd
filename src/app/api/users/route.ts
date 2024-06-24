import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch('https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return NextResponse.json(data);
}
