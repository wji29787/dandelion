<template>
  <a-layout style="height: 100vh">
    <a-layout-header>
      <a-row>
        <a-col :span="12" justify="space-between">
          <a-space align="baseline">
            <div class="title">危化品应急救援数据分析平台</div>
          </a-space>
        </a-col>
        <a-col :span="12" style="text-align: right">
          <a-dropdown>
            <SettingOutlined :style="{ fontSize: '25px', color: '#fff' }" />
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="showModal">退出</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-sider theme="light" width="200" style="overflow: auto">
        <a-menu
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          @click="titleClick"
        >
        <a-menu-item key="MonitoringChart">
            <template #icon>
                <GlobalOutlined />
            </template>
            <span>危害范围态势展示</span>
          </a-menu-item>
          <a-menu-item key="KnowledgeGraph">
            <template #icon>
            <NodeIndexOutlined />
            </template>
            <span>知识图谱显示</span>
          </a-menu-item>

          <a-sub-menu key="sub2" @titleClick="titleClick">
            <template #icon>
              <PartitionOutlined />
            </template>
            <template #title> 知识图谱管理 </template>
            <a-menu-item key="DataMgmt">节点类型管理</a-menu-item>
            <a-menu-item key="relatshipTypeMgmt">关系类型管理</a-menu-item>
            <a-menu-item key="WordMgmt">词库管理</a-menu-item>
            <!-- <a-menu-item key="Map">地图管理</a-menu-item> -->
          </a-sub-menu>
          <a-menu-item key="DocManage">
            <template #icon>
               <FileTextOutlined />
            </template>
            <span>文档管理</span>
          </a-menu-item>
          <a-menu-item key="ModelManage">
            <template #icon>
               <DatabaseOutlined />
            </template>
            <span>模型管理</span>
          </a-menu-item>
          <a-sub-menu key="SysManage" @titleClick="titleClick">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title> 系统管理 </template>
            <a-menu-item key="UserManage">用户管理</a-menu-item>
            <a-menu-item key="LogManage">日志管理</a-menu-item>
          </a-sub-menu>

          <a-menu-item key="MeteorologicalManage">
            <template #icon>
                <FundOutlined />
            </template>
            <span>气象管理</span>
          </a-menu-item>
          <a-menu-item key="PlanManage">
            <template #icon>
                <AppstoreAddOutlined />
            </template>
            <span>预案管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content style="padding: 10px; overflow: auto">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-modal
    v-model:visible="visible"
    title="提示"
    ok-text="确认"
    cancel-text="取消"
    @ok="okModal"
  >
    <p>你确定要退出吗？</p>
  </a-modal>
</template>
<script setup>
import { onMounted, ref ,} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  SettingOutlined,
  NodeIndexOutlined,
  PartitionOutlined,
  GlobalOutlined ,
  DatabaseOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  FundOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons-vue";
import { currentLinks } from '@/utils/config.js'

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([]);
const visible = ref(false);
const okModal = () => {
  localStorage.clear();
  router.replace('/login');
  visible.value = false;
};

const titleClick = ({ item, key, keyPath }) => {
  if(key){
    if(currentLinks[key]){
       window.open(currentLinks[key])
      return 
    }
    router.push({
      name:key
    })
  }
};

const showModal = () => {
  visible.value = true;
};

 onMounted(()=>{
  //  console.log('router',router)
  //  const rrouer = router.resolve(route.path)
  selectedKeys.value=[route.name]
      // console.log('route',rrouer,route)
 })
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
</style>