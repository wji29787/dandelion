<template>
   <a-modal
      v-model:visible="props.modelValue"
      :maskClosable="false"
      :mask="true"
      title="添加/修改关系"
      :footer="null"
      @cancel="cancel"
      @update:visible="update"
    >
      <a-form
        :model="currentModel"
        ref="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="formRefUpdate"
      >
        <a-form-item label="关系名称">
          <a-select
            ref="select"
            v-model:value="currentModel.select"
            style="width: 100%"
            @change="categoryChange"
          >
            <a-select-opt-group
              v-for="(item, idx) in categoryList2"
              :key="idx"
              :label="item.title"
            >
              <a-select-option
                v-for="(ite, cidx) in item.items"
                :key="cidx"
                :value="ite.id"
                >{{ ite.category }}</a-select-option
              >
            </a-select-opt-group>
          </a-select>
        </a-form-item>
         <a-space   
          v-for="(item, index) in currentModel.list"
          :key="item.id"
          align="baseline"
          style="display: flex; margin-bottom: 8px"
          >
           <a-form-item
          
            :name="['itemAttrs', index, 'attrName']"
            :rules="{
              required: true,
              message: '属性名称必填',
              trigger: 'change',
            }"
          >
           <a-input
                  placeholder="属性名"
                  v-model:value="item.attrName"
                  style="text-align: right"
                />

          </a-form-item>
           <a-form-item
            
            :name="['itemAttrs', index, 'attrValue']"
            :rules="{
              required: true,
              message: '属性值必填',
              trigger: 'change',
            }"
          >
            <a-input placeholder="属性值" v-model:value="item.attrValue" />

          </a-form-item>
           <MinusCircleOutlined :style="{fontSize:'24px',color: '#999'}" @click="remove(index)"/>
           <PlusCircleOutlined :style="{fontSize:'24px',color: '#999'}" @click="add(index)"/>
        </a-space> 

         <a-form-item
          :label="''"
          style="display: flex; justify-content: center"
           v-if="currentModel.list.length == 0"
        >
          <a-button type="primary" style="margin: 0 auto" @click="addNodeAttr">
            <PlusOutlined />
            添加属性
          </a-button>
        </a-form-item>

      

         <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-row
            type="flex"
            justify="space-around"
            align="middle"
            style="width: 100%"
          >
            <a-col :span="4">
              <a-button
                type="default"
                round
                style="width: 100px"
                @click="hideModel"
                >取消</a-button
              >
            </a-col>
            <a-col :span="4">
              <a-button
                type="primary"
                round
                style="width: 100px"
                @click="onOk"
                >确定</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>
    
</template>

<script setup>
import { ref ,watch,readonly,toRaw,computed,onMounted } from 'vue'
import { useStore } from "vuex";
// 添加关系弹出框
import {

  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { useModeldata }  from '@/hooks'
import { getBase64 } from '../util'
import ModelPreviewPic from './ModelPreviewPic.vue'


const defaultattrsItem = (data={})=>{
  return {
    attrName:'',
    mediaType:'文本', // 图片 文本 // 默认文本
    categoryId:new Date().getTime(),
    ...data
  }
}


const store = useStore();

const labelCol = { style: { width: "80px" } };
const wrapperCol = { span: 20 };
const form = ref()

const props = defineProps({
  modelValue:Boolean,
  data:Object
})

const categoryList2 = computed(()=>{
  return store.state.KnowledgeGraph.categoryList2
})
const emit = defineEmits(['cancel','update:modelValue','onOk'])
const update = (v)=>{
  emit('update:modelValue',v)
}
const cancel = ()=>{
    emit('cancel')
}


const remove = (index) => {

  currentModel.value.list.splice(index, 1);
};
const add = (index) => {
  currentModel.value.list.splice(index + 1, 0, defaultattrsItem());
};
const addNodeAttr = () => {
  currentModel.value.list.push(defaultattrsItem());
};


const categoryChange = (val) => {
  if (val) {
    
    store.dispatch('KnowledgeGraph/getAttrList',{
      id:val,
      type:2
    }).then((res)=>{
      if(res){
        currentModel.value.list = res 
      }else{
         currentModel.value.list = [];
      }
    })
  } else {
    currentModel.value.list = [];
  }
};
const initData = {
  select:'',
  list: [],

}
const currentModel = ref(initData)

watch(()=>props.modelValue,()=>{
  
   if(props.modelValue){
    
     currentModel.value = {
       ...toRaw(currentModel.value),
       ...toRaw(props.data)
     }
   }else {
     currentModel.value = {
       ...initData
     }
   }
})
const hideModel = ()=>{
   update(false);

}
const onOk = ()=>{

  form.value.validateFields().then(()=>{
        const d = toRaw(currentModel.value)
        emit('onOk',d)
  })
 
}
onMounted(()=>{
 // sureAddModal
})
</script>

<style scoped>
 .formRefUpdate {
  max-height: 400px;
  overflow: auto;
}
</style>