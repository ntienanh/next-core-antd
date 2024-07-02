'use client';

import { Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

const FormDetail = (defaultValues: any) => {
  const [form] = useForm();
  const formRef = React.useRef(null);

  React.useEffect(() => {
    form.setFieldsValue({ name: defaultValues?.data?.attributes?.name, age: defaultValues?.data?.attributes?.age });
  }, [form, defaultValues]);

  return (
    <Form
      form={form}
      layout='vertical'
      name='form basic'
      autoComplete='off'
      className='!w-full'
    >
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
  );
};

export default FormDetail;
