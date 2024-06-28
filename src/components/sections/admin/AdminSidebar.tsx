'use client';

import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';
const { Sider } = Layout;

const AdminSidebar = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const segments = useSelectedLayoutSegments();

  return (
    <Sider
      zeroWidthTriggerStyle={{ color: 'red' }}
      collapsible
      collapsed={toggle}
      onCollapse={() => setToggle(!toggle)}
      theme='light'
      className='!sticky left-0 top-0 h-screen pt-[60px]'
    >
      <Menu
        theme='light'
        defaultOpenKeys={segments}
        selectedKeys={segments}
        className='!mt-4 h-auto'
        mode='inline'
        items={[
          { key: 'home', icon: <MailOutlined />, label: <Link href={'/admin/home'}>Trang chủ</Link> },
          { key: 'user', icon: <CalendarOutlined />, label: <Link href={'/admin/user'}>User</Link> },
          {
            key: 'parent',
            label: 'Nested Menu',
            icon: <AppstoreOutlined />,
            children: [
              { key: 'child1', label: <Link href={'/admin/parent/child1'}>parent/child1</Link> },
              { key: 'child2', label: <Link href={'/admin/parent/child2'}>parent/child2</Link> },
            ],
          },
          { key: 'media', icon: <LinkOutlined />, label: <Link href={'/admin/media'}>Media Library</Link> },
        ]}
      />
    </Sider>
  );
};

export default AdminSidebar;
