import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Switch from 'rc-switch';
import { useDrop } from 'react-dnd';
import DragSvg from '../assets/drag.svg';
import { Column } from '../interface';
import DragSortItemComponent, { DRAG_SORT_TYPE } from './DragSortItem';
import '../style/switch.less';

interface DragSortProps {
  columns: Column[];
  onSort?: any;
  size?: string;
}

const DragSortComponent = (props: DragSortProps) => {
  const { columns = [], onSort, size = 'middle' } = props;
  const [list, setList] = useState<Column[]>([]);
  const [itemClass, setItemClass] = useState<{
    key: number | null;
    value: string;
  }>({
    key: null,
    value: ''
  });
  const sortItems = useRef<{ dragRow: any; placeRow: any; position: string }>({
    dragRow: {},
    placeRow: {},
    position: ''
  });

  useEffect(() => {
    setList(columns);
  }, [columns]);

  const handleSwitchColumn = (column: Column) => (checked: boolean) => {
    onSort?.(
      _.map(list, item => {
        if (column.key === item.key) {
          return { ...item, hidden: !checked };
        }

        return item;
      })
    );
  };

  const [, drop] = useDrop({
    accept: DRAG_SORT_TYPE,
    drop: () => {
      const { dragRow, placeRow, position } = sortItems.current;
      const oldList: Column[] = _.cloneDeep(list);
      const dragIndex = oldList.findIndex(v => v.key === dragRow.key);
      oldList.splice(dragIndex, 1);
      const placeIndex = oldList.findIndex(v => v.key === placeRow.key);
      // eslint-disable-next-line no-bitwise
      if (~placeIndex && ~dragIndex) {
        oldList.splice(
          position === 'bottom' ? placeIndex + 1 : placeIndex,
          0,
          dragRow
        );
        onSort?.(oldList);
      }
    }
  });

  const onItemDragClass = (key: number, value: string) => {
    if (itemClass.value !== value) {
      setItemClass({ key, value });
    }
  };

  const onSortItemChange = (dragRow: any, placeRow: any, position: string) => {
    sortItems.current = { dragRow, placeRow, position };
  };

  return (
    <div className="drag-sort-component-wrapper" ref={drop}>
      {_.map(list, column => {
        return (
          <DragSortItemComponent
            key={column.key}
            row={column}
            onItemDragClass={onItemDragClass}
            onSortItemChange={onSortItemChange}
            keyName="key"
          >
            <li
              className={`react-table-column-config-item ${
                itemClass.key === column.key ? itemClass.value : ''
              }`}
              key={column.dataIndex}
            >
              <span className="react-table-column-config-item-drag">
                <img src={DragSvg} alt="column-drag" />
              </span>
              <span className="react-table-column-config-item-title">
                {column.title}
              </span>
              <span className="react-table-column-config-item-action">
                <Switch
                  key={column.key}
                  checked={!column.hidden}
                  onChange={handleSwitchColumn(column)}
                  className={`react-table-switch--${size}`}
                  prefixCls="react-table-switch"
                />
              </span>
            </li>
          </DragSortItemComponent>
        );
      })}
    </div>
  );
};

export default DragSortComponent;
