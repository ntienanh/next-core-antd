'use server';

import { revalidateTag } from 'next/cache';

export const getListUser = async () => {
  const res = await fetch('https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user');
  return res?.json();
};

// export const getListUser = async () => {
//   const res = await fetch('https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user', {
//     method: 'GET',
//     next: { tags: ['user'], revalidate: 3600 },
//   });
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res?.json();
// };

export const getDetailUser = async (id: string) => {
  const res = await fetch(`https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user/${id}`, {
    method: 'GET',
    next: { tags: [`user/${id}`] },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res?.json();
};

export const updateUser = async (payload: any) => {
  const res = await fetch(`https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status == 200) {
    revalidateTag('user');
    revalidateTag(`user/${payload.id}`);
  }
};

export const createUser = async (payload: any) => {
  const res = await fetch(`https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const deleteUser = async (id: any) => {
  const res = await fetch(`https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status == 200) {
    revalidateTag('user');
  }
};
