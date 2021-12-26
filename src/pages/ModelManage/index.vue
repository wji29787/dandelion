<template>
  <div>
    <a-button type="primary" ghost @click="openUpload">模型上传</a-button>
    <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
       <template v-if="column.title === '操作'">
          <a-space>

              <a-button type="primary" size="small">
                <template #icon>
                  <EditFilled/>
                </template>
              </a-button>
              <a-button type="primary"  size="small">
                <template #icon>
                  <DownloadOutlined />
                </template>
              </a-button>
              <a-button type="primary"  size="small">
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>

          </a-space>
       </template>
    </template>
   
  </a-table>


    <a-modal
      v-model:visible="modelData.visible"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title="模型上传"
      @ok="save"
      cancelText="取消"
      okText="确定"
      @cancel="cancel"
    >
     <a-form :model="modelData.formData" >
            <a-form-item label="模型名称:">
              <a-input
                v-model:value="modelData.formData.name"
                
              ></a-input>
            </a-form-item>
            <a-form-item label="模型描述:">
                <a-input
                v-model:value="modelData.formData.desc"
                
              ></a-input>
            </a-form-item>
             <a-form-item label="">
               <a-upload-dragger
                  v-model:fileList="modelData.formData.fileList"
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                >
                  <p class="ant-upload-drag-icon">
                    <inbox-outlined></inbox-outlined>
                  </p>
                  <p class="ant-upload-text">Click or drag file to this area to upload</p>
                  <p class="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p>
                </a-upload-dragger>
            </a-form-item>
          </a-form>
    </a-modal>
  </div>

</template>
<script setup>
import { ref,reactive } from "vue";
import { InboxOutlined ,EditFilled,DeleteOutlined ,DownloadOutlined } from '@ant-design/icons-vue';
import { data ,columns } from './conf'

const defaultData = ()=>{
  return {
     name:'',
     desc:'',
     fileList:[]
  }
}
const modelData = reactive({
  visible:false,
  formData:defaultData()
})
const openUpload = ()=>{
  modelData.visible = true;

}
const cancel = ()=>{
  modelData.visible = false;
  modelData.formData = defaultData()
}
const handleChange = info => {
      const status = info.file.status;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
 };
 const save = ()=>{
    cancel()
    message.success('上传成功');
 }

</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
</style>