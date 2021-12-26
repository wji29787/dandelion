<template>
  <div>
  <a-row :gutter="6">
   <a-col :span="6">
      <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>

   </a-col>
   <a-col :span="18">
      <a-space>
    
    <a-button type="primary">创建目录</a-button>
    <a-button @click="openUpload">
        <UploadOutlined />
         上传文件
    </a-button>
   

  </a-space>

    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
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
                  <DeleteOutlined />
                </template>
              </a-button>

          </a-space>
       </template>
    </template>
  </a-table>

   </a-col>

  </a-row>
   <a-modal
      v-model:visible="modelData.visible"
      :maskClosable="false"
      :mask="true"
      width="500px"
      title=" "
      @ok="save"
      cancelText="取消"
      okText="确定"
      @cancel="cancel"
    >
     <a-form :model="modelData.formData" >
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
                  <p class="ant-upload-text">点击或将文件拖拽到这里上传</p>
                  <p class="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p>
                </a-upload-dragger>
            </a-form-item>
            <a-form-item label="文档描述:">
              <a-input
                v-model:value="modelData.formData.desc"
                
              ></a-input>
            </a-form-item>
            <a-form-item label="文档作者:">
                <a-input
                v-model:value="modelData.formData.author"
              ></a-input>
            </a-form-item>
            <a-form-item label="文档时间:">
                <a-input
                v-model:value="modelData.formData.createDate"
              ></a-input>
            </a-form-item>
            <a-form-item label="文档标签:">
                <a-input
                v-model:value="modelData.formData.tag"
              ></a-input>
            </a-form-item>
            
          </a-form>
    </a-modal>
  </div>

</template>
<script setup>
import { ref ,watch ,reactive} from "vue";

import { UploadOutlined,InboxOutlined ,EditFilled,DeleteOutlined ,DownloadOutlined } from '@ant-design/icons-vue';
import { data ,columns } from './conf'

const x = 3;
const y = 2;
const z = 1;
const genData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || genData;
  const children = [];

  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: `文件${key}`,
      key,
      type:'dir'
    });

    if (i < y) {
      children.push(key);
    }
  }

  if (_level < 0) {
    return tns;
  }

  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);
const dataList = [];

const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({
      key,
      title: key,
    });

    if (node.children) {
      generateList(node.children);
    }
  }
};

generateList(genData);

const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};

const expandedKeys = ref([]);
const searchValue = ref('');
const autoExpandParent = ref(true);
const gData = ref(genData);

const onExpand = keys => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

watch(searchValue, value => {
  const expanded = dataList.map(item => {
    if (item.title.indexOf(value) > -1) {
      return getParentKey(item.key, gData.value);
    }

    return null;
  }).filter((item, i, self) => item && self.indexOf(item) === i);
  expandedKeys.value = expanded;
  searchValue.value = value;
  autoExpandParent.value = true;
});



const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
});


// 上传 model

const defaultData = ()=>{
  return {
     name:'',
     desc:'',
     fileList:[],
     author:'',
     createDate:'',
     tag:''
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