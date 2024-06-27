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
    key: 'home',
    icon: <MailOutlined />,
    label: <Link href={'/admin'}>Trang chủ</Link>,
  },
  {
    key: 'user',
    icon: <CalendarOutlined />,
    label: <Link href={'/admin/user'}>User</Link>,
  },
  {
    key: 'parent',
    label: 'Nested Menu',
    icon: <AppstoreOutlined />,
    children: [
      { key: 'child1', label: <Link href={'/admin/parent/child1'}>parent/child1</Link> },
      { key: 'child2', label: <Link href={'/admin/parent/child2'}>parent/child2</Link> },
    ],
  },
  {
    key: 'media',
    icon: <LinkOutlined />,
    label: <Link href={'/admin/media'}>Media Library</Link>,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const itemActive = () => {
    const pathList: any = {
      '/admin/user': 'user',
      '/admin/media': 'media',
      '/admin/parent/child1': 'child1',
      '/admin/parent/child2': 'child2',
    };

    for (const path in pathList) {
      if (pathname.startsWith(path)) {
        return [pathList[path]];
      }
    }
    return ['home'];
  };

  const defaultOpenKeys = () => {
    switch (true) {
      case pathname.startsWith('/admin/parent'):
        return ['parent'];
    }
  };

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
        defaultOpenKeys={defaultOpenKeys()}
        selectedKeys={itemActive()}
        className='!mt-4 h-auto'
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default AdminSidebar;
