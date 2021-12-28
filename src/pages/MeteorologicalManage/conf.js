export const columns = [
    
    {
      title: '序号',
      type: 'index',
      key: 'index',
      width: 70,
    },
    {
      title: '日期',
      dataIndex: 'addDate',
      key: 'addDate',
      width:180
    },
    {
      title: '空气温度/C',
      dataIndex: 'tmp',
      key: 'tmp',
      width: 120,
    },
    {
      title: '空气湿度(%)',
      dataIndex: 'htmp',
      key: 'htmp',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '测点温度(C)',
      dataIndex: 'sitetmp',
      key: 'sitetmp',
      width: 120,
    
    },
    {
      title: '光线强度(LUX)',
      dataIndex: 'gz',
      key: 'gz',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '蒸发量(mm)',
      dataIndex: 'zfl',
      key: 'zfl',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '风向',
      dataIndex: 'fx',
      key: 'fx',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '风速(m/s)',
      dataIndex: 'fs',
      key: 'fs',
      width: 120,
      // ellipsis: true,
    },
    {
      title: '光有效辐射（uw）',
      dataIndex: 'gfs',
      key: 'gfs',
      width: 120,
      // ellipsis: true,
    },
    {
      title: '紫外辐射(uw)',
      dataIndex: 'zwfs',
      key: 'zwfs',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '降雨量(mm)',
      dataIndex: 'jyq',
      key: 'jyq',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '大气压(Hpa)',
      dataIndex: 'pa',
      key: 'pa',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '二氧化碳(Hpa)',
      dataIndex: 'c2o',
      key: 'c2o',
      // ellipsis: true,
      width: 120,
    },
    {
      title: '总辐射(w/m)',
      dataIndex: 'zfs',
      key: 'zfs',
      width: 120,
      // ellipsis: true,
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
      size:'10MB',
      lookcomunt:'23',
      downCount:'2',
      desc:'',
      tmp:'5',
      htmp:'5',
      sitetmp:'5',
      gz:'5',
      zfl:'5',
      fx:'东南风',
      fs:'5',
      gfs:'5',
      zwfs:'5',
      jyq:'5',
      pa:'5',
      c2o:'5',
      zfs:'',
      
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
      size:'10MB',
      lookcomunt:'21',
      downCount:'21',
      desc:'',
      tmp:'12',
      htmp:'12',
      sitetmp:'12',
      gz:'12',
      zfl:'12',
      fx:'东南风',
      fs:'3',
      gfs:'3',
      zwfs:'3',
      jyq:'3',
      pa:'3',
      c2o:'3',
      zfs:'',
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
      size:'10MB',
      lookcomunt:'3',
      downCount:'31',
      desc:'',
      tmp:'17',
      htmp:'17',
      sitetmp:'17',
      gz:'17',
      zfl:'17',
      fx:'东南风',
      fs:'17',
      gfs:'17',
      zwfs:'17',
      jyq:'17',
      pa:'17',
      c2o:'17',
      zfs:'',
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

const createList = (num=10,temp)=>{
   let n = 0;
  const list = [];
  const { label,value } = temp
    while(n<num){
       
       list.push({
         label:`${label}${n}`,
         value:`${value}${n}`
       })
       n++;
    }
    return list
}

export const siteList = createList(10,{label:'站点',value:'code'})