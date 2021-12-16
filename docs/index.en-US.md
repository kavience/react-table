---
title: willow-component-template
---

## Introduction
a react table component.

## Api

### Table 
| Property   | Description        | Type                                                    | Default  | Version |
| :--------- | :----------------- | :------------------------------------------------------ | :------- | :------ |
| columns    | Table coulmns      | Column[]                                                | []       | 0.0.1   |
| dataSource | Table data source  | any[]                                                   | []       | 0.0.1   |
| bordered   | Show border or not | boolean                                                 | false    | 0.0.1   |
| rowKey     | Row's unique key   | string                                                  | 'key'    | 0.0.1   |
| size       | Table size         | 'mini'   \| 'small' \| 'middle' \| 'large'              | 'middle' | 0.0.1   |
| header     | Table header       | any                                                     |          | 0.0.1   |
| footer     | Table  footer      | any                                                     |          | 0.0.1   |
| pagination | Pagination         | PaginationProps                                         |          | 0.0.1   |
| locale     | Language locale    | ReactTableLocal                                         |          | 0.0.1   |
| onChange   | Table change       | (pagination?: any, filters?: any, sorter?: any) => any; |          | 0.0.1   |

### Column
| Property  | Description                                                                          | Type                                                       | Default | Version |
| :-------- | :----------------------------------------------------------------------------------- | :--------------------------------------------------------- | :------ | :------ |
| key       | Unique key of this column, you can ignore this prop if you've set a unique dataIndex | string                                                     |         | 0.0.1   |
| dataIndex | Display field of the data record                                                     | string                                                     |         | 0.0.1   |
| title     | Column title                                                                         | string                                                     |         | 0.0.1   |
| align     | The specify which way that column is aligned                                         | \'left' \| 'right' \| 'center'                             |         | 0.0.1   |
| width     | Table Width                                                                          | number  \| string                                          |         | 0.0.1   |
| ellipsis  | The ellipsis cell content, not working with sorter and filters for now.              | boolean                                                    | false   | 0.0.1   |
| hidden    | Hidden this column                                                                   | boolean                                                    | false   | 0.0.1   |
| className | Column class                                                                         | string                                                     |         | 0.0.1   |
| onFilter  | Column on filter                                                                     | (value: string, record: any) => boolean;                   |         | 0.0.1   |
| sorter    | Column Sorter                                                                        | ((firstRecord: any, secondRecord: any) => any) \| boolean; |         | 0.0.1   |
