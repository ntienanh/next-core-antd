'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get('query');
//   const filter = query !== null ? `${query}` : '';

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests?${filter}`, {
//     method: 'GET',
//     next: { tags: ['test'], revalidate: 3600 },
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await res.json();

//   // if (request && query) {
//   //   revalidateTag('test');
//   //   revalidatePath('/admin/user');
//   // }

//   return NextResponse.json({ data });
// }

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, {
    method: 'GET',
    next: { tags: ['test'], revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, {
    method: 'POST',
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
