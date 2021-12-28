<template>
  <div>
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
    <template #bodyCell="{ column,index }">
      <template v-if="column.type === 'index'">
        <span>{{ index+1 }}</span>
      </template>
      <template v-if="column.dataIndex === 'lastLoginDate'">
        <span>{{lastTime||''}}</span>
      </template>
     
    </template>
  </a-table>
  </div>

</template>
<script setup>
import { ref ,computed} from "vue";
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import { data ,columns } from './conf'


const store = useStore();

const lastTime  = computed(()=>{
  const d = store.state.commons.lastLoginTime;
  if(d){
    return dayjs(d).format('YYYY.MM.DD')
  }
  return null
})


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

</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
</style>