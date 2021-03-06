export const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      // ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      // ellipsis: true,
    },
    {
      title: '添加时间',
      dataIndex: 'addDate',
      key: 'addDate',
      // ellipsis: true,
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginDate',
      key: 'lastLoginDate',
      // ellipsis: true,
    },
    {
      title: '是否启用',
      dataIndex: 'isOpen',
      key: 'isOpen',
  
    },
    {
      title: '操作',
      key: 'address 42',
      width:200
    },
  ];

  export const data = [
    {
      key: '1',
      name: '测试账号',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      account:'test',
      email:'test@qq.com',
      addDate:'2021-12-26 11:47:40',
      lastLoginDate:'2021-12-28 11:02:23',
      isOpen:true,
    },
    {
      key: '2',
      name: '系统管理员',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
      account:'admin',
      email:'admin@qq.com',
      addDate:'2021-12-26 10:38:19',
      lastLoginDate:'2021-12-28 15:31:07',
      isOpen:true,
    },
    {
      key: '3',
      name: 'mcrcc',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      account:'mcrcc',
      email:'mcrcc@qq.com',
      addDate:'2021-12-26 10:22:05',
      lastLoginDate:'2021-12-27 10:53:46',
      isOpen:false,
    },
  ];