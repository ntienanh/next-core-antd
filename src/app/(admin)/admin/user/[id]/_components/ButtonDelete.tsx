'use client';

import { deleteUser } from '@/api-request/user';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IconTrash } from 'tabler-icons';

const ButtonDelete = (params: any) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const confirm = async () => {
    setLoading(true);
    try {
      await deleteUser(params.id);
      message.success(`Deleted Success ${params.id}`);
    } catch (error) {
      message.error(`Delete fail: ${error}`);
    }

    router.push('/admin/user');
    router.refresh();
    setLoading(false);
  };

  return (
    <Button danger icon={<IconTrash />} className='!bg-red-100' onClick={confirm} disabled={loading}>
      Delete this entry
    </Button>
  );
};

export default ButtonDelete;
