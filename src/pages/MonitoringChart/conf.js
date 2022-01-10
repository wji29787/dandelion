// 案例库
export const planPaths = {
    PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
    // 知识库
    PlanInfo:'https://idc.hengxing2016.cn/biochemical/plan#/plan_info',
    // PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
}



let dataConfig = {
     // 影像
  IMAGE: {
    // 全球影像1
    globalImage1: {
      name: "Imagery_Mector_全球表皮",     //发布名称
      url: 0,                         //GIS-Server索引
    },
    // 全球影像2
    globalImage2: {
      name: "111",
      url: 1
    },
    // 四川省影像
    sichuan: {
      name: 'image_sichuansheng_20190108',
      url: 0
    },
    // 金寨高清
    "金寨高清": {
      name: '金寨高清',
      url: 0
    },
    // 
    rjy: {
      name: 'rjy',
      url: 0
    },
    // 湖北省影像服务组
    hubeiGroup: {
      name: "湖北",
      url: 1
    },
    // 影像合并
    imageMerge: {
      name: ["111", "湖北省", "hubei_30"],
      url: 1
    },
    // 北京影像
    beijing: {
      name: 'beijing_new',
      url: 1
    },
    // 纯色地图
    ZNmap: {
      name: 'ZNmap',
      url: 1
    }
  }, 
}

// 常用数据设置
let globalImage = dataConfig.IMAGE.globalImage1;

// 相机操作方式
let cameraControllerType = {
    EV_Type: 'defaultControllerType',             //EV-Globe Desktop桌面版相机操作方式
    googleType: 'googleControllerType',           //谷歌相机操作方式
    defaultType: undefined                        //Cesium默认相机操作方式
};
const EV_DemoData = {
  
      // 基础图层
    Primer:{
        // 影像服务
    Image:{
        // GIS-Server影像
      "01_GIS-Server": globalImage,
    }
  },
  cameraControllerType: cameraControllerType.defaultType,         //设置相机操作方式
}


export {
    EV_DemoData
}
