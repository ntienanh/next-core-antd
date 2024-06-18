'use client';

import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons';
import { GetProp, Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
const { Sider } = Layout;

type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: <Link href={'/admin'}>Trang chủ</Link>,
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: <Link href={'/admin/user'}>User</Link>,
  },
  {
    key: 'user',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '3', label: <Link href={'/admin/user/userTest'}>User Test</Link> },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: '5',
    icon: <LinkOutlined />,
    label: <Link href={'/admin/media'}>Media Library</Link>,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const parrentActive = () => {
    const case1 = pathname.includes('/admin/user');

    if (case1) return ['user'];
  };

  const itemActive = () => {
    switch (pathname) {
      case '/admin/user':
        return ['2'];
      case '/admin/media':
        return ['5'];
      case '/admin/user/userTest':
        return ['3'];
      default:
        return ['1'];
    }
  };

  return (
    <Sider
    zeroWidthTriggerStyle={{color:'red'}}
      collapsible
      collapsed={toggle}
      onCollapse={() => setToggle(!toggle)}
      theme='light'
      className='!sticky left-0 top-0 h-screen pt-[60px]'
    >
      <Menu
        theme='light'
        defaultOpenKeys={parrentActive()}
        selectedKeys={itemActive()}
        className='!mt-4 h-auto'
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default AdminSidebar;
