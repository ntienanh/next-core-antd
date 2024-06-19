'use client';

import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import React from 'react';
import RadioGroup from './RadioGroup';

const CreateSearchTable = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex items-center justify-between'>
      <Modal centered title='Create new User' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Button size='large' type='primary' icon={<PlusCircleOutlined />} onClick={showModal}>
        Add new User
      </Button>

      <div className='flex items-center justify-between gap-3'>
        <Input prefix={<SearchOutlined className='!text-gray-400' />} placeholder='Search by name' size='large' />
        <RadioGroup />
      </div>
    </div>
  );
};

export default CreateSearchTable;
