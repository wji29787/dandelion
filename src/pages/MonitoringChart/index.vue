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
    <div>
      <ul id="images" style="display: none;">
        <li v-for="(pic,index) in picList" :key="index" ><img :src="pic" alt="Picture 1"></li>
        <!-- <li><img :src="pics.bzy" alt="Picture 2"></li> -->
        <!-- <li><img :src="pics.gsyt" alt="Picture 3"></li>
        <li><img :src="pics.gsytlater" alt="Picture 3"></li> -->
     </ul>
    </div>
    <!--时间轴-->
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
import  bzy from './img/bzy.jpg';
import  normal from './img/normal.jpg';
// import  gsytlater from './img/gsytlater.jpg';
import  gsyt0 from './img/gsyt0.jpg';
import  gsyt20 from './img/gsyt20.jpg';
import  gsyt40 from './img/gsyt40.jpg';
import  gsyt60 from './img/gsyt60.jpg';



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
  if(formData.model){
    
     viewIns.view(models[formData.model])
  }else {
    viewIns.view(models[formData.normal])
  }
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
      viewIns.view(pot[val])
   }
} 
const gobiochemical = (key)=>{
  window.open(currentLinks[key])
}
onMounted(() => {
  // View an image.
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

});
onUnmounted(()=>{
  if(viewIns){
   viewIns.destroy();
    viewIns = null
  }
 
})
</script>

<style lang="less">
.test {
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
  }

}
</style>