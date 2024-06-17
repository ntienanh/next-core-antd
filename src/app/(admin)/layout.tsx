import AdminHeader from '@/components/sections/admin/AdminHeader';
import AdminSidebar from '@/components/sections/admin/AdminSidebar';
import { Layout } from 'antd';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className='flex'>
      <AdminHeader />
      <AdminSidebar />

      <div className='mt-[64px] min-h-screen flex-1 p-4'>{children}</div>
    </Layout>
  );
}
