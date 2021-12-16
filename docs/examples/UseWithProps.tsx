import React, { useState } from 'react';
import ReactTable from '../../src';
import { columns, dataSource } from '../mock';

const UseWithProps = () => {
  const [tableProps, setTableProps] = useState<any>({});

  const handleChangeProps = ({ type, value }) => () => {
    setTableProps({
      ...tableProps,
      [type]: value
    });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(pagination, filters, sorter);
  };

  return (
    <div>
      <h2>Use React Table With Props</h2>
      <div style={{ marginBottom: 24, display: 'flex' }}>
        <div style={{ display: 'flex', marginRight: 8 }}>
          <span>大小: </span>
          <div>
            <button
              onClick={handleChangeProps({ type: 'size', value: 'mini' })}
            >
              mini
            </button>
            <button
              onClick={handleChangeProps({ type: 'size', value: 'small' })}
            >
              small
            </button>
            <button
              onClick={handleChangeProps({ type: 'size', value: 'middle' })}
            >
              middle
            </button>
            <button
              onClick={handleChangeProps({ type: 'size', value: 'large' })}
            >
              large
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', marginRight: 8 }}>
          <span>边框: </span>
          <div>
            <button
              onClick={handleChangeProps({ type: 'bordered', value: true })}
            >
              true
            </button>
            <button
              onClick={handleChangeProps({ type: 'bordered', value: false })}
            >
              false
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', marginRight: 8 }}>
          <span>语言: </span>
          <div>
            <button
              onClick={handleChangeProps({ type: 'locale', value: undefined })}
            >
              英文
            </button>
            <button
              onClick={handleChangeProps({
                type: 'locale',
                value: {
                  columnConfigTip: '表格内',
                  filterSubmitTip: '提交',
                  filterResetTip: '重置',
                  paginationLocale: {
                    items_per_page: '条/页',
                    jump_to: '跳至',
                    jump_to_confirm: '确认跳至',
                    page: '页',
                    prev_page: '上一页',
                    next_page: '下一页',
                    prev_5: '前 5 页',
                    next_5: '后 5 页',
                    prev_3: '前 3 页',
                    next_3: '后 3 页'
                  }
                }
              })}
            >
              中文
            </button>
            <button
              onClick={handleChangeProps({
                type: 'locale',
                value: {
                  columnConfigTip: '表を示す',
                  filterSubmitTip: '提出する',
                  filterResetTip: 'リセット',
                  paginationLocale: {
                    items_per_page: 'バー/ページ',
                    jump_to: 'ジャンプする',
                    jump_to_confirm: 'ジャンプ先の確認',
                    page: 'ページ',
                    prev_page: '前のページ',
                    next_page: '次のページ',
                    prev_5: '前5ページ',
                    next_5: '次3ページ',
                    prev_3: '前3ページ',
                    next_3: '次3ページ'
                  }
                }
              })}
            >
              日语
            </button>
          </div>
        </div>
      </div>
      <ReactTable
        {...tableProps}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        onChange={handleTableChange}
        pagination={{
          defaultPageSize: 10
        }}
      />
    </div>
  );
};

export default UseWithProps;
