import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

interface DragSortItemProps {
  children: any;
  row: any;
  onItemDragClass: (key: number, value: string) => void;
  onSortItemChange: (dragRow: any, placeRow: any, position: string) => void; // 排序后
  keyName: string;
}

export const DRAG_SORT_TYPE = 'sort';

const DragSortItem = (props: DragSortItemProps) => {
  const { row, onItemDragClass, onSortItemChange, keyName, children } = props;
  const ref = useRef<HTMLDivElement>();

  const [{ handlerId }, drop] = useDrop({
    accept: DRAG_SORT_TYPE,
    collect: monitor => {
      return {
        isOver: monitor.isOver({ shallow: true }),
        handlerId: monitor.getHandlerId(),
        canDrop: monitor.canDrop()
      };
    },
    hover: (item: any, monitor) => {
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        const dragIndex = item[keyName];
        const hoverIndex = row[keyName];
        // 如果一样不处理
        if (dragIndex === hoverIndex) {
          onItemDragClass(row[keyName], '');
          return;
        }
        // 获取放置的位置
        const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
        // 获取放置的Y轴中点
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // 获取拖拽目标偏移量
        const clientOffset = monitor.getClientOffset() as XYCoord;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (hoverMiddleY < hoverClientY) {
          onItemDragClass(row[keyName], 'bottom');
        } else {
          onItemDragClass(row[keyName], 'top');
        }
        onSortItemChange(
          item,
          row,
          hoverMiddleY < hoverClientY ? 'bottom' : 'top'
        );
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { ...row, type: DRAG_SORT_TYPE },
    type: DRAG_SORT_TYPE,
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};

export default DragSortItem;
