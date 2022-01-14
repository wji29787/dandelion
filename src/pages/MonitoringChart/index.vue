<template>
  <div class="test">
    <div class="left">
      <div class="title" :style="{'word-break': 'keep-all'}">请输入坐标或者地图中点击</div>
      <a-form :model="formData" class="formmap">
        <a-form-item label="经度">
          <a-input />
        </a-form-item>
        <a-form-item label="纬度">
          <a-input />
        </a-form-item>
         <a-form-item label="选择模型">
          <a-select placeholder="请选择模型"  v-model:value="formData.model" allowClear>
            <a-select-option value="gsyt">高斯烟团模型</a-select-option>
            <a-select-option value="bzy">爆炸云模型</a-select-option>
          </a-select>
        </a-form-item>
      <!-- </a-form> -->
      <div class="title">污染信息</div>
      <!-- <a-form> -->
        <a-form-item label="名称">
          <a-input placeholder="污染物名称" />
        </a-form-item>
         <a-form-item label="类别">
          <a-select placeholder="请选择类别" v-model:value="formData.type">
            <a-select-option value="shanghai">化学品</a-select-option>
          </a-select>
        </a-form-item>
        
      <template v-if="formData.model==='gsyt'">
         <a-form-item label="时间">
          <a-date-picker show-time placeholder="时间" />
        </a-form-item>
         <a-form-item label="泄露密度">
          <a-input placeholder="单位mg/m" />
        </a-form-item>
         <a-form-item label="风向">
          <a-input placeholder="风向" />
        </a-form-item>
         <a-form-item label="风速">
          <a-input placeholder="风速" />
        </a-form-item>
         <a-form-item label="区域">
           <a-select placeholder=""  :style="{overflow:'hidden'}" v-model:value="formData.area" >
            <a-select-option value="gsyt">平原地区或郊区</a-select-option>
            <a-select-option value="bzy">工业区或丘陵区</a-select-option>
          </a-select>
        </a-form-item>
      </template>
       <template v-if="formData.model==='bzy'">
        <a-form-item label="总量">
          <a-input placeholder="单位mg" />
        </a-form-item>
      </template>
       
     
       
        
        <!-- <div style="text-align: center;">
          <a-button >导入气象数据</a-button>
        </div> -->
       
       
      </a-form>
       <div class="left-footer">
          <div style="text-align: center;" >
            <a-button  class="handle-btn" type="primary" @click="createPic">确认生成</a-button >
          </div>
          <div style="text-align: center;  margin-top: 10px;">
          
            <a-button class="handle-btn" @click="gobiochemical('PlanManage')"  >案例库</a-button>
          </div>
          <div style="text-align: center; margin-top: 10px;">
            <a-button class="handle-btn" @click="gobiochemical('PlanInfo')">知识库</a-button>
          </div>
        </div>
    </div>
    <!-- <div> -->
      <!-- <ul id="images" style="display: none;"> -->
        <!-- <li v-for="(pic,index) in picList" :key="index" ><img :src="pic" alt="Picture 1"></li> -->
        <!-- <li><img :src="pics.bzy" alt="Picture 2"></li> -->
        <!-- <li><img :src="pics.gsyt" alt="Picture 3"></li>
        <li><img :src="pics.gsytlater" alt="Picture 3"></li> -->
     <!-- </ul> -->
    <!-- </div> -->
    <!--时间轴-->
    <div id="cesiumContainer" class="cesiumContainer"></div>
     <div class="time-box" v-if="showSlider">
       <a-form>
          <a-form-item  :colon="false">
            <template #label>
              <span :style="{color:'#FFF'}">时间轴</span>
            </template>
            
           <a-slider v-model:value="timeSLider" :min="0" :max="3"  :marks="masks" @change="timeSLiderChange">
              <template #mark="{label}">
              <span :style="{color:'#FFF'}">{{label}}</span>
            </template> 

           </a-slider >
        </a-form-item>
       </a-form>
     </div>
    <!-- <img id="image" style="display: none;" src="@/images/map.jpg" alt="Picture" /> -->
    <div class="right">
      <!-- <div class="title">请输入坐标或者地图中点击</div> -->
      <a-form>
        <a-form-item label="侦察方案">
          <a-button @click="modelData2.open">详情>></a-button>
        </a-form-item>
        <!-- <a-form-item label="装备">
     
        </a-form-item> -->
      <!-- </a-form> -->
      <!-- <a-form> -->
        <!-- <a-form-item label="数量">
        </a-form-item> -->
        <!-- <a-form-item label="目标物">

        </a-form-item> -->
        <!-- <a-form-item label="地点">
        </a-form-item> -->
        <a-form-item label="人员方案">
         <a-button @click="modelData1.open" >详情>></a-button>
        </a-form-item>
        <!-- <a-form-item label="装备">

        </a-form-item> -->
        <!-- <a-form-item label="使用时长">
        </a-form-item> -->
         <a-form-item label="消洗方案">

         <a-button @click="modelData3.open">详情>></a-button>
        </a-form-item>
        <!-- <a-form-item label="装备">

        </a-form-item> -->
        <!-- <a-form-item label="消息地">
        </a-form-item> -->
        <!-- <a-form-item label="地点">
        </a-form-item> -->
      </a-form>
    </div>

    <ModelPersonnelProtection  v-model="modelData1.visible.value"  @cancel="modelData1.cancel"  />
    <ModelReconnaissance  v-model="modelData2.visible.value"  @cancel="modelData2.cancel"  />
    <ModelEliminate  v-model="modelData3.visible.value"  @cancel="modelData3.cancel"  />
  </div>
