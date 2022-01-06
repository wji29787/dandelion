<template>
   <a-modal
      v-model:visible="modelValue"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title=""
      :footer="null"
      @cancel="cancel"
       @update:visible="update"
     :bodyStyle="{
          paddingTop:'40px'
          
      }"
    >

    <div :style="{
          maxHeight:'500px',
          overflow:'scroll',
          padding:'0 5px'
         
      }">
       <a-descriptions   :column="1">
          <template #title>
            <!-- <a-typography-title :level="5" :style="{textAlign:'center'}">洗消行动方案</a-typography-title> -->
            <a-divider>洗消行动方案</a-divider>
            </template> 
         <a-descriptions-item label="区域">重度</a-descriptions-item>
         <a-descriptions-item label="区域地点">东经：116°北纬：40°</a-descriptions-item>
         <a-descriptions-item label="洗消目标">苯</a-descriptions-item>
       </a-descriptions>
       <a-descriptions   :column="1">
          <template #title>
            <a-divider>洗消装备</a-divider>
            </template> 
         <a-descriptions-item label="空气净化装置"></a-descriptions-item>
         <a-descriptions-item label="参数">
           额定循环风量：500立方米/小时<br/>
           净化效率：1小时净化效率≥90%
         </a-descriptions-item>
     
       </a-descriptions>
       <a-descriptions   :column="1">
          <template #title>
             <a-divider>喷洒车</a-divider>
            </template> 
         <a-descriptions-item label="参数">
            编配人员 :3人
            <br/>
            预洗：33秒辆~33秒/辆
            <br/>
            消毒：≤33秒/辆
            <br/>
            后清洗：33秒/辆~33秒
            <br/>
            喷洒宽度：≥3米
            <br/>
            喷洒长度：≥3米
            <br/>
            重度区域内预判长度500M:喷酒密度3.0升/米2消毒所用车次为：500100=5(车次)
            <br/>
            中度区域内预判长度800M:喷酒密度2.0升/米2消毒所用车次为：800÷150=5.7(车次)
            <br/>
            轻度区域内预判长度1KM:喷洒密度1.0升/米2消毒所用车次为：1000÷300=3.3(车次）
         </a-descriptions-item>
       </a-descriptions>
       
        <!-- cancelText="取消"
      okText="确定" -->
         </div>
    </a-modal>
    
</template>

<script setup>

// 洗消方案

defineProps({
  modelValue:Boolean
})
const emit = defineEmits(['cancel','update:modelValue'])
const update = (v)=>{
  emit('update:modelValue',v)
}
const cancel = ()=>{
    emit('cancel')
}

</script>

