<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
    <template #bodyCell="{ column, record,index }">
       <template v-if="column.dataIndex === 'index'">
        <i>{{ index+1 }}</i>
      </template>
       <template v-if="column.dataIndex === 'isOpen'">
         <a-switch v-model:checked="record.isOpen" ></a-switch>
      </template>
     
      <template v-if="column.title === '操作'">
          <a-button size="small" type="link" @click="setRole(record)">分配角色</a-button>
          <a-button size="small" type="link" @click="editRole(record)">编辑</a-button>
          <a-button size="small" type="link">删除</a-button>
      </template>
    </template>
 
  </a-table>

    <a-modal
      v-model:visible="modelData.visible"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title="分配角色"
      @ok="save"
      cancelText="取消"
      okText="确定"
      @cancel="cancel"
    >
     <a-form :model="modelData.formData" >
            <a-form-item label="账号:">
               <span>admin</span>
            </a-form-item>
            <a-form-item label="姓名:">
               <span>系统管理员</span>
            </a-form-item>
             <a-form-item label="分配角色为:">
                 <a-input
                v-model:value="modelData.formData.role"
                ></a-input>
            </a-form-item>
          </a-form>
    </a-modal>
    <a-modal
      v-model:visible="modelData1.visible"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title="编辑角色"
      @ok="save1"
      cancelText="取消"
      okText="确定"
      @cancel="cancel1"
    >
     <a-form :model="modelData1.formData" >
            <a-form-item label="账号:">
                <a-input
                v-model:value="modelData1.formData.account"
                ></a-input>
            </a-form-item>
            <a-form-item label="姓名:">
                 <a-input
                v-model:value="modelData1.formData.name"
                ></a-input>
            </a-form-item>
             <a-form-item label="邮箱:">
                 <a-input
                v-model:value="modelData1.formData.email"
                ></a-input>
            </a-form-item>
          </a-form>
    </a-modal>
  </div>

</template>
<script setup>
import { ref ,reactive} from "vue";
import { data ,columns } from './conf'


const defaultData = ()=>{
  return {
     name:'',
     desc:'',
     role:'系统管理员'
  }
}
const modelData = reactive({
  visible:false,
  formData:defaultData()
})
const setRole = (row)=>{
  console.log(row)
  modelData.visible = true;

}
const cancel = ()=>{
  modelData.visible = false;
  modelData.formData = defaultData()
}
 const save = ()=>{
    cancel()
    message.success('上传成功');
 }
const defaultData1 = ()=>{
  return {
     name:'',
     desc:'',
     role:'系统管理员'
  }
}
const modelData1 = reactive({
  visible:false,
  formData:defaultData1()
})
const editRole = (row)=>{
  console.log(row)
  modelData1.visible = true;

}
const cancel1 = ()=>{
  modelData1.visible = false;
  modelData1.formData = defaultData()
}
 const save1 = ()=>{
    cancel1()
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