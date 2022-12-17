import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
  key: string;
  name: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`/product/list/${record.key}`}>{text}</Link>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: '衣服 - ?????????',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '袜子 - ?????????',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: '鞋子 - ?????????',
    address: 'Sidney No. 1 Lake Park',
  },
];

const ProductList: React.FC = () => <Table columns={columns} dataSource={data} />;

export default ProductList;