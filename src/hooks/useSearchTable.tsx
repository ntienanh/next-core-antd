import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

export const useSearchTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 6 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          styles={{ affixWrapper: { color: 'gray' } }}
          prefixCls='!flex text-[15px] focus-visible:!outline-none'
          className='focus-visible:'
          allowClear
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
          onBlur={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
          >
            Search
          </Button>
         
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn == dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const searchValue = searchText && (
    <p className='text-[24px] font-medium'>
      Data selected by {searchedColumn}: `{searchText}`
    </p>
  );

  return { getColumnSearchProps, searchValue };
};
