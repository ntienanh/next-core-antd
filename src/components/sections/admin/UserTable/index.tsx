'use client';

import { createUser, deleteUser, updateUser } from '@/api-request/user';
import UserDrawers from '@/components/drawers/UserDrawers';
import { useRouter } from '@/hooks/useRouter';
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Popconfirm, Space, Table, TableColumnsType, message } from 'antd';
import React from 'react';
import RadioGroup from '../RadioGroup';

export type FieldType = {
  id?: string;
  name?: string;
  age?: string;
  createdAt?: string;
};

interface IUserTableProps {
  listUser?: any;
}

interface IPaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

const UserTable = (props: IUserTableProps) => {
  const { listUser } = props || {};

  const router = useRouter();
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<string>('');
  // const [isDirty, setIsDirty] = React.useState<boolean>(false);
  // const [isValid, setIsValid] = React.useState<boolean>(false);

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
    router.refresh();
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
      width: 70,
      align: 'center',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button
            size='small'
            type='default'
            onClick={() => {
              router.push(`/admin/user/${record.id}`);
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

  const onFinish: FormProps<FieldType>['onFinish'] = async (payload: any) => {
    const getID = form.getFieldValue('id');

    if (payload?.id || getID) {
      await updateUser(payload);
      message.success(`Updated Success`);
    } else {
      delete payload.id;
      delete payload.createdAt;
      await createUser(payload);
      message.success(`Created Success`);
    }

    router.refresh();
    form.resetFields();
    setOpen(false);
  };

  const dataSource = listUser?.data?.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  const userPagination = (listUser?.meta?.pagination || {}) as IPaginationProps;

  return (
    <div className='!w-full'>
      <UserDrawers
        form={form}
        info={info}
        onClose={onClose}
        onFinish={onFinish}
        open={open}
        // handleFormChange={handleFormChange}
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
        rowKey={(item: any) => item?.id}
        rowSelection={{
          type: 'checkbox',
        }}
        dataSource={dataSource}
        columns={userColumns}
        className='pt-3'
        pagination={false}
        bordered
        // sroll X phải lớn hơn tổng width của các col width
        scroll={{ x: 1000, y: 570 }}
      />

      {/* <div className='flex items-center justify-between pt-3'>
        <p>
          <span className='font-bold'>{listUser?.data?.length || '0'}</span>&nbsp;users in total
        </p>

        <Pagination
          defaultCurrent={userPagination.page}
          pageSize={userPagination.pageSize}
          total={userPagination.total}
          showSizeChanger
          showTitle={true}
        />
      </div> */}
    </div>
  );
};

export default UserTable;
