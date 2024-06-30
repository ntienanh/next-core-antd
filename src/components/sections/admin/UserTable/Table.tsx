import { Table } from 'antd';

interface ITableBaseProps {
  listUser: any;
  filterUser: any;
  selectedRowKeys: any;
  setSelectedRowKeys: (selected: any) => void;
  dataSource: any;
  newColumns: any;
}

const TableBase = async (props: ITableBaseProps) => {
  const { listUser, filterUser, setSelectedRowKeys, selectedRowKeys, dataSource, newColumns } = props || {};

  return (
    <Table
      rowKey={(item: any) => item?.id}
      rowSelection={{
        type: 'checkbox',
        onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys),
        selectedRowKeys: selectedRowKeys,
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
            <span className='font-bold'>{(filterUser || listUser)?.data?.length || '0'}</span>&nbsp;users in total
          </p>
        ),
        pageSizeOptions: ['10', '20', '30'],
      }}
      bordered
      // sroll X phải lớn hơn tổng width của các col width
      scroll={{ x: 1000, y: 572 }}
    />
  );
};

export default TableBase;
