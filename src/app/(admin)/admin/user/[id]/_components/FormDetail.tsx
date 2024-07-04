'use client';

import { updateUser } from '@/api-request/user';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

interface IFormDetailProps {
  defaultValues?: any;
}

const FormDetail = (props: IFormDetailProps) => {
  const { defaultValues } = props;
  const [form] = useForm();

  React.useEffect(() => {
    form.setFieldsValue({ name: defaultValues?.data?.attributes?.name, age: defaultValues?.data?.attributes?.age });
  }, [form, defaultValues]);

  const allValues = Form.useWatch([], form);
  const { createdAt, publishedAt, updatedAt, ...currentData } = defaultValues.data.attributes;

  const checked = allValues?.name === currentData?.name && allValues?.age === currentData?.age;

  console.log('defaultValues', defaultValues);

  return (
    <div>
      <Button
        onClick={async () => {
          try {
            await updateUser(defaultValues?.data?.id);

            message.success(`Edit Success`);
          } catch (error) {
            message.error(`Edit fail: ${error}`);
          }
        }}
        disabled={checked}
        type='primary'
        size='large'
      >
        Save
      </Button>

      <Form form={form} layout='vertical' name='form basic' autoComplete='off' className='!w-full'>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label='Name' name='name'>
              <Input value={defaultValues?.data?.attributes?.name} placeholder='Input name' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label='Age' name='age'>
              <Input value={defaultValues?.data?.attributes?.age} placeholder='Input age' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormDetail;
