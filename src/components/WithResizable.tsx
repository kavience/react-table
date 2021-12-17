import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';
import { ResizeTableProps } from '../interface';

const WithResizable = (props: ResizeTableProps) => {
  const { onResize, width, children, columnKey } = props;
  const [resizableWidth, setResizableWidth] = useState(100);

  useEffect(() => {
    // 延时加载为了获取渲染的标题宽度
    setTimeout(() => {
      if (!width || !_.isNumber(width)) {
        const doms = document.getElementsByClassName(
          `react-table-th--${columnKey}`
        );
        const dom = _.get(doms, 0);
        if (dom) {
          setResizableWidth(dom.clientWidth);
        }
      } else {
        setResizableWidth(Number(width));
      }
    });
  }, []);

  useEffect(() => {
    // 更新实时表头宽度
    if (width && _.isNumber(width)) {
      setResizableWidth(width);
    }
  }, [width]);

  return (
    <Resizable
      width={resizableWidth || 100}
      height={0}
      minConstraints={[100, 0]}
      maxConstraints={[300, 0]}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      {children}
    </Resizable>
  );
};

export default WithResizable;
