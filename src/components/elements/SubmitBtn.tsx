'use client';

import { Button } from 'antd';
import { useFormStatus } from 'react-dom';

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button type='primary' htmlType='submit' loading={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
};

export default SubmitBtn;
