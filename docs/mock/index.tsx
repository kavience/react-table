export const columns: any[] = [
  {
    title: 'username',
    align: 'center',
    width: 200,
    ellipsis: true,
    onFilter: (value, record) => record.name.includes(value),
    sorter: true,
    dataIndex: 'name'
  },
  {
    title: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
    dataIndex: 'age'
  },
  {
    title: 'height',
    dataIndex: 'height'
  },
  {
    title: 'weight',
    dataIndex: 'weight'
  },
  {
    title: 'description',
    dataIndex: 'desc',
    width: 200,
    ellipsis: true
  }
];

export const dataSource = Array.from(new Array(301)).map((_, index) => ({
  id: index + 1,
  name: `kevin${index + 1}`,
  age: Math.floor(Math.random() * 100) + 20,
  height: `${Math.floor(Math.random() * 100) + 100}cm`,
  weight: `${Math.floor(Math.random() * 50) + 20}kg`,
  desc: `I am kevin ${index + 1}I am kevin ${index + 1}I am kevin ${index +
    1}I am kevin ${index + 1}I am kevin ${index + 1}I am kevin ${index +
    1}I am kevin ${index + 1}`
}));
