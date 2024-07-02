'use client';

import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent } from 'antd';
import React from 'react';

const options = [
  { label: <UnorderedListOutlined />, value: 'list', disabled: false },
  { label: <AppstoreOutlined />, value: 'grid', disabled: true },
];

const RadioGroup = () => {
  const [value1, setValue1] = React.useState('list');

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    setValue1(value);
  };

  return (
    <Radio.Group
      size='large'
      optionType='button'
      options={options}
      onChange={onChange1}
      value={value1}
      className='!flex'
    />
  );
};

export default RadioGroup;
