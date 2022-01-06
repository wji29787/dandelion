const linkOptions = {
    pro:{
        // 案例库
        PlanManage:'http://32.12.128.21:12301/biochemical/plan#/planList',
        // 知识库
        PlanInfo:'http://32.12.128.21:12301/biochemical/plan#/plan_info',
    },
    test:{
      // 案例库
       PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
       // 知识库
       PlanInfo:'https://idc.hengxing2016.cn/biochemical/plan#/plan_info',
    },
    dev:{
     // 案例库
     PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
     // 知识库
     PlanInfo:'https://idc.hengxing2016.cn/biochemical/plan#/plan_info',
    }
}

export const getEnv = () => {
    try {
      const { origin, port, host } = window.location;
      //  if(port && origin.indexOf(':')){
      //    return 'dev'
      //  }
      // http://32.12.128.21:12301
      if (origin.indexOf('39.102.74.122') > -1) {
         return 'test'
      }
      if (origin.indexOf('32.12.128.21') > -1) {
         return 'pro'
      }
      return 'dev';
    } catch {
      return 'dev';
    }
};

export const ENV = getEnv();
console.log(ENV)

export const currentLinks = linkOptions[ENV]
