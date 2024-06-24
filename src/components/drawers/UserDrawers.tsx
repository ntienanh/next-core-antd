import { Button, Drawer, Form, FormInstance, Input } from 'antd';
import { Store } from 'antd/es/form/interface';
import { FieldType } from '../sections/admin/UserTable';

interface IUserDrawersProps {
  info?: string;
  open?: boolean;
  form: FormInstance<any>;
  onClose?: () => void;
  onFinish?: any;
  handleFormChange?: () => void;
  initialValues?: Store | undefined;
}

const UserDrawers = (props: IUserDrawersProps) => {
  const { info, onClose, open, form, handleFormChange, onFinish, initialValues } = props || {};

  return (
    <Drawer
      getContainer={false}
      title={info || 'Create new user'}
      onClose={onClose}
      open={open}
      classNames={{ body: 'bg-[#F5F5F5] !p-3' }}
      placement='right'
      height={'!auto'}
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
        initialValues={initialValues}
      >
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserDrawers;