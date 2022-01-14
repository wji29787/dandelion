// 案例库
export const planPaths = {
    PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
    // 知识库
    PlanInfo:'https://idc.hengxing2016.cn/biochemical/plan#/plan_info',
    // PlanManage:'https://idc.hengxing2016.cn/biochemical/plan#/planList',
}



// 相机操作方式
let cameraControllerType = {
    EV_Type: 'defaultControllerType',             //EV-Globe Desktop桌面版相机操作方式
    googleType: 'googleControllerType',           //谷歌相机操作方式
    defaultType: undefined                        //Cesium默认相机操作方式
};
const EV_Data = {
  
      // 基础图层
    Primer:{
        // 影像服务
           
        IMAGE: [
            {
            // 全球影像
            name: "GlobalMercator",     //发布名称
            url: 'http://49.5.9.35:18432' 
            },
            {
            // 
            name: "tianjin_dom_ev",     //发布名称
            url: 'http://49.5.9.35:18432' 
            },
        ], 

        DEM:[
            {
                name:'Dem_China30m',  // 最后这个数据是dem高程数据
                url:'http://49.5.9.35:18432' 
            }
        ],
        
  },
  cameraControllerType: cameraControllerType.defaultType,         //设置相机操作方式
}


export {
    EV_Data
}
