export const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '操作地址',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: true,
    },
    {
      title: '最后登录IP',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
    },
    {
      title: '最后登录时间',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
    },
  ];

  export const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];