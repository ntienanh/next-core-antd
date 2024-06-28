'use client';

import { createUser, deleteUser } from '@/api-request/user';
import UserDrawers from '@/components/drawers/UserDrawers';
import { useRouter } from '@/hooks/useRouter';
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  Popconfirm,
  Popover,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
  message,
} from 'antd';
import React from 'react';
import RadioGroup from '../RadioGroup';

export type FieldType =
  | {
      id?: string;
      name?: string;
      age?: string;
      createdAt?: string;
    }
  | any;

interface IUserTableProps {
  listUser?: any;
}

const UserTable = (props: IUserTableProps) => {
  const { listUser } = props || {};

  const router = useRouter();
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState<boolean>(false);

  const showDrawer = () => {
    const getID = form.getFieldValue('id');
    if (getID === undefined) {
      form.resetFields();
      form.setFieldsValue({ id: '', name: '', age: '', createdAt: '' });
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend'],
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
    delete payload.id;
    delete payload.createdAt;
    await createUser(payload);
    message.success(`Created Success`);

    router.refresh();
    form.resetFields();
    setOpen(false);
  };

  const dataSource = listUser?.data?.map((item: any) => {
    const { id, attributes } = item;
    return { id, ...attributes };
  });

  const defaultCheckedList = userColumns.map(item => item.key as string);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);

  const newColumns = userColumns.map(item => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));

  return (
    <div className='!w-full'>
      <UserDrawers form={form} onClose={onClose} onFinish={onFinish} open={open} />

      <div className='flex items-center justify-between pb-2'>
        <Button size='large' type='primary' icon={<PlusCircleOutlined />} onClick={showDrawer}>
          Add new User
        </Button>

        <div className='flex items-center justify-between gap-3'>
          <Input prefix={<SearchOutlined className='!text-gray-400' />} placeholder='Search by name' size='large' />
          <RadioGroup />

          <Tooltip title='Settings'>
            <Popover
              content={userColumns.map((item: any) => (
                <div key={item.title} className='flex gap-2'>
                  <Checkbox
                    key={item.title}
                    name={item.label}
                    disabled={['Action', 'ID'].includes(item.title)}
                    onChange={() => {
                      if (checkedList.includes(item.key)) {
                        setCheckedList(checkedList.filter(key => key !== item.key));
                      } else {
                        setCheckedList([...checkedList, item.key]);
                      }
                    }}
                  />

                  <p>{item.title}</p>
                </div>
              ))}
              arrowContent
              placement='bottomRight'
              title='Hidden fields'
              trigger='click'
            >
              <Button shape='round' icon={<SettingOutlined />} className='!h-[40px] !w-[40px] !rounded' />
            </Popover>
          </Tooltip>
        </div>
      </div>

      <Table
        rowKey={(item: any) => item?.id}
        rowSelection={{
          type: 'checkbox',
        }}
        dataSource={dataSource}
        columns={newColumns}
        className='pt-3'
        pagination={{
          showQuickJumper: true,
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: () => (
            <p>
              <span className='font-bold'>{listUser?.data?.length || '0'}</span>&nbsp;users in total
            </p>
          ),
          pageSizeOptions: ['10', '20', '30'],
        }}
        bordered
        // sroll X phải lớn hơn tổng width của các col width
        scroll={{ x: 1000, y: 572 }}
      />
    </div>
  );
};

export default UserTable;
