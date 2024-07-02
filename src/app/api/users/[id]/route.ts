'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${params.id}`, {
    next: { revalidate: 10 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();

  return NextResponse.json(result);
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (res.status == 200) {
    revalidateTag('test');
    revalidatePath('/admin/user');
  }
  const data = await res.json();

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${params.id}`, {
    next: { revalidate: 10 },
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status == 200) {
    revalidateTag('test');
    revalidatePath('/admin/user');
  }

  const data = await res.json();

  return NextResponse.json(data);
}
