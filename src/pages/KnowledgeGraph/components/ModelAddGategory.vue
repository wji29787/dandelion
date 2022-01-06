<template>
   <a-modal
      v-model:visible="props.modelValue"
      :maskClosable="false"
      :mask="true"
      title="添加节点"
      :footer="null"
      @cancel="cancel"
      @update:visible="update"
    >

        <a-form
        :model="currAddNodeModel"
        ref="addNodeFormRef"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="formRefUpdate"
      >
        <a-form-item label="保存词库">
          <a-switch
            v-model:checked="currAddNodeModel.isSaveLibrary"
            checked-children="是"
            un-checked-children="否"
          />
        </a-form-item>
        <a-row justify="space-between" :gutter="3">
          <a-col :span="16">
            <a-form-item label="节点名称" 
              name="itemName" 
              :rules="{
                required: true,
                message: '节点名称必填',
                trigger: 'change',
            }">
              <a-input
                placeholder="请输入节点名称"
                v-model:value="currAddNodeModel.itemName"
                
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-select
                ref="select1"
                v-model:value="currAddNodeModel.categoryId"
                style="width: 120px"
                @change="categoryChange"
                allowClear
              >
                <a-select-opt-group
                  v-for="item in categoryList1"
                  :key="item.title"
                  :label="item.title"
                >
                  <a-select-option
                    v-for="(ite, cidx) in item.items"
                    :key="cidx + item.title"
                    :value="ite.id"
                    >{{ ite.category }}</a-select-option
                  >
                </a-select-opt-group>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

         <a-space   
          v-for="(item, index) in currAddNodeModel.itemAttrs"
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
           <MinusCircleOutlined :style="{fontSize:'24px',color: '#999'}" @click="removeNodeOneAttr(index)"/>
           <PlusCircleOutlined :style="{fontSize:'24px',color: '#999'}" @click="addNodeOneAttr(index)"/>
        </a-space> 

        <a-form-item
          :label="''"
          style="display: flex; justify-content: center"
          v-if="currAddNodeModel.itemAttrs.length == 0"
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
            v-model:file-list="currAddNodeModel.fileList"
            id="nodeUpdateUpload"
            style="width: 300px"
            @change="nodeAddUploadChange"
            @preview="handlePreview"
          >
            <p v-if="currAddNodeModel.fileList.length <= 3">点击上传</p>
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
// 添加节点
import {

  MinusCircleOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { useModeldata }  from '@/hooks'
import { getBase64 } from '../util'
import ModelPreviewPic from './ModelPreviewPic.vue'


const store = useStore();
const categoryList1 = computed(()=>{
  return store.state.KnowledgeGraph.categoryList1
})

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
const addNodeFormRef = ref()

const categoryChange = (val) => {
  if (val) {
    // getAttrList(val,1);
    store.dispatch('KnowledgeGraph/getAttrList',{
      id:val,
      type:1
    }).then((res)=>{
      if(res){
        currAddNodeModel.value.itemAttrs = res 
      }
    })
  } else {
    currAddNodeModel.value.itemAttrs = [];
  }
};


const removeNodeOneAttr = (index) => {

  currAddNodeModel.value.itemAttrs.splice(index, 1);
};
const addNodeOneAttr = (index) => {
  currAddNodeModel.value.itemAttrs.splice(index + 1, 0, {
    attrName: "",
    attrValue: "",
    mediaType: 1,
  });
};
const addNodeAttr = () => {
  currAddNodeModel.value.itemAttrs.push({
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
  isSaveLibrary: true,
  categoryId: "", // 模版id
}
const currAddNodeModel = ref(initData)

watch(()=>props.modelValue,()=>{
  
   if(props.modelValue){
    
     currAddNodeModel.value = {
       ...toRaw(currAddNodeModel.value),
       ...toRaw(props.data)
     }
   }else {
     currAddNodeModel.value = {
       ...initData
     }
   }
})
const hideModel = ()=>{
   update(false);

}
const onOk = ()=>{



  addNodeFormRef.value.validateFields().then(()=>{
        const d = toRaw(currAddNodeModel.value)
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