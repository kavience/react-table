import { PaginationLocale, PaginationProps } from 'rc-pagination';
import React from 'react';
import { ResizeCallbackData } from 'react-resizable';

export interface Column {
  dataIndex: any;
  title: any;
  key?: any;
  align?: 'left' | 'right' | 'center';
  width?: number | 'string';
  ellipsis?: boolean;
  hidden?: boolean;
  className?: string;
  colSpan?: any;
  onFilter?: (value: string, record: any) => boolean;
  renderOverlayFilter?: () => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  sorter?: ((firstRecord: any, secondRecord: any) => any) | boolean;
}

export interface ReactTableLocal {
  paginationLocale: PaginationLocale;
  columnConfigTip: string;
  filterSubmitTip: string;
  filterResetTip: string;
}

export interface ReactTableProps extends React.HTMLAttributes<any> {
  columns: Column[];
  dataSource?: any[];
  bordered?: boolean;
  resizable?: boolean;
  loading?: boolean;
  rowKey?: string;
  size?: 'mini' | 'small' | 'middle' | 'large';
  header?: any;
  footer?: any;
  pagination?: PaginationProps;
  locale?: ReactTableLocal;

  onChange?: (pagination?: any, filters?: any, sorter?: any) => any;
}

export interface ResizeTableProps {
  width: number | string;
  columnKey: any;
  children: any;
  onResize: (
    e: React.SyntheticEvent<Element, Event>,
    data: ResizeCallbackData
  ) => any;
}