</template>

<script setup>
// You should import the CSS file.

import { onMounted ,reactive,ref,onUnmounted,watch} from 'vue';
import { useModeldata }  from '@/hooks'
import ModelPersonnelProtection  from './components/ModelPersonnelProtection.vue'
import ModelReconnaissance  from './components/ModelReconnaissance.vue'
import ModelEliminate  from './components/ModelEliminate.vue'
import { currentLinks } from '@/utils/config.js'


import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

// import { Cesium } from './Cesium'
import {  planPaths ,EV_Data} from './conf'

import  bzy from './img/bzy.jpg';
import  normal from './img/normal.jpg';
// import  gsytlater from './img/gsytlater.jpg';
import  gsyt0 from './img/gsyt0.jpg';
import  gsyt20 from './img/gsyt20.jpg';
import  gsyt40 from './img/gsyt40.jpg';
import  gsyt60 from './img/gsyt60.jpg';

// import positiveX from './img/starmap_2020_16k/starmap_2020_16k_px';
// import negativeX from './img/starmap_2020_16k/starmap_2020_16k_mx';
// import positiveY from './img/starmap_2020_16k/starmap_2020_16k_py';
// import negativeY from './img/starmap_2020_16k/starmap_2020_16k_my';
// import positiveZ from './img/starmap_2020_16k/starmap_2020_16k_pz';
// import negativeZ from './img/starmap_2020_16k/starmap_2020_16k_mz';







// model
const modelData1 = useModeldata();
const modelData2 = useModeldata();
const modelData3 = useModeldata();

const pics = {
  normal:normal,
  bzy:bzy,
  gsyt0:gsyt0,
  gsyt20:gsyt20,
  gsyt40:gsyt40,
  gsyt60:gsyt60,
}
const picList = Object.keys(pics).map(key=>pics[key])
let viewIns = null
const formData = reactive({
      model:''
})


// 创建图片
const createPiew = ()=>{
   viewIns = new Viewer(document.getElementById('images'), {
    inline: true,
    viewed() {
      viewIns.zoomTo(0.7);
    },
    ready(){
      setPic()
    },
    backdrop: false,
    button: false,
    toolbar: false,
    minHeight: 700,
    fullscreen: false,
    navbar:false
    // movable: false
  });

}
const timeSLider = ref(0);
const showSlider = ref(false)
const masks = ref({
  0:"0′",
  1:'20′',
  2:'40′',
  3:'60′',
 
})
const createPic = ()=>{
      
       setPic()
}
const setPic = ()=>{

  const models = {
    normal:0,
    gsyt:2,
    bzy:1,
  }
  if(formData.model==='gsyt'){
    timeSLider.value = 0;
    showSlider.value = true
  }else {
    showSlider.value = false
  }
  // if(formData.model){
    
  //    viewIns.view(models[formData.model])
  // }else {
  //   viewIns.view(models[formData.normal])
  // }
}
watch(()=>formData.model,(model)=>{
   
   setPic()
})
const timeSLiderChange = (val)=>{
   const pot = {
     0:2,
     1:3,
     2:4,
     3:5,
  
   }
   if(pot[val]){
      // viewIns.view(pot[val])
   }
} 
const gobiochemical = (key)=>{
  window.open(currentLinks[key])
}


