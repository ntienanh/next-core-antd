import { Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import LogoURL from '../../../../public/images/log.svg';

const AdminHeader = () => {
  return (
    <Header className='fixed top-0 !z-20 flex w-full justify-between !bg-white !bg-opacity-90 !pl-3 !pr-4 shadow-md'>
      <Link href={'/admin'}>
        <div className='relative h-[64px] w-[188px]'>
          <Image src={LogoURL} alt='Logo web' fill className='object-contain' sizes='184px' />
        </div>
      </Link>

      <div className='flex flex-1 justify-between pl-4'>
        <div>1</div>
        <div>2</div>
      </div>
    </Header>
  );
};

export default AdminHeader;
