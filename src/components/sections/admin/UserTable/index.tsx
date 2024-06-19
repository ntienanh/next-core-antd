'use client';

import { createUser, deleteUser, getDetailUser, updateUser } from '@/api-request/user';
import { EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, FormProps, Input, Pagination, Space, Table } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { notification } from '../../common/NotificationAntd';
import RadioGroup from '../RadioGroup';

type FieldType = {
  id?: string;
  name?: string;
  age?: string;
  createdAt?: string;
};

const UserTable = ({ listUser }: any) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<string>('');
  const [isDirty, setIsDirty] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [initialValues, setInitialValues] = React.useState<any>({});

  const showDrawer = () => {
    const getID = form.getFieldValue('id');

    if (getID === undefined) {
      setInfo('');
      form.resetFields();
      form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setInfo('');
    form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
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
          <Button
            size='small'
            type='default'
            onClick={async () => {
              const { id, name, age, createdAt } = await getDetailUser(record?.id);
              form.setFieldsValue({ id, name, age, createdAt });
              setInfo(name);
              showDrawer();
              setInitialValues({ id, name, age, createdAt });
            }}
            icon={<EyeOutlined />}
          />

          <button onClick={async () => await deleteUser(record?.id)}>Delete</button>
        </Space>
      ),
    },
  ];

  const handleFormChange = async () => {
    const currentValues = form.getFieldsValue();
    const hasChanged = Object.keys(currentValues).some(key => currentValues[key] !== initialValues?.[key]);
    setIsDirty(hasChanged);

    try {
      await form.validateFields();
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (payload: any) => {
    if (payload?.id) {
      await updateUser(payload);
    } else {
      delete payload.id;
      delete payload.createdAt;

      await createUser(payload);
      notification.success({ message: 'Tạo thành công', description: 'Success' });
      router.refresh();
      form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
    }
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        getContainer={false}
        title={info || 'Create new user'}
        onClose={onClose}
        open={open}
        classNames={{ body: 'bg-[#F5F5F5] !p-3' }}
      >
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onChange={handleFormChange}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='ID' name='id'>
            <Input disabled />
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

          <Form.Item<FieldType> label='CreatedAt' name='createdAt'>
            <Input disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' disabled={!isDirty || !isValid}>
              Edit User
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <div className='flex items-center justify-between'>
        <Button size='large' type='primary' icon={<PlusCircleOutlined />} onClick={showDrawer}>
          Add new User
        </Button>

        <div className='flex items-center justify-between gap-3'>
          <Input prefix={<SearchOutlined className='!text-gray-400' />} placeholder='Search by name' size='large' />
          <RadioGroup />
        </div>
      </div>

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
