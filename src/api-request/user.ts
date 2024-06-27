'use server';

export async function getListUser() {
  const res = await fetch('http://localhost:3000/api/users');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const getDetailUser = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'GET',
    next: { tags: ['user'], revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res?.json();
};

export async function createUser(body: any) {
  const res = await fetch('http://localhost:3000/api/users', {
    body: JSON.stringify({ data: body }),
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function updateUser(payload: any) {
  const { id, ...body } = payload;
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    body: JSON.stringify({ data: body }),
    method: 'PUT',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
