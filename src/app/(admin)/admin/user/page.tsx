import { getListUser } from '@/api-request/user';
import UserTable from '@/components/sections/admin/UserTable';

const UserPage = async () => {
  const listUser = await getListUser();

  return (
    <div className='flex flex-col gap-3 !overflow-hidden w-full'>
      <div className='text-[36px] font-medium'>User List</div>

      <UserTable listUser={listUser} />
    </div>
  );
};

export default UserPage;
