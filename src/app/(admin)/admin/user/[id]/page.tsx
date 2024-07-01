import { getDetailUser } from '@/api-request/user';
import { XFilled } from '@ant-design/icons';
import { Button, Divider, Input } from 'antd';
import dayjs from 'dayjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User detail',
  description: 'User detail User detail',
};

const UserDetail = async ({ params }: any) => {
  const data = await getDetailUser(params.id);
  const { id, attributes } = data?.data || {};

  console.log('attributes', attributes);
  console.log(dayjs().isBefore(dayjs('2011-01-01')));

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <p className='text-[32px] font-semibold'>{attributes?.name}</p>
        <div>
          <Button type='primary' size='large'>
            Save
          </Button>
        </div>
      </div>

      <div className='flex justify-between gap-4'>
        <div className='flex-1 rounded bg-white p-4 shadow-md'>
          <div>
            <p className='text-[17px] font-medium'>Exceed Max</p>
            <Input
              count={{
                show: true,
                max: 10,
              }}
              defaultValue='Hello, antd!'
            />
          </div>
        </div>

        <div className='flex min-w-[240px] flex-col gap-3'>
          <div className='flex gap-3 rounded bg-[#EAFBE7] p-4 shadow-md'>
            <XFilled size={8} className='!text-green-800' />

            <p className='font-medium text-green-700'>
              {params.id ? 'Editing draft version' : 'Editing published version'}
            </p>
          </div>

          <div className='flex flex-col gap-3 rounded bg-white p-4 shadow-md'>
            <p className='font-medium'>INFORMATION</p>
            <Divider className='!-mt-1 !mb-2' />
            <div className='flex justify-between gap-2'>
              <p className='font-medium'>Created</p>
              <p className='text-gray-500'>{dayjs(attributes.createdAt).format('DD/MM/YYYY')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
