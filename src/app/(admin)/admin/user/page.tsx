import UserTable from '@/components/sections/admin/UserTable';

async function getListUser() {
  const res = await fetch('http://localhost:3000/api/users');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const UserPage = async () => {
  const listUser = await getListUser();

  return (
    <div className='flex w-full flex-col gap-3 !overflow-hidden'>
      <div className='text-[36px] font-medium'>User List</div>

      <UserTable listUser={listUser?.data?.data} />
    </div>
  );
};

export default UserPage;
