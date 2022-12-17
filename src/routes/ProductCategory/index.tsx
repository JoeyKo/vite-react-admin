import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  sortorder: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '排序',
    dataIndex: 'sortorder',
    key: 'sortorder',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '分类 - 1',
    sortorder: 1,
  },
  {
    key: '2',
    name: '分类 - 2',
    sortorder: 2,
  },
  {
    key: '3',
    name: '分类 - 3',
    sortorder: 3,
  },
];

const ProductCategory: React.FC = () => <Table columns={columns} dataSource={data} />;

export default ProductCategory;