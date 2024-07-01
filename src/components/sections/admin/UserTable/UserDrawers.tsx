import { Button, Drawer, Form, FormInstance, Input } from 'antd';
import { DataType } from '.';

interface IUserDrawersProps {
  open?: boolean;
  form: FormInstance<any>;
  onClose?: () => void;
  onFinish?: any;
  loading?: boolean;
}

const UserDrawers = (props: IUserDrawersProps) => {
  const { onClose, open, form, onFinish, loading } = props || {};

  return (
    <Drawer
      getContainer={false}
      title={'Create new user'}
      onClose={onClose}
      open={open}
      classNames={{ body: 'bg-[#F5F5F5] !p-3' }}
      placement='right'
      height={'!auto'}
    >
      <Form
        form={form}
        name='form basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item<DataType> label='ID' name='id'>
          <Input disabled />
        </Form.Item>

        <Form.Item<DataType>
          label='Username'
          name='name'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<DataType>
          label='Age'
          name='age'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={loading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserDrawers;
