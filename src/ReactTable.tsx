import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Dropdown from 'rc-dropdown';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PaginationProps } from 'rc-pagination';
import Pagination from './components/Pagination';
import { Column, ReactTableProps } from './interface';
import FilterActiveSvg from './assets/filter-fill-active.svg';
import FilterSvg from './assets/filter-fill.svg';
import SorterUpSvg from './assets/caret-up.svg';
import SorterUpActiveSvg from './assets/caret-up-active.svg';
import SorterDownSvg from './assets/caret-down.svg';
import SorterDownActiveSvg from './assets/caret-down-active.svg';
import ColumnConfigSvg from './assets/setting.svg';
import DragSortComponent from './components/DragSort';
import './style/index.less';

const ReactTable = (props: ReactTableProps) => {
  const {
    className,
    columns: baseColumns,
    pagination: basePagination,
    size = 'middle',
    dataSource,
    onChange,
    bordered = false,
    rowKey = 'key',
    locale = {
      columnConfigTip: 'show in table',
      filterSubmitTip: 'submit',
      filterResetTip: 'reset',
      paginationLocale: {
        items_per_page: '/ page',
        jump_to: 'jump to',
        jump_to_confirm: 'jump to confirm',
        page: 'page',
        prev_page: 'prev page',
        next_page: 'next page',
        prev_5: 'prev 5 page',
        next_5: 'next 5 page',
        prev_3: 'prev 3 page',
        next_3: 'next 3 page'
      }
    },
    header,
    footer
  } = props;
  const [inputFilters, setInputFilters] = useState<any>({});
  const [filterVisibleKey, setFilterVisibleKey] = useState<any>();
  const [filters, setFilters] = useState<any>({});
  const [sorters, setSorters] = useState<any>({});
  const [columnConfigVisible, setColumnConfigVisible] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({});

  // sort by sorter
  let mergedDataSource = _.cloneDeep(dataSource);
  if (_.isBoolean(sorters.sorter)) {
    if (sorters.direction === 'asc') {
      mergedDataSource = _.sortBy(mergedDataSource, sorters.key);
    } else if (sorters.direction === 'desc') {
      mergedDataSource = _.sortBy(mergedDataSource, sorters.key).reverse();
    }
  } else if (sorters.direction === 'asc') {
    mergedDataSource.sort(sorters.sorter);
  } else if (sorters.direction === 'desc') {
    mergedDataSource.sort(sorters.sorter).reverse();
  }

  // filter by onFilter
  if (Object.keys(filters).length > 0) {
    _.map(filters, (filter, filterKey) => {
      const onFilter: any = _.get(
        _.keyBy(columns, 'dataIndex'),
        `${filterKey}.onFilter`
      );
      mergedDataSource = _.filter(mergedDataSource, record => {
        if (!_.get(filter, 'value')) {
          return true;
        }
        return onFilter?.(_.get(filter, 'value'), record);
      });
    });
  }

  useEffect(() => {
    setColumns(
      _.map(baseColumns, column => ({
        ...column,
        key: column.key || column.dataIndex
      }))
    );
  }, []);

  useEffect(() => {
    if (basePagination !== null) {
      const tempPagination = _.cloneDeep(basePagination || {});
      tempPagination.pageSize =
        tempPagination?.pageSize || tempPagination?.defaultPageSize || 20;
      tempPagination.current =
        tempPagination?.current || tempPagination?.defaultCurrent || 1;
      tempPagination.total = tempPagination?.total || mergedDataSource.length;
      setPagination(tempPagination);
    }
  }, [basePagination]);

  const handleSortColumn = (sortedColumns: Column[]) => {
    setColumns(sortedColumns);
  };

  const handleResetFilter = (column: Column) => () => {
    const key = column.key || column.dataIndex;
    setInputFilters({
      ...inputFilters,
      [key]: undefined
    });
    setFilters({
      ...filters,
      [key]: undefined
    });
    setFilterVisibleKey(undefined);
  };

  const handleDoFilter = (column: Column) => () => {
    const key = column.key || column.dataIndex;
    const filter = _.get(filters, key);
    const newFilters = {
      ...filters,
      [key]: {
        active: _.get(filter, 'active'),
        value: inputFilters[key]
      }
    };
    setFilterVisibleKey(undefined);
    setFilters(newFilters);
    onChange?.(pagination, newFilters, sorters);
  };

  const handleSorter = (column: Column) => () => {
    const key = column.key || column.dataIndex;
    let direction: 'asc' | 'desc' | undefined;
    if (key !== sorters.key) {
      direction = 'asc';
    } else if (!sorters.direction) {
      direction = 'asc';
    } else {
      direction = sorters.direction === 'asc' ? 'desc' : undefined;
    }

    setSorters({
      ...sorters,
      sorter: column.sorter,
      key,
      direction
    });
    onChange?.(pagination, filters, {
      sorter: column.sorter,
      sortKey: key,
      direction
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    const tempPagination = { ...pagination, current: page, pageSize };
    setPagination(tempPagination);
    onChange?.(tempPagination, filters, sorters);
  };

  const renderColgroup = () => {
    return (
      <colgroup>
        {_.map(columns, column => {
          if (!column.hidden) {
            const colStyle: any = {};
            colStyle.width = column.width;
            return (
              <col key={column.key || column.dataIndex} style={colStyle} />
            );
          }
        })}
      </colgroup>
    );
  };

  const renderColumnConfig = () => {
    return (
      <ul className="react-table-column-config-list">
        <div className="react-table-column-config-tip">
          {locale.columnConfigTip}
        </div>
        <DndProvider backend={HTML5Backend}>
          <DragSortComponent
            columns={columns}
            onSort={handleSortColumn}
            size={size}
          />
        </DndProvider>
      </ul>
    );
  };

  const renderHeader = () => {
    return (
      <div className="react-table-header">
        <div className="react-table-header-custom">{header}</div>
        <div className="react-table-header-actions">
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            overlay={renderColumnConfig}
            visible={columnConfigVisible}
            onVisibleChange={visible => {
              setColumnConfigVisible(visible);
            }}
            overlayClassName={`react-table-column-config react-table-column-config--${size}`}
            animation="slide-up"
          >
            <span className="react-table-header-actions-setting">
              <img src={ColumnConfigSvg} alt="table-config" />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  };

  const renderTableTheadColumn = (column: Column) => {
    const key = column.key || column.dataIndex;
    let renderNode: React.ReactNode = (
      <span className="react-table-column-title">{column.title}</span>
    );
    if (column.sorter) {
      renderNode = (
        <div className="react-table-column-sorter">
          {renderNode}
          <span
            className="react-table-thead-sorter"
            onClick={handleSorter(column)}
          >
            <img
              src={
                key === sorters.key && sorters.direction === 'asc'
                  ? SorterUpActiveSvg
                  : SorterUpSvg
              }
              alt="sorter asc"
            />
            <img
              src={
                key === sorters.key && sorters.direction === 'desc'
                  ? SorterDownActiveSvg
                  : SorterDownSvg
              }
              alt="sorter desc"
            />
          </span>
        </div>
      );
    }
    if (column.onFilter) {
      renderNode = (
        <div className="react-table-column-filter">
          {renderNode}
          <Dropdown
            trigger={['click']}
            overlayClassName="react-table-column-filter-overlay"
            placement="bottomRight"
            onVisibleChange={visible => {
              if (visible) {
                setFilterVisibleKey(key);
              } else {
                handleDoFilter(column)();
              }
            }}
            visible={filterVisibleKey === key}
            animation="slide-up"
            overlay={
              <div>
                <input
                  value={_.get(inputFilters, `${key}`) || ''}
                  onKeyUp={e => {
                    if (e.key === 'Enter') {
                      handleDoFilter(column)();
                    }
                  }}
                  onChange={e => {
                    setInputFilters({
                      ...inputFilters,
                      [key]: _.get(e, 'target.value')
                    });
                  }}
                />
                <button onClick={handleResetFilter(column)}>
                  {locale.filterResetTip}
                </button>
                <button onClick={handleDoFilter(column)}>
                  {locale.filterSubmitTip}
                </button>
              </div>
            }
          >
            <span className="react-table-thead-filter">
              <img
                src={
                  _.get(filters, key) && _.get(inputFilters, `${key}`)
                    ? FilterActiveSvg
                    : FilterSvg
                }
                alt="filter"
              />
            </span>
          </Dropdown>
        </div>
      );
    }

    return renderNode;
  };

  const renderTableThead = () => {
    return (
      <thead className="react-table-thead">
        <tr className="react-table-tr">
          {_.map(columns, column => {
            if (!column.hidden) {
              return (
                <th
                  key={column.key || column.dataIndex}
                  className={`react-table-td react-table-td--${column.align ||
                    'left'}`}
                >
                  {renderTableTheadColumn(column)}
                </th>
              );
            }
          })}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    let displayDataSource = mergedDataSource;
    if (basePagination !== null) {
      const pageSize = pagination.pageSize || pagination.defaultPageSize || 20;
      const start =
        ((pagination.current || pagination.defaultCurrent || 1) - 1) * pageSize;
      const end =
        (pagination.current || pagination.defaultCurrent || 1) * pageSize;
      displayDataSource = _.slice(mergedDataSource, start, end);
    }

    return (
      <tbody className="react-table-tbody">
        {_.map(displayDataSource, record => {
          return (
            <tr key={_.get(record, rowKey)} className="react-table-tr">
              {_.map(columns, column => {
                if (!column.hidden) {
                  return (
                    <td
                      key={column.key || column.dataIndex}
                      title={_.get(record, `${column.dataIndex}`)}
                      className={`react-table-td react-table-td--${column.align ||
                        'left'} ${
                        column.ellipsis ? 'react-table-td--ellipsis' : ''
                      } `}
                    >
                      {_.get(record, `${column.dataIndex}`)}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderFooter = () => {
    return <div className="react-table-footer">{footer}</div>;
  };

  return (
    <div
      className={`react-table ${className ?? ''} ${
        bordered ? 'react-table--bordered' : ''
      } ${`react-table--${size}`}`}
    >
      {renderHeader()}
      <table className="react-table-body">
        {renderColgroup()}
        {renderTableThead()}
        {renderTableBody()}
      </table>
      {footer && renderFooter()}
      {basePagination !== null && (
        <Pagination
          onChange={handlePageChange}
          locale={locale.paginationLocale}
          {...pagination}
        />
      )}
    </div>
  );
};

export default ReactTable;
