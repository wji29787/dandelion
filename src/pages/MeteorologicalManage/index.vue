<template>
  <div>

     <a-form  layout="inline">
        <a-form-item label="监测站点" v-bind="validateInfos.site">
           <a-select
              ref="select"
              v-model:value="modelRef.site"
              style="width: 120px"
             
            >
            <a-select-option v-for="(item) in siteList" :key="item.value" :value="item.value">{{item.label}}</a-select-option> 
              <!-- <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
            </a-select>
        </a-form-item>
        <a-form-item label="监测日期" v-bind="validateInfos.range" >
          <a-range-picker
            v-model:value="modelRef.range"
            :disabled-date="disabledDate"
             show-time
             format="YYYY-MM-DD HH:mm:ss" 
          />
        </a-form-item>
        <a-form-item >
          <a-button type="primary" @click.prevent="onSubmit">搜索</a-button>
          <!-- <a-button style="margin-left: 10px" @click="reset">Reset</a-button> -->
        </a-form-item>
      </a-form>
   <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500}">
    <template #bodyCell="{ column,index  }">
      <template v-if="column.type === 'index'">
        <span>{{ index+1 }}</span>
      </template>
       
    </template>
  </a-table>
  </div>

</template>
<script setup>
import { ref ,watch ,reactive,toRaw} from "vue";
import { Form } from 'ant-design-vue';
import dayjs from 'dayjs';

import { UploadOutlined,InboxOutlined ,EditFilled,DeleteOutlined ,DownloadOutlined } from '@ant-design/icons-vue';
import { data ,columns,siteList ,fileList} from './conf'

const useForm = Form.useForm;


const  labelCol={
        span: 4,
      }
const  wrapperCol={
    span: 14,
  }
const modelRef = reactive({
      site: '',
      range:[],
    });


  const {
      resetFields,
      validate,
      validateInfos,
    } = useForm(modelRef, reactive({
      site: [{
        required: false,
        message: 'Please input name',
      }],
      range: [{
        required: false,
        message: 'Please input sub name',
      }],
    }));    

const disabledDate = (current)=>{
   return current && current > dayjs().endOf('day');
}

 const onSubmit = () => {
      validate().then(res => {
        const range = toRaw(modelRef).range
        // console.log(res, toRaw(modelRef));
        // if()
      }).catch(err => {
        console.log('error', err);
      });
    };

    const reset = () => {
      resetFields();
    };


 // -------   
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

generateList(fileList);

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
const gData = ref(fileList);

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










</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
</style>