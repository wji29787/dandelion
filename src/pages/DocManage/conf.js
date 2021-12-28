export const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建人',
      dataIndex: 'account',
      key: 'account',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'addDate',
      key: 'addDate',
      // ellipsis: true,
      width:180
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      ellipsis: true,
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      ellipsis: true,
    },
    {
      title: '浏览量',
      dataIndex: 'lookcomunt',
      key: 'lookcomunt',
      ellipsis: true,
    },
    {
      title: '下载量',
      dataIndex: 'downCount',
      key: 'downCount',
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      ellipsis: true,
    },
    {
      title: '操作',
      // dataIndex: '',
      key: 'address 4',
      ellipsis: true,
    },
  ];

  export const data = [
    {
      key: '1',
      name: '烟团扩散模型',
      age: 32,
      address: 'New York',
      tags: ['nice', 'developer'],
      account:'test',
      email:'test@qq.com',
      addDate:'2021-12-28 11:25:06',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:true,
      lastLoginIp:'127.0.0.1',
      version:'0.0.1',
      size:'10MM',
      lookcomunt:'23',
      downCount:'2',
      desc:'',
      
    },
    {
      key: '2',
      name: '蒸汽云爆炸',
      age: 42,
      address: 'London',
      tags: ['loser'],
      account:'admin',
      email:'admin@qq.com',
      addDate:'2021-12-27 16:09:14',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:true,
      lastLoginIp:'127.0.0.1',
      version:'0.0.1',
      size:'10MM',
      lookcomunt:'21',
      downCount:'21',
      desc:'',
    },
    {
      key: '3',
      name: '高斯模型说明',
      age: 32,
      address: 'Sidney',
      tags: ['cool', 'teacher'],
      account:'mcrcc',
      email:'mcrcc@qq.com',
      addDate:'2021-12-26 14:44:32',
      lastLoginDate:'2018-12-29 13:55:30',
      isOpen:false,
      lastLoginIp:'127.0.0.1',
      version:'0.0.1',
      size:'10MM',
      lookcomunt:'3',
      downCount:'31',
      desc:'',
    },
  ];

  export const fileList = [{
    title:'企业空间导航',
    key:'0',
    type:'dir',
    children:[
      {
        title:'烟团扩散分析',
        key:'0-0',
        type:'file',
      },
      {
        title:'蒸汽云爆炸',
        key:'0-1',
        type:'file',
      },
      {
        title:'高斯模型说明',
        key:'0-2',
        type:'file',
      },
    ]
  }]