// 地图
let viewer =null;

 function startup() {
        const Cesium = window.Cesium
        console.log(Cesium)
         
         
        const dataConf = EV_Data.Primer; 
        let cameraControllerType = EV_Data.cameraControllerType;    //相机操作方式设置

         viewer = new Cesium.Viewer('cesiumContainer',{
            animation: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: false,
            navigationHelpButton: false,
            skyBox : new Cesium.SkyBox({        //自定义天空盒,星空效果更好，但对低配置电脑有一些性能影响
                sources: {
                  positiveX: "/starmap_2020_16k/starmap_2020_16k_px.jpg",
                  negativeX: "/starmap_2020_16k/starmap_2020_16k_mx.jpg",
                  positiveY: "/starmap_2020_16k/starmap_2020_16k_py.jpg",
                  negativeY: "/starmap_2020_16k/starmap_2020_16k_my.jpg",
                  positiveZ: "/starmap_2020_16k/starmap_2020_16k_pz.jpg",
                  negativeZ: "/starmap_2020_16k/starmap_2020_16k_mz.jpg",
                },
            })
        });
        /**
         * http://47.94.8.209:8080/earthview/services/EV_WebService/get/wmts/10000/GetWMTSLayersInfo?tileLayerName=GlobalMercator%2C%E6%B9%96%E5%8C%97%E7%9C%81
http://47.94.8.209:8080/EV_WebService/get/wmts/10000/GetWMTSLayersInfo?tileLayerName=GlobalMercator%2C%E6%B9%96%E5%8C%97%E7%9C%81
         * 
         * 
        */
        // const names = ['GlobalMercator','湖北省'];  // "henanDOM2m_ev"
        // const names = ['世界_DOM墨卡托_1至9级','上海2mDOM_ev'];  // "henanDOM2m_ev"
         //  const names ='世界_DOM墨卡托_1至9级';  // "henanDOM2m_ev"
         const names ='tianjin_dom_ev';  // "henanDOM2m_ev"
        // const names ='上海2mDOM_ev';  // "henanDOM2m_ev"
        // const names =['GlobalMercator'];  // "henanDOM2m_ev"
        // const names =['上海2mDOM_ev'];  // "henanDOM2m_ev"
       
        // const serverUrl = 'http://aimsky.cn';
        // const serverUrl = 'http://47.94.8.209:8080';
        //  const serverUrl = 'http://39.102.74.122:13007'
         const serverUrl = 'http://49.5.9.35:18432'
        const scene = viewer.scene;
        scene.debugShowFramesPerSecond = true;                      //显示帧率
        // viewer.extend(Cesium.viewerCesiumInspectorMixin);      
       
        // 创建图层管理器
        const evLayerManager = new Cesium.EV_LayerManager(scene);
        Object.keys(dataConf).forEach(key=>{
          const type = Cesium.EV_LayerType[key];
          const data =dataConf[key];
          data.forEach(item=>{
              // const { name,url }= item;
            const layer =  evLayerManager.add({
                 type,
                 ...item
              })

            layer.readyPromise.then(()=>{
              // viewer.camera.flyTo({
              //       destination:imageLayer.rectangle
              //     })
                    // viewer.camera.setView({
                    //   destination: Cesium.Cartesian3.fromDegrees(111,38,18000000)
                    // });
            })
          }) 
         
        })

        // 加载影像   // henanDOM2m_ev  世界_DOM墨卡托_1至9级
        // let imageLayer = evLayerManager.add({
        //   name: names,                          //图层名称
        //   url: serverUrl,                            //GIS-Server地址
        //   type: Cesium.EV_LayerType.IMAGE,    //图层类型
        //   tileType:Cesium.EV_TileAlgorithmType.WebMercator,        // 投影类型
        //   // queryParam: data.queryParam,              //请求参数
        //   format:"image/png",
        //   imageOption: {}	
        // });
       
    

        // console.log('play',imageLayer)
        //  imageLayer.readyPromise.then(()=>{
          //  viewer.camera.flyTo({
          //    destination:imageLayer.rectangle
          //  })
          	// viewer.camera.setView({
            //   destination: Cesium.Cartesian3.fromDegrees(111,38,18000000)
            // });
        //  })
        // 设置相机操作方式
        // if (cameraControllerType) {
        //     let evCameraController = new Cesium.EV_CameraControllerType(viewer);
        //     evCameraController[cameraControllerType]();
        // }
    }

onMounted(() => {
 
    startup()
});
onUnmounted(()=>{
  if(viewIns){
   viewIns.destroy();
    viewIns = null
  }
  if(viewer){
     Cesium.destroyObject(viewer)
     viewer = null;
  }
 
})
</script>

<style lang="less" scoped>
.test {
  width:100%;
  height: 100%;
  position: relative;
  .formmap{
    height: 100%;
    overflow: scroll;
  }
  .left,
  .right {
    position: absolute;
    z-index: 999;
    height: 700px;
    width: 170px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.5);
  }
   .left{
    // overflow: scroll;
    padding-bottom: 170px;
  }
  .time-box{
     position: absolute;
     z-index: 999;
     width:300px;
     height: 30px;
     top:30px;
     left:50%;
     transform: translateX(-50%);

  }
  // .left {
  //   position: relative;
  //   left: 0;
  //
  // }
  .handle-btn{
    width: 90px;
    text-align: center;
  }
  .left-footer {
      position: absolute;
      bottom:10px;
      width: 100%;
     
    }
  .right {
    right: 0;
    top:0
  }
  #cesiumContainer{
     width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
}
</style>
<style >
.sectionChars {
    top: auto;
    width: 90%;
    height: 200px;
    bottom: 10px;
    left: 5%;
    top: auto;
    bottom: 10px;
    display: none
}
.infoview {
    position: absolute;
    padding: 10px 15px;
    border-radius:4px ;
    border: 1px solid rgba(128,128,128,.5);
    color:#fff;
    background: rgba(0,0,0,.4);
    box-shadow: 0 3px 14px rgba(128,128,128,.5);
    z-index: 999;
    opacity: 0.8;
}

</style>