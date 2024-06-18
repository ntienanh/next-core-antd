'use client';

import { getDetailUser } from '@/api-request/user';
import { Button, Drawer, Form, FormProps, Input, Pagination, Space, Table } from 'antd';
import React from 'react';

type FieldType = {
  id?: string;
  name?: string;
  age?: string;
  createdAt?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo);
};

const UserTable = ({ listUser }: any) => {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const userColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <a
            onClick={async () => {
              const { id, name, age, createdAt } = await getDetailUser(record?.id);
              form.setFieldsValue({ id, name, age, createdAt });
              setInfo(name);
              showDrawer();
            }}
          >
            Invite {record.name}
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Drawer title={info} onClose={onClose} open={open}>
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='ID'
            name='id'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Username'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Age'
            name='age'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='CreatedAt'
            name='createdAt'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        dataSource={listUser}
        columns={userColumns}
        className='pt-3'
        pagination={false}
      />

      <div className='flex items-center justify-between pt-3'>
        <div>Totals `1`</div>
        <Pagination defaultCurrent={1} total={50} showSizeChanger showQuickJumper />
      </div>
    </div>
  );
};

export default UserTable;
