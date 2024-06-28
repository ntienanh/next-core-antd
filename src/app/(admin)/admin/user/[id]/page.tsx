import { Metadata } from 'next';

async function getDetailUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export const metadata: Metadata = {
  title: 'User detail',
  description: 'User detail User detail',
};

const UserDetail = async ({ params }: any) => {
  const data = await getDetailUser(params.id);

  return <div className='flex flex-col gap-3'>UserDetail - {data?.data?.id}</div>;
};

export default UserDetail;
