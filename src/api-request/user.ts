export const getListUser = async () => {
  const res = await fetch('https://64feb9e6f8b9eeca9e28f8d6.mockapi.io/user', {
    method: 'GET',
    next: { tags: ['user'], revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res?.json();
};

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
