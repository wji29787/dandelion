<template>
  <div>
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
    <template #bodyCell="{ column,index }">
      <template v-if="column.type === 'index'">
        <span>{{ index+1 }}</span>
      </template>
     
    </template>
  </a-table>
  </div>

</template>
<script setup>
import { ref } from "vue";
import { data ,columns } from './conf'




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