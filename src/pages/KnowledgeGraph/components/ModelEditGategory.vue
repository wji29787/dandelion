<template>
   <a-modal
      v-model:visible="props.modelValue"
      :maskClosable="false"
      :mask="true"
      title="修改"
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
       <a-row justify="space-between" :gutter="8" align="middle">
         <a-col :span="18">
            <a-form-item label="节点名称">
              <a-input
                placeholder="请输入节点名称"
                v-model:value="currentModel.itemName"
              />
          </a-form-item>
         </a-col>
         <a-col :span="6">
            <a-form-item label="">
                <el-color-picker
                v-model="currentModel.nodeColor"
              ></el-color-picker>
          </a-form-item>
         </a-col>

       </a-row>
         <a-space   
          v-for="(item, index) in currentModel.itemAttrs"
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
          v-if="isHaveitemAttrs == -1"
        >
          <a-button type="primary" style="margin: 0 auto" @click="addNodeAttr">
            <PlusOutlined />
            添加属性
          </a-button>
        </a-form-item>

        <a-form-item label="照片">
          <a-upload
            :before-upload="nodeUpdateBeforeUpload"
            list-type="picture-card"
            v-model:file-list="currentModel.fileList"
            id="nodeUpdateUpload"
            style="width: 300px"
            @change="nodeAddUploadChange"
            @preview="handlePreview"
          >
            <p v-if="currentModel.fileList.length <= 3">点击上传</p>
          </a-upload>
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
       <!-- 图片预览 -->
      <ModelPreviewPic v-model="preViewvisible" :src="formData.previewImage" />
    </a-modal>
    
</template>

<script setup>
import { ref ,watch,readonly,toRaw,computed,onMounted } from 'vue'
import { useStore } from "vuex";
// 属性编辑弹出框
import {

  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { useModeldata }  from '@/hooks'
import { getBase64 } from '../util'
import ModelPreviewPic from './ModelPreviewPic.vue'


const store = useStore();

const isHaveitemAttrs = computed(() => {
  return currentModel.value.itemAttrs.findIndex((item) => {
    return item.mediaType == "1";
  });
});
const props = defineProps({
  modelValue:Boolean,
  data:Object
})
const emit = defineEmits(['cancel','update:modelValue','onOk'])
const update = (v)=>{
  emit('update:modelValue',v)
}
const cancel = ()=>{
    emit('cancel')
}
const labelCol = { style: { width: "80px" } };
const wrapperCol = { span: 20 };
const form = ref()

const remove = (index) => {

  currentModel.value.itemAttrs.splice(index, 1);
};
const add = (index) => {
  currentModel.value.itemAttrs.splice(index + 1, 0, {
    attrName: "",
    attrValue: "",
    mediaType: 1,
  });
};
const addNodeAttr = () => {
  currentModel.value.itemAttrs.push({
    attrName: "",
    attrValue: "",
    mediaType: 1,
  });
};

/**
 * 上传
 * 
*/
const nodeUpdateBeforeUpload = () => {
  return false;
};
const nodeAddUploadChange = (e) => {
  console.log(e);
};
const handlePreview = async (file) => {

  if (!file.url) {
    file.url = await getBase64(file.originFileObj);
  }
  formData.value.previewImage = file.url;
  preViewvisible.value = true;
};


// 图片预览
const { visible:preViewvisible,formData ,cancel:preCancel} = useModeldata({
  previewImage:''
})

const initData = {
  itemName: "",
  id: "",
  itemAttrs: [],
  fileList: [],
  categoryId: "", // 模版id
  nodeColor:'#00ff55'
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