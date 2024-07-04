import { getDetailUser } from '@/api-request/user';
import { XFilled } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import dayjs from 'dayjs';
import { Metadata } from 'next';
import ButtonDelete from './_components/ButtonDelete';
import FormDetail from './_components/FormDetail';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const metadata: Metadata = {
  title: 'User detail',
  description: 'User detail User detail',
};

const UserDetail = async ({ params }: any) => {
  const data = await getDetailUser(params.id);
  const { id, attributes } = data?.data || {};

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <p className='text-[32px] font-semibold'>{attributes?.name}</p>
        {/* <div>
          <Button type='primary' size='large'>
            Save
          </Button>
        </div> */}
      </div>

      <div className='flex justify-between gap-4'>
        {/* Grid */}
        <div className='flex flex-1 rounded bg-white p-4 shadow-md'>
          <FormDetail defaultValues={data} />
        </div>

        {/* INFORMATION */}
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
              <p className='text-gray-500'>{(dayjs(attributes.createdAt) as any).fromNow()}</p>
            </div>

            <div className='flex justify-between gap-2'>
              <p className='font-medium'>By</p>
              <p className='text-gray-500'>-</p>
            </div>

            <div className='flex justify-between gap-2'>
              <p className='font-medium'>Last update</p>
              <p className='text-gray-500'>{(dayjs(attributes.updatedAt) as any).fromNow()}</p>
            </div>

            <div className='flex justify-between gap-2'>
              <p className='font-medium'>By</p>
              <p className='text-gray-500'>-</p>
            </div>
          </div>

          <ButtonDelete id={id} />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
