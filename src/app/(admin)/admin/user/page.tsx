import { getListUser } from '@/api-request/user';
import UserTable from '@/components/sections/admin/UserTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User List',
  description: 'User detail User detail',
};

const UserPage = async () => {
  const listUser = await getListUser();

  return (
    <div className='!overflow-hidden'>
      <UserTable listUser={listUser?.data} />
    </div>
  );
};

export default UserPage;
