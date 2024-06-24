'use client';

import { createUser, deleteUser, getDetailUser, updateUser } from '@/api-request/user';
import UserDrawers from '@/components/drawers/UserDrawers';
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Pagination, Popconfirm, Space, Table, TableColumnsType, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { notification } from '../../common/NotificationAntd';
import RadioGroup from '../RadioGroup';

export type FieldType = {
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

  const confirm = async (id: string) => {
    await deleteUser(id);
    message.success(`Delete ${id}`);
  };

  const userColumns: TableColumnsType<FieldType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 150,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 50,
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button
            size='small'
            type='default'
            onClick={async () => {
              const { id, name, age, createdAt } = await getDetailUser(record?.id);
              form.setFieldsValue({ id, name, age, createdAt });
              setInfo(name);
              setOpen(true);
              setInitialValues({ id, name, age, createdAt });
            }}
            icon={<EyeOutlined />}
          />

          <Popconfirm
            title='Are you sure!'
            description={`Delete user ${record?.id}`}
            onConfirm={() => confirm(record?.id)}
            onCancel={() => null}
            okText='Delete'
            okType='danger'
            cancelText='Cancel'
          >
            <Button danger icon={<DeleteOutlined />} size='small' />
          </Popconfirm>
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
    const getID = form.getFieldValue('id');

    // Nếu có id
    if (payload?.id || getID) {
      (await updateUser(payload)) as any;
      notification.success({ message: 'Edit thành công', description: 'Edit Success' });
      router.refresh();
      form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
    } else {
      delete payload.id;
      delete payload.createdAt;

      await createUser(payload);
      notification.success({ message: 'Create thành công', description: 'Created Success' });
      router.refresh();
      form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
    }
    setOpen(false);
    form.resetFields();
  };

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  // Kiểm tra lại điều kiện check isDirty and valid
  // Sau khi tạo > click edit thì button submit active???

  return (
    <div className='!w-full' key={'sad'}>
      <UserDrawers
        form={form}
        handleFormChange={handleFormChange}
        info={info}
        initialValues={initialValues}
        onClose={onClose}
        onFinish={onFinish}
        open={open}
        key={'userD'}
      />

      <div className='flex items-center justify-between pb-4'>
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
        bordered
        // sroll X phải lớn hơn tổng width của các col width
        scroll={{ x: 1000, y: 570 }}
      />

      <div className='flex items-center justify-between pt-3'>
        <p>
          <span className='font-bold'>{listUser?.length || '0'}</span>&nbsp;users in total
        </p>
        <Pagination defaultCurrent={1} total={50} showSizeChanger showQuickJumper />
      </div>
    </div>
  );
};

export default UserTable;
