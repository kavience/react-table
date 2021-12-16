import React from 'react';
import RCSelect from 'rc-select';
import RCPagination, { PaginationProps } from 'rc-pagination';
import '../style/pagination.less';

const Pagination = (props: PaginationProps) => {
  return (
    <RCPagination
      selectComponentClass={RCSelect}
      prevIcon={<span className="page-change-icon">&lt;</span>}
      nextIcon={<span className="page-change-icon">&gt;</span>}
      showQuickJumper
      showSizeChanger
      defaultPageSize={20}
      defaultCurrent={1}
      jumpPrevIcon={<span className="jump-icon">•••</span>}
      jumpNextIcon={<span className="jump-icon">•••</span>}
      {...props}
      prefixCls="react-table-pagination"
    />
  );
};

export default Pagination;
