'use client';

import { AppstoreOutlined, CalendarOutlined, LinkOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
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
      {
        key: 'user-2',
        label: 'Submenu',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
    ],
  },
  {
    key: 'link',
    icon: <LinkOutlined />,
    label: (
      <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
        Ant Design
      </a>
    ),
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
      case '/admin/user/userTest':
        return ['3'];
      default:
        return ['1'];
    }
  };

  return (
    <Sider
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
