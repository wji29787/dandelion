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
    <a-table :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #title><a-typography-title :level="5" :style="{textAlign:'center'}">人员防护方案</a-typography-title></template>    
    </a-table>
   <a-card title="人员中毒表现" :headStyle="{textAlign:'center'}" :bordered="false" >
       <a-typography-paragraph>
         1.轻度中毒者可有头痛、头晕、流泪、咽干、咳嗽、恶心呕吐、腹痛、腹泻、步态不稳；皮肤、指甲及粘膜紫组、急性结膜炎、耳鸣、畏光心悸以及面色苍白等症状。
       </a-typography-paragraph>
       <a-typography-paragraph>
         2.中度和重度中毒者，除上述症状加重、睡、反镇、神志恍忽等外，还可能迅速昏迷、脉搏细速、血压下降、全身皮肤、粘膜紫、呼吸增快、抽搐、肌肉震，有的患者还可出现动、欣快、谵妄及周围神经损害，甚至呼吸困难、休克。
       </a-typography-paragraph>
    </a-card>
   <a-card title="急救处理" :headStyle="{textAlign:'center'}" :bordered="false" >
       <a-typography-paragraph>
         1.吸入中毒者，应迅速将患者移至空气新鲜处，脱去被污染衣服，松开所有的衣服及颈、胸部纽扣。腰带，使其静卧，口鼻如有污垢物，要立即清除，以保证肺通气正常，呼吸通畅。并且要注意身体的保暖。
       </a-typography-paragraph>
       <a-typography-paragraph>
         2.口服中毒者应用0.005的活性炭悬液或0.02碳酸氢钠溶液洗催吐，然后服导泻和利尿药物，以加快体内毒物的排泄，减少毒物吸收。
       </a-typography-paragraph>
       <a-typography-paragraph>
         3.皮肤中毒者，应去被污染的衣服和鞋株，用肥皂水和清水反复清洗皮肤和头发。
       </a-typography-paragraph>
       <a-typography-paragraph>
         4.有昏迷、抽搐患者，应及早清除口腔异物，保持呼吸道的通畅，由专人护送医院救治。
       </a-typography-paragraph>
      
    </a-card>
       <!-- <a-descriptions title="人员防护方案" layout="vertical" :colon="false">
         <a-descriptions-item label="防护装备">Cloud Database</a-descriptions-item>
         <a-descriptions-item label="防护装备">Cloud Database</a-descriptions-item>
         <a-descriptions-item label="防护装备">Cloud Database</a-descriptions-item>
         <a-descriptions-item :labelStyle="{}" >Cloud Database</a-descriptions-item>
         <a-descriptions-item >Cloud Database</a-descriptions-item>


       </a-descriptions> -->
       
        <!-- cancelText="取消"
      okText="确定" -->
         </div>
    </a-modal>
    
</template>

<script setup>
import { getCurrentInstance } from 'vue'

// 防护方案
const vm = getCurrentInstance()

const columns = [
    {
      title: '防护装备',
      dataIndex: 'protective',
      key: 'poisonous',
      width:100
    },
    {
      title: '有毒物质',
      dataIndex: 'poisonous',
      key: 'poisonous',
    //   width: 80,
     width:100
    },
    {
      title: '参数',
      dataIndex: 'param',
      key: 'param',
      // ellipsis: true,
    //   width:180
    },
  ];
   const data = [
    {
       
      protective:'呼吸器',
      poisonous:'苯',
      param:'不小于10分钟',
      
    },
    {
      protective:'防护眼镜',
      poisonous:'',
      param:'镜片外表面分别耐96%硫酸,30%氢氧化钠腐蚀1.5小时，无明显变化',
      
    },
    {
      protective:'防护服',
      poisonous:'苯',
      param:'不小于100分钟',
    },
    {
      protective:'防护手套',
      poisonous:'苯',
      param:'不小于100分钟',
    },
    {
      protective:'防护靴',
      poisonous:'苯',
      param:'不小于100分钟',
    },
  ];
const { visible } = defineProps({
  visible:Boolean
})
const emit = defineEmits(['cancel'])
const cancel = ()=>{
    emit('cancel')
}

</script>

