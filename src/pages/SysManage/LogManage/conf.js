export const columns = [
    {
      title: '序号',
      type:'index',
      key: 'index',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'account',
      key: 'account',
 
    },
    {
      title: '操作地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '最后登录IP',
      dataIndex: 'lastLoginIp',
      key: 'lastLoginIp',
      ellipsis: true,
    },
    {
      title: '最后登录时间',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
    },
  ];


  // export const columns = [
  //   {
  //     title: '编号',
  //     dataIndex: 'index',
  //     key: 'index',
  //     width: 80,
  //   },
  //   {
  //     title: '账号',
  //     dataIndex: 'account',
  //     key: 'account',
  //     width: 80,
  //   },
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name',
  //     // ellipsis: true,
  //   },
  //   {
  //     title: '邮箱',
  //     dataIndex: 'email',
  //     key: 'email',
  //     // ellipsis: true,
  //   },
  //   {
  //     title: '添加时间',
  //     dataIndex: 'addDate',
  //     key: 'addDate',
  //     // ellipsis: true,
  //   },
  //   {
  //     title: '最后登录',
  //     dataIndex: 'lastLoginDate',
  //     key: 'lastLoginDate',
  //     // ellipsis: true,
  //   },
  //   {
  //     title: '是否启用',
  //     dataIndex: 'isOpen',
  //     key: 'isOpen',
  
  //   },
  //   {
  //     title: '操作',
  //     key: 'address 42',
  //     width:200
  //   },
  // ];

  export const data = [
    {
      key: '1',
      name: '测试账号',
      age: 32,
      address: 'New York',
      tags: ['nice', 'developer'],
      account:'test',
      email:'test@qq.com',
      addDate:'2018-09-29 13:55:30',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:true,
      lastLoginIp:'127.0.0.1',
    },
    {
      key: '2',
      name: '系统管理员',
      age: 42,
      address: 'London',
      tags: ['loser'],
      account:'admin',
      email:'admin@qq.com',
      addDate:'2018-09-29 13:55:30',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:true,
      lastLoginIp:'127.0.0.1',
    },
    {
      key: '3',
      name: 'mcrcc',
      age: 32,
      address: 'Sidney',
      tags: ['cool', 'teacher'],
      account:'mcrcc',
      email:'mcrcc@qq.com',
      addDate:'2018-09-29 13:55:30',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:false,
      lastLoginIp:'127.0.0.1',
    },
  ];

 