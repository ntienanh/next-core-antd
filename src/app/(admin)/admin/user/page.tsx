import { getListUser } from '@/api-request/user';
import RadioGroup from '@/components/sections/admin/RadioGroup';
import UserTable from '@/components/sections/admin/UserTable';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const UserPage = async () => {
  const listUser = await getListUser();

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <Button size='large' type='primary' icon={<PlusCircleOutlined />}>
          Add new User
        </Button>

        <div className='flex items-center justify-between gap-3'>
          <Input prefix={<SearchOutlined className='!text-gray-400' />} placeholder='Search by name' size='large' />
          <RadioGroup />
        </div>
      </div>

      <UserTable listUser={listUser} />
    </div>
  );
};

export default UserPage;
