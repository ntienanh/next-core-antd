import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Input, Popover } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import LogoURL from '../../../../public/images/log.svg';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const AdminHeader = () => {
  return (
    <Header className='fixed top-0 !z-20 flex w-full flex-1 justify-between !bg-white !bg-opacity-90 !pl-3 !pr-8 shadow-md'>
      <Link href={'/admin'}>
        <div className='relative h-[64px] w-[188px]'>
          <Image src={LogoURL} alt='Logo web' fill className='object-contain' sizes='184px' />
        </div>
      </Link>

      <div className='flex w-full pl-8'>
        <div className='flex w-full items-center justify-between gap-3'>
          <Input placeholder='search' className='!max-h-[30px] !min-h-[30px] !w-[256px]' size='middle' />

          <div className='flex gap-3'>
            <Badge size='small' count={5}>
              <Button
                shape='circle'
                type='primary'
                className='!bg-gray-300'
                classNames={{
                  icon: 'transition-colors hover:text-blue-400',
                }}
                icon={<BellOutlined />}
              />
            </Badge>
            <Popover content={content} title='Title' trigger='click' placement='bottomRight'>
              <Avatar className='cursor-pointer !bg-[#87d068]' icon={<UserOutlined />} />
            </Popover>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AdminHeader;
