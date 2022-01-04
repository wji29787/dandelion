<template>
   <a-modal
      v-model:visible="visible.value"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title=""
      :footer="null"
      @cancel="cancel"
     :bodyStyle="{
         
          paddingTop:'40px'
      }"
    >

    <div :style="{
          maxHeight:'500px',
          overflow:'scroll',
         
      }">

       <a-descriptions   :column="1">
          <template #title>
           
             <a-divider>监测行动方案</a-divider>
            </template> 
         <a-descriptions-item label="区域">重度</a-descriptions-item>
         <a-descriptions-item label="区域地点">东经：116°北纬：40°</a-descriptions-item>
         <a-descriptions-item label="行动内容">以重度区边界为界，对道路、水源等重要位置进行侦察</a-descriptions-item>
         <a-descriptions-item label="采样目标">空气、水</a-descriptions-item>
       
     


       </a-descriptions>
       <a-descriptions   :column="1">
          <template #title>
           
             <a-divider>监测装备</a-divider>
            </template> 
         <a-descriptions-item label="侦察车"></a-descriptions-item>
         <a-descriptions-item label="编配人员">5人</a-descriptions-item>
         <a-descriptions-item label="作业能力">化学侦、毒剂云团遥测、生物检测、定位、通信、气象观测、标志和采样、并能通过通信设备实时传输侦察结果</a-descriptions-item>
         <a-descriptions-item label="最大侦察速度">≥30千米/小时</a-descriptions-item>
       </a-descriptions>
       
        <!-- cancelText="取消"
      okText="确定" -->
         </div>
    </a-modal>
    
</template>

<script setup>

// 侦察方案

const { visible } = defineProps({
  visible:Boolean
})
const emit = defineEmits(['cancel'])
const cancel = ()=>{
    emit('cancel')
}

</script>

