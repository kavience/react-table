import React from 'react';
import ReactTable from '../../src';

const columns: any[] = [
  {
    title: '姓名',
    align: 'center',
    width: 120,
    ellipsis: true,
    dataIndex: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '身高',
    dataIndex: 'height'
  },
  {
    title: '体重',
    dataIndex: 'weight'
  }
];

const EasyUse = () => {
  const dataSource = [
    {
      id: 1,
      name:
        'kevinkevinkevinkevinkevikevinkevinkevinkevinkevinkevinkevinkevinkevinkevinn',
      age: 28,
      height: '168cm',
      weight: '75kg'
    },
    {
      id: 2,
      name: 'kevin2',
      age: 28,
      height: '168cm',
      weight: '75kg'
    },
    {
      id: 3,
      name: 'kevin3',
      age: 28,
      height: '168cm',
      weight: '75kg'
    }
  ];
  return (
    <div>
      <h2>Use React Table Simply</h2>
      <ReactTable
        size="mini"
        bordered
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default EasyUse;
