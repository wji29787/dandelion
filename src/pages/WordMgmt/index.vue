<template>
  <div id="WordMgmt">
    <a-space>
      <a-input
        v-model:value="keyWord"
        type="text"
        placeholder="请输入搜索关键字"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button type="primary" @click="search">搜索</a-button>
      <a-button type="primary" @click="add">添加词汇</a-button>
    </a-space>

    <a-table
      :columns="columns"
      bordered
      :data-source="data"
      :scroll="{ y: 'max-content' }"
      style="margin: 15px 0 0"
      :pagination="pagination"
      :rowKey="(data) => data.id"
    >
      <template #tags="{ text: tags }">
        <span>
          <a-tag v-for="tag in tags" :key="tag" color="#108ee9">
            {{ tag }}
          </a-tag>
        </span>
      </template>
      <template #action="{ record }">
        <a-button
          type="primary"
          @click="update(record)"
          style="margin-right: 5px"
          >修改
        </a-button>
        <a-popconfirm
          @confirm="del(record)"
          title="确定删除吗?"
          cancelText="取消"
          okText="确定"
        >
          <a-button type="primary" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      v-model:visible="showAddNodeModal"
      :maskClosable="false"
      :mask="true"
      title="添加词汇"
      @ok="addWord"
      cancelText="取消"
      okText="确定"
      @cancel="showAddNodeModal.value = false"
    >
      <a-form class="formRefUpdate">
        <a-form-item label="词汇名称">
          <a-input
            placeholder="请输入词汇名称"
            v-model:value="currAddNodeModel.participle"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="showEditNodeModal"
      :maskClosable="false"
      :mask="true"
      title="修改词汇"
      @ok="updateWord"
      cancelText="取消"
      okText="确定"
      @cancel="showEditNodeModal.value = false"
    >
      <a-form :model="currEditNodeModel" class="formRefUpdate">
        <a-form-item label="词汇名称">
          <a-input
            placeholder="请输入词汇名称"
            v-model:value="currEditNodeModel.participle"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  onMounted,
  onUnmounted,
  computed,
  reactive,
  ref,
  getCurrentInstance,
  h,
  inject,
} from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import { requestHeader, sign } from "constants";

const route = useRoute();
const vm = getCurrentInstance();

const pagination = ref({
  current: 1,
  total: 0,
  pageSize: 10, //每页中显示10条数据
  showSizeChanger: false,
  pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
  showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
  onChange: (current, size) => {
    loadPage();
  },
});

//搜索 关键字
const keyWord = ref("");

const search = async () => {
  await loadPage();
};

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
  },
  {
    title: "名称",
    key: "participle",
    dataIndex: "participle",
    slots: { customRender: "participle" },
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]);
const data = ref([]);
const showAddNodeModal = ref(false);
const currAddNodeModel = ref({
  participle: "",
  id: "",
});

const add = (rowData) => {
  currAddNodeModel.values = reactive({
    participle: "",
  });
  showAddNodeModal.value = true;
};
const addWord = async () => {
  if (!currAddNodeModel.value.participle) {
    message.error("词汇名称不能为空");
    return;
  }

  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      participle: {
        participle: currAddNodeModel.value.participle,
      },
    },
  };
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/participle/create", formData)
    .catch((error) => {});
  if (res && res.status == "200") {
    message.info("词汇添加成功");
    showAddNodeModal.value = false;
    await loadPage();
  } else {
    message.error("词汇添加失败");
  }
};
const showEditNodeModal = ref(false);
let currEditNodeModel = reactive({
  participle: "",
  id: "",
});
const update = (rowData) => {
  let getModel = JSON.parse(JSON.stringify(rowData));
  currEditNodeModel.value.participle = getModel.participle;
  currEditNodeModel.value.id = getModel.id;
  showEditNodeModal.value = true;
};
const updateWord = async () => {
  if (!currEditNodeModel.value.participle) {
    message.error("词汇名称不能为空");
    return;
  }
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      participle: {
        id: currEditNodeModel.value.id,
        participle: currEditNodeModel.value.participle,
      },
    },
  };
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/participle/edit", formData)
    .catch((error) => {});
  if (res && res.status == "200") {
    message.info("词汇修改成功");
    showEditNodeModal.value = false;
    await loadPage();
  } else {
    message.error("词汇修改失败");
  }
};
const del = async (rowData) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      ids: [rowData.id],
    },
  };
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/participle/clear", formData)
    .catch((error) => {});
  if (res && res.status == "200") {
    message.info("词汇删除成功");
    await loadPage();
  } else {
    message.info("词汇删除失败");
  }
};
/**
 * 加载列表
 */
const loadPage = async () => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      participle: keyWord.value,
      pagination: {
        // 分页信息，不能为空，如若查询所有（不建议），size给最大值
        number: 1, // 从 1 开始
        size: pagination.value.pageSize,
      },
    },
  };

  const res = await vm.proxy.axios.post(
    "/dandelion/api/v1/participle/loadPage",
    formData
  );

  if (res && res.status == "200") {
    console.log(res);
    pagination.value.total = res.data.payload.pagination.total;
    if (pagination.value.total == 0) {
      data.value = [];
    } else {
      let resData = res.data.payload.items;
      let resultData = [];
      if (resData.length > 0) {
        resData.forEach((item, index) => {
          console.log(item);
          resultData.push({
            index: index + 1,
            id: item.id,
            participle: item.participle,
            participlePY: item.participlePY,
          });
        });
      }
      data.value = resultData;
    }
  }
};

onMounted(async () => {
  await loadPage();
});
</script>
<style lang="less" scoped>
#WordMgmt {
  margin: 15px;
}
</style>