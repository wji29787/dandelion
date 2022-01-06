<template>
  <div class="knowledgegraphshow-container">
    <a-row :gutter="16">
      <a-col span="4">
        <a-auto-complete
          v-model:value="keyWordData.keyWord"
          style="width: 100%"
          :options="keyWordData.list"
          placeholder="请输入搜索关键字"
          @search="handleSearch"
          @select="handleSelect"
          option-label-prop="text"
        >
        </a-auto-complete>
      </a-col>
      <a-col span="15">
        <div
          ref="g6Ref"
          class="container"
        ></div>

        <!-- <div class="zoomLevelbox">
          <a-form>
              <a-form-item  :colon="false">
                <template #label>
                  <span>扩展级别</span>
                </template>
                
                <a-slider v-model:value="zoomLevel" :min="0" :max="5"  @change="zoomLevelChange">
                </a-slider >
              </a-form-item>
          </a-form>
        </div> -->
        <div class="bottomDisplayBox">
          <a-space>
            <a-button
              @click="attrDisplayChange"
              shape="circle"
              :title="attrDisplay ? '隐藏属性' : '显示属性'"
            >
              <ShareAltOutlined />
            </a-button>
            <a-button
              shape="circle"
              @click="relationDisplayChange"
              :title="relationDisplay ? '隐藏关系名称' : '显示关系名称'"
            >
              <PullRequestOutlined />
            </a-button>
            <a-button shape="circle" title="清空图谱" @click="clearMap">
              <ClearOutlined />
            </a-button>
          </a-space>
        </div>
      </a-col>
      <a-col span="5">
        <div class="fileParseBox">
          <div class="fileParse">
            <a-upload
              name="file"
              action="/dandelion/api/v1/hazard-item/file/parse"
              @change="fileParse.handleFileParseChange"
              :showUploadList="false"
              :data="fileParse.data"
            >
              <a-button type="primary">打开文档</a-button>
            </a-upload>
          </div>
          <div class="fileParseList">
            <a-dropdown
              :trigger="['contextmenu']"
              v-for="(item, index) in fileParse.list"
              :key="index"
            >
              <a-tag
                style="margin: 0 10px 10px"
                @click="fileParse.fileParseClick(index)"
                :color="getFileParseBg(item)"
                >{{ item.word }}</a-tag
              >
              <template #overlay>
                <a-menu @click="fileParse.fileParseMenuClick">
                  <a-menu-item :key="'addnode-' + index"
                    >添加到节点</a-menu-item
                  >
                  <a-menu-item :key="'addlibrary-' + index"
                    >添加到词库</a-menu-item
                  >
                  <!-- <a-menu-item :key="'addmap-'+index">添加到图谱</a-menu-item> -->
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </a-col>
    </a-row>
    <!-- 节点添加弹出框 -->
   

    <!-- 属性编辑弹出框 -->
    <a-modal
      v-model:visible="showUpdateNodeModal"
      :maskClosable="false"
      :footer="null"
      title="修改"
    >
      <a-form
        :model="currCreateAttrsModel"
        ref="UpdateNodeFormRef"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="formRefUpdate"
      >
       <a-row justify="space-between" :gutter="8" align="middle">
         <a-col :span="18">
            <a-form-item label="节点名称">
              <a-input
                placeholder="请输入节点名称"
                v-model:value="currCreateAttrsModel.itemName"
              />
          </a-form-item>
         </a-col>
         <a-col :span="6">
            <a-form-item label="">
                <el-color-picker
                v-model="currCreateAttrsModel.nodeColor"
              ></el-color-picker>
          </a-form-item>
         </a-col>

       </a-row>
        <template
          v-for="(item, index) in currCreateAttrsModel.itemAttrs"
          :key="item.id"
        >
          <a-form-item
            :label="''"
            v-if="item.mediaType == '1'"
            :name="['itemAttrs', index, 'attrName']"
            :rules="{
              required: true,
              message: '属性名称和属性值必填',
              trigger: 'change',
            }"
          >
            <a-row :gutter="10">
              <a-col :span="6">
                <a-input
                  placeholder="属性名"
                  v-model:value="item.attrName"
                  style="text-align: right"
                />
              </a-col>
              <a-col :span="12">
                <a-input placeholder="属性值" v-model:value="item.attrValue" />
              </a-col>
              <a-col :span="6">
                <MinusCircleOutlined
                  style="
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    position: relative;
                    top: 4px;
                  "
                  @click="removeOneAttr(index)"
                />
                <PlusCircleOutlined
                  style="
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    position: relative;
                    margin-left: 6px;
                    top: 4px;
                  "
                  @click="addOneAttr(index)"
                />
              </a-col>
            </a-row>
          </a-form-item>
        </template>

        <a-form-item
          :label="''"
          style="display: flex; justify-content: center"
          v-if="isHaveitemAttrs == -1"
        >
          <a-button type="primary" style="margin: 0 auto" @click="addAttr">
            <PlusOutlined />
            添加属性
          </a-button>
        </a-form-item>

        <a-form-item label="照片">
          <a-upload
            :before-upload="nodeUpdateBeforeUpload"
            list-type="picture-card"
            v-model:file-list="currCreateAttrsModel.fileList"
            id="nodeUpdateUpload"
            style="width: 300px"
            @change="nodeUpdateUploadChange"
            @preview="handlePreview"
          >
            <p v-if="currCreateAttrsModel.fileList.length <= 3">点击上传</p>
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
                @click="hideUpdateModal"
                >取消</a-button
              >
            </a-col>
            <a-col :span="4">
              <a-button
                type="primary"
                round
                style="width: 100px"
                @click="sureUpdateModal"
                >确定</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 添加关系弹出框 -->
    <a-modal
      v-model:visible="showCreateRelationModal"
      :maskClosable="false"
      :footer="null"
      title="添加/修改关系"
    >
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="formRefUpdate"
      >
        
        <a-form-item label="关系名称">
          <a-select
            ref="select"
            v-model:value="modelCategoryType.select"
            style="width: 100%"
            @change="categoryTypeChange"
          >
            <a-select-opt-group
              v-for="(item, idx) in categoryList2"
              :key="idx"
              :label="item.title"
            >
              <a-select-option
                v-for="(ite, cidx) in item.items"
                :key="cidx"
                :value="ite.id"
                >{{ ite.category }}</a-select-option
              >
            </a-select-opt-group>
          </a-select>
        </a-form-item>
         <template
          v-for="(item, index) in modelCategoryType.list"
          :key="item.id"
        >
          <a-form-item
            :label="''"
            :name="['itemAttrs', index, 'attrName']"
            :rules="{
              required: true,
              message: '属性名称和属性值必填',
              trigger: 'change',
            }"
          >
            <a-row :gutter="10">
              <a-col :span="6">
                <a-input
                  placeholder="属性名"
                  v-model:value="item.attrName"
                  style="text-align: right"
                />
              </a-col>
              <a-col :span="12">
                <a-input placeholder="属性值" v-model:value="item.attrValue" />
              </a-col>
              <a-col :span="6">
                <MinusCircleOutlined
                  style="
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    position: relative;
                    top: 4px;
                  "
                  @click="removeNodeOneAttr(index)"
                />
                <PlusCircleOutlined
                  style="
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                    position: relative;
                    margin-left: 6px;
                    top: 4px;
                  "
                  @click="addNodeOneAttr(index)"
                />
              </a-col>
            </a-row>
          </a-form-item>
        </template>
         <a-form-item
          :label="''"
          style="display: flex; justify-content: center"
          v-if="modelCategoryType.list.length == 0"
        >
          <a-button type="primary" style="margin: 0 auto" @click="addCategoryAttr">
            <PlusOutlined />
            添加属性
          </a-button>
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
                @click="hideCreateRelationModal"
                >取消</a-button
              >
            </a-col>
            <a-col :span="4">
              <a-button
                type="primary"
                round
                style="width: 100px"
                @click="sureCreateRelationModal"
                >确定</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 修改属性弹出框 -->
    <a-modal
      v-model:visible="showUpdateAttrsModal"
      :maskClosable="false"
      :footer="null"
      title="修改属性"
    >
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="formRefUpdate"
      >
        <a-form-item label="属性名称">
          <a-input
            placeholder="请输入属性名称"
            v-model:value="updateAttrsName"
          />
        </a-form-item>

        <a-form-item label="属性值">
          <a-input
            placeholder="请输入属性值"
            v-model:value="updateAttrsValue"
          />
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
                @click="hideUpdateAttrsModal"
                >取消</a-button
              >
            </a-col>
            <a-col :span="4">
              <a-button
                type="primary"
                round
                style="width: 100px"
                @click="sureUpdateAttrsModal"
                >确定</a-button
              >
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 图片预览 -->
    <a-modal
      title="图片预览"
      :visible="previewVisible"
      :footer="null"
      @cancel="handlePreviewCancel"
    >
      <img
        alt="example"
        style="max-width: 100%; display: block; margin: 0 auto"
        :src="previewImage"
      />
    </a-modal>
    <!-- 添加节点 -->
    <ModelAddGategory v-model="modelData1.visible.value" :data="currAddNodeModel" @onOk="sureAddModal" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  getCurrentInstance,
  nextTick,
  computed,
  toRaw
} from "vue";
import G6 from "@antv/g6/dist/g6.min";
// import G6 from "G6";

import { Modal, message } from "ant-design-vue";
import {
  SearchOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  ClearOutlined,
  ShareAltOutlined,
  PullRequestOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { ADD_STACK_ITEM, DEL_STACK_ITEM } from "mutationTypes";

import { requestHeader, sign } from "constants";
import { getCurrentRations ,defaultattrsItem,createNodes,createEdges,getBase64} from "./util";
import getLegend from './createGrade/plugins/legend'
import getContextMenu from './createGrade/plugins/getContextMenu'
import { defaultOpts } from './createGrade'
import ModelAddGategory from './components/ModelAddGategory.vue'
import { useModeldata }  from '@/hooks'

const store = useStore();
const vm = getCurrentInstance();
const { axios } = vm.proxy
const g6Ref = ref();
let graph = null;
const clearMap = () => {
  graph.clear();
};
const nodesandedges = {
  nodes: [],
  edges: [],
};
//搜索 关键字
const keyWordData = reactive({
  keyWord:'',
  list: [],
});

const handleSearch = async (e) => {
 
   if (!e) {
    keyWordData.list = [];
    return
   }
  await reqData([e], "search");
 
};
const handleSelect = (value, option) => {
  if(keyWordData.keyWord){
   graphRefresh(keyWordData.keyWord)
  }
};
//缩放级别
const zoomLevel = ref(3);
const zoomLevelMin = ref(0);
const zoomLevelMax = ref(0);
//属性是否显示
const attrDisplay = ref(true);
//关系名称是否显示
const relationDisplay = ref(true);
//-----------------打开文档----------------------
const getFileParseBg = (item) => {
  let color = "#ccc";
  if (item.inGraph) {
    color = "#2db7f5";
  }
  if (item.inParticiple) {
    color = "#87d068";
  }
  return color;
};
const fileParse = reactive({
  list: [],
  data: {
    startPage: "1",
    endPage: "1",
  },
  handleFileParseChange: (e) => {
    store.commit(`commons/${ADD_STACK_ITEM}`, {});
    if (e.file.status === "done") {
      store.commit(`commons/${DEL_STACK_ITEM}`, {});
      if (
        e.file.response.payload.words &&
        e.file.response.payload.words.length
      ) {
        fileParse.list = e.file.response.payload.words;
      }
    } else if (e.file.status === "error") {
      store.commit(`commons/${DEL_STACK_ITEM}`, {});
      message.error(`上传失败`);
    }
  },
  fileParseClick: (e) => {
    
    if (!modelData1.visible.value) {
      return;
    }
    currAddNodeModel.itemName =
      currAddNodeModel.itemName + fileParse.list[index].word;
  },
  fileParseMenuClick: (e) => {
    console.log(e.key);
    let keyArr = e.key.split("-");
    let index = keyArr[1];
    if (keyArr[0] == "addnode") {
      modelData1.visible.value = true;
      currAddNodeModel.itemName = fileParse.list[index].word;
    } else if (keyArr[0] == "addlibrary") {
      message.warning("敬请期待");
    } else if (keyArr[0] == "addmap") {
    }
  },
});

// ------------添加节点数据相关开始-----------

let currAddNodeModel = reactive({
  itemName: "",
  id: "",
  itemAttrs: [],
  fileList: [],
  isSaveLibrary: true,
  categoryId: "", // 模版id
});
const modelData1 = useModeldata()




const sureAddModal = async (d) => {
  console.log(d);
    store.commit(`commons/${ADD_STACK_ITEM}`, d);
    const res = await store.dispatch('KnowledgeGraph/merge',d).catch((error) => {
          store.commit(`commons/${DEL_STACK_ITEM}`, d);
        });
    store.commit(`commons/${DEL_STACK_ITEM}`, d);
    if (res && res.status == "200") {
        graphRefresh(d.itemName)
        modelData1.visible.value = false
    }
 
};
const graphRefresh = (itemName) => {
   let keyWords = [itemName];
   let getNodes = graph.getNodes();
 
  if (getNodes.length) {
    for (let index = 0; index < getNodes.length; index++) {
      const element = getNodes[index];
      const label = element.getModel().label
      if(label){
         keyWords.push(label);
      }
      
    }
  }
  console.log(keyWords)
  reqData([...new Set(keyWords)]);
};


// 新增关系属性
const addCategoryAttr=()=>{
    modelCategoryType.list.push(defaultattrsItem())
}
// ------------修改节点属性数据相关开始-----------
//修改弹出框是否显示
const showUpdateNodeModal = ref(false);
const previewVisible = ref(false);
const previewImage = ref("");
const handlePreview = async (file) => {
  if (!file.url) {
    file.url = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url;
  previewVisible.value = true;
};
const handlePreviewCancel = () => {
  previewVisible.value = false;
};
let currCreateAttrsModel = reactive({
  itemName: "",
  id: "",
  categoryId: "",
  itemAttrs: [],
  fileList: [],
  nodeColor:"#00ff55"  // 颜色
});
const nodeTypeOptions = reactive({
  list: [],
});
const nodeUpdateBeforeUpload = () => {
  return false;
};



const labelCol = ref({ style: { width: "80px" } });
const wrapperCol = ref({ span: 20 });
//关闭弹出框
const hideUpdateModal = () => {
  showUpdateNodeModal.value = false;
};
const nodeUpdateUploadChange = (e) => {
  console.log(e);
};
const UpdateNodeFormRef = ref();
const sureUpdateModal = () => {
  console.log(currCreateAttrsModel);
  if (!currCreateAttrsModel.itemName) {
    message.error("节点名称不能为空");
    return;
  }
  UpdateNodeFormRef.value
    .validate()
    .then(async () => {
      let itemAttrs = [];
      let itemImg = null;
      for (
        let index = 0;
        index < currCreateAttrsModel.itemAttrs.length;
        index++
      ) {
        const element = currCreateAttrsModel.itemAttrs[index];
        if (element.mediaType == 1) {
          if (element.id) {
            itemAttrs.push({
              mediaType: 1,
              attrName: element.attrName,
              attrValue: element.attrValue,
              id: element.id,
            });
          } else {
            itemAttrs.push({
              mediaType: 1,
              attrName: element.attrName,
              attrValue: element.attrValue,
            });
          }
        } else {
          itemImg = element;
        }
      }
      let fileList = currCreateAttrsModel.fileList;
      if (fileList.length) {
        let attrValue = [];
        for (let index = 0; index < fileList.length; index++) {
          const element = fileList[index];
          if (element.url) {
            attrValue.push(element.url);
          } else {
            attrValue.push(await getBase64(element.originFileObj));
          }
        }
        if (itemImg) {
          itemAttrs.push({
            id: itemImg.id,
            mediaType: 2,
            attrName: "图片",
            attrValue: attrValue.join("@"),
          });
        } else {
          itemAttrs.push({
            mediaType: 2,
            attrName: "图片",
            attrValue: attrValue.join("@"),
          });
        }
      }

      let formData = {
        requestHeader: requestHeader,
        sign: sign,
        payload: {
          item: {
            id: currCreateAttrsModel.id,
            itemName: currCreateAttrsModel.itemName,
            categoryId: currCreateAttrsModel.categoryId,
            nodeColor: currCreateAttrsModel.nodeColor,
            itemAttrs: itemAttrs,
          },
        },
      };
      console.log(formData, fileList);
      store.commit(`commons/${ADD_STACK_ITEM}`, formData);
      let res = await vm.proxy.axios
        .post("/dandelion/api/v1/hazard-item/merge", formData)
        .catch((error) => {
          store.commit(`commons/${DEL_STACK_ITEM}`, formData);
        });
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
      if (res && res.status == "200") {
        showUpdateNodeModal.value = false;
        message.info("节点修改成功");
        graphRefresh(currCreateAttrsModel.itemName);
        
        
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const removeOneAttr = (index) => {
  currCreateAttrsModel.itemAttrs.splice(index, 1);
  console.log(currCreateAttrsModel.itemAttrs);
};
const isHaveitemAttrs = computed(() => {
  return currCreateAttrsModel.itemAttrs.findIndex((item) => {
    return item.mediaType == "1";
  });
});
const addOneAttr = (index) => {
  currCreateAttrsModel.itemAttrs.splice(index + 1, 0, {
    itemName: "",
    attrValue: "",
    mediaType: 1,
  });
};
const addAttr = () => {
  currCreateAttrsModel.itemAttrs.push({
    itemName: "",
    attrValue: "",
    mediaType: 1,
  });
};
// ------------修改节点属性数据相关结束-----------

//-------------关系数据相关开始---------------
//添加关系名称和值
const showCreateRelationModal = ref(false);
const createRelationName = ref("");
// 模版类型关系model
const modelCategoryType =reactive({
  select:'',
  list:[]
})
//添加关系弹出框关闭
const hideCreateRelationModal = () => {
  showCreateRelationModal.value = false;
  if (isAddRelation == 1) {
    // console.log(currCreateRelationModel)
    graph.removeItem(currCreateRelationModel);
  }
};
//是否是添加关系 1添加  2修改
let isAddRelation = 1;
let currCreateRelationModel = null;
//添加关系弹出框确认
const sureCreateRelationModal = () => {
  if (isAddRelation == 1) {
    createEdgeByNode(currCreateRelationModel);
  } else {
    updateRelation(currCreateRelationModel);
  }
};
//-------------关系数据相关结束---------------

//-------------属性修改数据相关开始---------------
//属性修改名称和值
const showUpdateAttrsModal = ref(false);
const updateAttrsName = ref("");
const updateAttrsValue = ref("");
//属性修改弹出框关闭
const hideUpdateAttrsModal = () => {
  showUpdateAttrsModal.value = false;
};
let currUpdateAttrsModel = null;
//属性修改弹出框确认
const sureUpdateAttrsModal = () => {
  if (!updateAttrsName.value) {
    message.error("属性名称不能为空");
    return;
  }
  if (!updateAttrsValue.value) {
    message.error("属性值不能为空");
    return;
  }
  updateAttrs(currUpdateAttrsModel);
};
//-------------属性修改相关结束---------------

//初始化图谱
const initG6 = () => {
  const container = g6Ref.value;
  const width = container.clientWidth;
  const height = container.clientHeight;
  // const legend = getLegend();
  const contextMenu = getContextMenu({
    on: registerMenuEvents()
  });

  // Register a custom behavior: add a node when user click the blank part of canvas
  let addedCount = nodesandedges.nodes.length;
  G6.registerBehavior("click-add-node", {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
      // The event is canvas:click, the responsing function is onClick
      return {
        "canvas:click": "onClick",
      };
    },
    // Click event
    onClick(ev) {
      const self = this;
      const graph = self.graph;
      // Add a new node
      graph.addItem("node", {
        x: ev.x,
        y: ev.y,
        id: "0x" + addedCount, // Generate the unique id
        label: "",
      });
      graph.setMode("default");
      addedCount++;
    },
  });

  graph = new G6.Graph({
    ...defaultOpts,
    container: container,
    width,
    height,
    modes: {
      default: [
        "click-select",
        "drag-canvas",
        "drag-node",
        "zoom-canvas",
        {
          type: "tooltip",
          shouldBegin(evt) {
            return (
              evt.item.getModel().itemAttrs &&
              evt.item.getModel().itemAttrs.length > 0
            );
          },
          offset: 10,
          formatText(model) {
            if (model.itemAttrs && model.itemAttrs.length) {
              var html = "";
              for (let index = 0; index < model.itemAttrs.length; index++) {
                const element = model.itemAttrs[index];
                html += `<div class="n-divider n-divider--title-position-left">
                          <div class="n-divider__line n-divider__line--left"></div>
                          <div class="n-divider__title">${element.attrName}</div>
                          <div class="n-divider__line n-divider__line--right"></div>
                        </div>`;
                if (element.mediaType == "2") {
                  let attrValueArr = element.attrValue.split("@");
                  for (let index = 0; index < attrValueArr.length; index++) {
                    const element = attrValueArr[index];
                    html += `<img src="${element}" />`;
                  }
                } else {
                  html += `<div class="attrValue">${element.attrValue}</div>`;
                }
              }
              return `<div id='tooltipbox'>
                        <div class="name">${model.label}</div>
                        ${html}
                      </div>`;
            } else {
              return "";
            }
          },
        },
      ],
      edit: [
        {
          type: "create-edge",
          edgeConfig: {
            color: "#000",
            style: {
              endArrow: {
                path: G6.Arrow.triangle(),
                fill: "#000",
              },
            },
          },
        },
        "click-select",
        "drag-canvas",
        "drag-node",
        "zoom-canvas",
      ],
      add: [
        "click-add-node",
        "drag-canvas",
        "drag-node",
        "click-select",
        "zoom-canvas",
      ],
    },
  
    // plugins: [legend, contextMenu],
    plugins: [ contextMenu],
  });
  graph.data(nodesandedges);
  graph.render();
  //当边创建完成时将会触发该时机事件
  graph.on("aftercreateedge", (e) => {
    console.log(e.edge);
    graph.setMode("default");
    currCreateRelationModel = e.edge;
    showCreateRelationModal.value = true;
  });
  graph.on("node:dragstart", function (e) {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on("node:drag", function (e) {
    const forceLayout = graph.get("layoutController").layoutMethods[0];
    forceLayout.execute();
    refreshDragedNodePosition(e);
  });
  graph.on("node:dragend", function (e) {
    e.item.get("model").fx = null;
    e.item.get("model").fy = null;
  });

  // 当 click-select 选中的元素集合发生变化时将会触发下面时机事件，e 中包含相关信息
  graph.on("nodeselectchange", (e) => {
    if (!e.target) {
      return false;
    }
    // 当前操作的 item
    // console.log(e.target);
    // 当前操作后，所有被选中的 items 集合
    // console.log(e.selectedItems);
    // 当前操作时选中(true)还是取消选中(false)
    // console.log(e.select);
  });
  graph.on("node:mouseenter", (evt) => {
    const { item } = evt;
    graph.setItemState(item, "hover", true);
  });

  graph.on("node:mouseleave", (evt) => {
    const { item } = evt;
    graph.setItemState(item, "hover", false);
  });
  zoomLevelMin.value = graph.getMinZoom();
  zoomLevelMax.value = graph.getMaxZoom();
  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (!graph || graph.get("destroyed")) return;
      if (!container || !container.clientWidth || !container.clientHeight) {
        return;
      }
      graph.changeSize(container.clientWidth, container.clientHeight);
    };
  }
    function refreshDragedNodePosition(e) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }
};

//缩放级别改变监听
const zoomLevelChange = (e) => {
  // graph.zoom(e, { x: 0, y: 0 });
};

//属性改变监听
const attrDisplayChange = (e) => {
  // console.log(e);
  var getNodes = graph.getNodes();
  // console.log(getNodes);
  for (let index = 0; index < getNodes.length; index++) {
    const element = getNodes[index];
    var model = element.getModel();
    if (model.nodeCategory == "node-attr") {
      if (attrDisplay.value) {
        graph.hideItem(element);
      } else {
        graph.showItem(element);
      }
    }
  }
  graph.paint();
  attrDisplay.value = !attrDisplay.value;
};

//显示关系改变监听
const relationDisplayChange = (e) => {
  // console.log(e);
  var getEdges = graph.getEdges();
  for (let index = 0; index < getEdges.length; index++) {
    const element = getEdges[index];
    if (element.getModel().nodeCategory == "edge-relation") {
      element.update({
        labelCfg: {
          style: {
            opacity: relationDisplay.value ? 0 : 1,
          },
        },
      });
    }
  }
  graph.paint();
  relationDisplay.value = !relationDisplay.value;
};

//设置右键菜单
const registerMenuEvents = ()=>{
    return {
      updateNode:(target,item)=>{
        let getModel = JSON.parse(JSON.stringify(item.getModel()));
        console.log(getModel)
          currCreateAttrsModel.itemName = getModel.label;
          currCreateAttrsModel.id = getModel.id;
          currCreateAttrsModel.categoryId = getModel.categoryId;
          currCreateAttrsModel.categoryId = getModel.categoryId;
          currCreateAttrsModel.nodeColor = getModel.nodeColor;
          let isUpload = currCreateAttrsModel.itemAttrs.find((itemAttr) => {
            return itemAttr.mediaType == "2";
          });
          currCreateAttrsModel.fileList = [];
          if (isUpload) {
            let attrValue = isUpload.attrValue;
            let attrValueArr = attrValue.split("@");
            for (let index = 0; index < attrValueArr.length; index++) {
              const element = attrValueArr[index];
              currCreateAttrsModel.fileList.push({
                url: element,
                status: "done",
                uid: isUpload.id + "-" + index,
              });
            }
          }
          showUpdateNodeModal.value = true;

      },
      delNode:(target,item)=>{
           Modal.confirm({
            title: () => "提示",
            content: () => "你确定要删除节点吗？",
            okText: "确定",
            onOk() {
              delNode(item);
            },
            cancelText: "取消",
            onCancel() {},
          });

      },
      delAttr:(target,item)=>{
           Modal.confirm({
            title: () => "提示",
            content: () => "你确定要删除属性吗？",
            okText: "确定",
            onOk() {
              delAttr(item);
            },
            cancelText: "取消",
            onCancel() {},
          });

      },
      delEdgeByRelation:(target,item)=>{
           Modal.confirm({
            title: () => "提示",
            content: () => "你确定要删除关系吗？",
            okText: "确定",
            onOk() {
              delEdgeByRelation(item);
            },
            cancelText: "取消",
            onCancel() {},
          });

      },
      createRelation:(target,item)=>{
          Modal.confirm({
            title: () => "提示",
            content: () => "单击该节点后，拖动鼠标到另一个节点即可建立关系",
            okText: "确定",
            onOk() {
              isAddRelation = 1;
              graph.setMode("edit");
            },
            cancelText: "取消",
            onCancel() {
              graph.setMode("default");
            },
          });

      },
      updateRelation:(target,item)=>{
           Modal.confirm({
            title: () => "提示",
            content: () => "你确定要修改关系吗？",
            okText: "确定",
            onOk() {
              isAddRelation = 2;
              modelCategoryType.select = item.getModel().relationid;
              currCreateRelationModel = item;
              showCreateRelationModal.value = true;
            },
            cancelText: "取消",
            onCancel() {
              graph.setMode("default");
            },
          });

      },
      updateAttr:(target,item)=>{
          Modal.confirm({
            title: () => "提示",
            content: () => "你确定要修改属性吗？",
            okText: "确定",
            onOk() {
              updateAttrsValue.value = item.getModel().label;
              let edge = item.getEdges().find((edge) => {
                return (
                  edge.getModel().source ==
                  JSON.parse(item.getModel().parent).id
                );
              });
              updateAttrsName.value = edge.getModel().label;
              currUpdateAttrsModel = item;
              showUpdateAttrsModal.value = true;
            },
            cancelText: "取消",
            onCancel() {
              graph.setMode("default");
            },
          });

      },
    }
}

//通过修改模式去添加一个节点
const addNode = () => {
  Modal.confirm({
    title: () => "提示",
    content: () => "点击图谱即可创建节点",
    okText: "确定",
    onOk() {
      graph.setMode("add");
    },
    cancelText: "取消",
    onCancel() {
      graph.setMode("default");
    },
  });
};

// 删除某个节点-1
const delNode = async (item) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      itemId: item.getModel().id,
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/clear", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  if (res && res.status == "200") {
    message.info("节点删除成功");
    console.log(nodesandedges);
    let itemAttrs = item.getModel().itemAttrs || [];
    for (let index = 0; index < itemAttrs.length; index++) {
      const element = itemAttrs[index];
      if (element.mediaType == 1) {
        graph.removeItem(element.id);
      }
    }
    graph.removeItem(item);
  }
};

//节点关系删除-1
const delEdgeByRelation = async (item) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      itemId: item.getModel().source,
      relationIds: [item.getModel().relationid],
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/relation/clear", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  if (res && res.status == "200") {
    message.info("节点关系删除成功");
    graph.removeItem(item.getTarget());
  }
};

//节点属性删除-1
const delAttr = async (item) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      itemId: JSON.parse(item.getModel().parent).id,
      attrIds: [item.getModel().id],
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/attribute/clear", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  if (res && res.status == "200") {
    message.info("节点属性删除成功");
    graph.removeItem(item);
  }
};

//节点关系添加-1
const createEdgeByNode = async (item) => {
  // console.log(item.getModel());
  if (!modelCategoryType.select) {
    message.info("关系不能为空");
  }
  const current = getCurrentRations(categoryList2, modelCategoryType.select);

  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      item: {
        id: item.getModel().source,
        itemName: item.getSource().getModel().label,
        categoryId: item.getSource().getModel().categoryId,
        relations: [
          {
            relationName: current.category,
            categoryId: current.id,
            items: [
              {
                id: item.getModel().target,
                categoryId: item.getTarget().getModel().categoryId,
                itemName: item.getTarget().getModel().label,
              },
            ],
          },
        ],
      },
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/merge", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  if (res && res.status == "200") {
    message.info("节点关系添加成功");
    showCreateRelationModal.value = false;
    currCreateRelationModel = null;
    graph.updateItem(item, {
      //更新新添加边的名称
      label: createRelationName.value,
    });
  }
};

//节点关系修改-1
const updateRelation = async (item) => {
  if (!modelCategoryType.select) {
    message.info("关系不能为空");
  }
  const current = getCurrentRations(categoryList2, modelCategoryType.select);
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      item: {
        id: item.getModel().source,
        itemName: item.getSource().getModel().label,
        categoryId: item.getSource().getModel().categoryId,
        relations: [
          {
            id: item.getModel().relationid,
            // relationName: createRelationName.value,
            // categoryId: item.getModel().categoryId,
            relationName: current.category,
            categoryId: current.id,
            items: [
              // {
              //   id: item.getModel().target,
              //   categoryId: item.getTarget().getModel().categoryId,
              //   itemName: item.getTarget().getModel().label,
              // },
            ],
          },
        ],
      },
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/merge", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  if (res && res.status == "200") {
    message.info("节点关系修改成功");
    showCreateRelationModal.value = false;
    currCreateRelationModel = null;
    graph.updateItem(item, {
      //更新新添加边的名称
      label: createRelationName.value,
    });
  }
};

//节点属性修改-1
const updateAttrs = async (item) => {
  // console.log(item.getModel());
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      item: {
        id: JSON.parse(item.getModel().parent).id,
        itemName: JSON.parse(item.getModel().parent).itemName,
        categoryId: JSON.parse(item.getModel().parent).categoryId,
        itemAttrs: [
          {
            id: item.getModel().id,
            attrName: updateAttrsName.value,
            attrValue: updateAttrsValue.value,
            mediaType: 1,
          },
        ],
      },
    },
  };
  store.commit(`commons/${ADD_STACK_ITEM}`, formData);
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/merge", formData)
    .catch((error) => {
      store.commit(`commons/${DEL_STACK_ITEM}`, formData);
    });
  store.commit(`commons/${DEL_STACK_ITEM}`, formData);
  hideUpdateAttrsModal();
  if (res && res.status == "200") {
    message.info("节点属性修改成功");
    let edge = item.getEdges().find((edge) => {
      return edge.getModel().source == JSON.parse(item.getModel().parent).id;
    });
    graph.updateItem(edge.getModel().id, {
      //更新边的名称
      label: updateAttrsName.value,
    });
    graph.updateItem(item.getModel().id, {
      //更新节点的名称
      label: updateAttrsValue.value,
    });
  }
};

// 请求节点接口-1
const reqData = async (keyWords, type) => {

  // return;
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      keyWords: keyWords,
      extendLevel: zoomLevel.value,
    },
  };

  let res = await axios.post("/dandelion/api/v1/hazard-item/load", formData);
  if (res && res.status == "200") {
    if (res.data.payload.items) {
      const {items} = res.data.payload
      if (type == "search") {
    
        if(items.length>0){
          keyWordData.list = items.map(t=>{
            return {
              value:t.itemName,
              text:t.id
            }
          })
          console.log('list',toRaw(keyWordData.list))
        }else{
           keyWordData.list=[]
        }
     
      } else {

        createNodes(nodesandedges,items);
        createEdges(nodesandedges,items);
        graph.changeData(nodesandedges);
      }
    }
  }
};

//请求节点类型
const reqNodeTypeList = async () => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      categoryType: 1, // 类型的类型，节点（1）或者关系（2）
      pagination: {
        // 分页信息，不能为空，如若查询所有（不建议），size给最大值
        number: 1, // 从 1 开始
        size: 1000,
      },
    },
  };
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/hazard-item/load", formData)
    .catch((error) => {});
  if (res && res.status == "200") {
    let items = res.data.payload.items || [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      element.value = element.id;
      element.label = element.category;
    }
    nodeTypeOptions.list = items;
  }
};





const categoryTypeChange = (val) => {
  if (val) {
    getAttrList(val,2);
  } else {
    modelCategoryType.list = []
    
  }
};
//关系类型列表数据
const categoryList2 = ref([]);


// 获取节点类型

// //加载关系类型列表
const loadCategoryList = async (categoryType) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      category: "",
      categoryType,
      pagination: {
        // 分页信息，不能为空，如若查询所有（不建议），size给最大值
        number: 1, // 从 1 开始
        size: 10000,
      },
    },
  };
  let result = await vm.proxy.axios.post(
    "/dandelion/api/v1/item_category/page",
    formData
  );

  if (result && result.status == "200") {
    let tempCategoryList = result.data.payload.items;
    let shortcut = [];
    // 格式化数据
    var map = {};
    let res = tempCategoryList;
    res.forEach((item, index) => {
      // 中文按照拼音首字母进行筛选分组，英文根据单词首字母分组
      var key = item["categoryPy"].slice(0, 1);
      if (!map[key]) {
        shortcut.push(key);
        map[key] = {
          title: key,
          items: [],
        };
      }
      map[key].items.push(item);
    });
    // 转为数组
    var ret = [];
    for (var k in map) {
      var val = map[k];
      ret.push(val);
    }
    // 对首字母排序
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0);
    });

    shortcut.sort((a, b) => {
      return a.charCodeAt(0) - b.charCodeAt(0);
    });

    // 对每个国家进行排序
    ret.map((v) => {
      v.items.sort((a, b) => {
        return a["categoryPy"].localeCompare(b["categoryPy"]);
      });
    });
    return ret;
  }
};
//节点类型属性列表
// 属性列表
//根据类型id加载属性列表 type 1 节点 2 关系
const getAttrList = async (id,type) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      categoryId: id,
    },
  };
  let result = await vm.proxy.axios
    .post("/dandelion/api/v1/item_category/attribute/list", formData)
    .catch((error) => {});
  if (result && result.status == "200") {
     const { payload } = result.data
    if(type ===1){
        // const { payload } = result.data
            const itemAttrs = payload.attrs.map((t) => {
              return {
                attrName: t.attrName,
                attrValue: "",
                mediaType: 1,
              };
            });
            currAddNodeModel.itemAttrs = itemAttrs;
          
    }else {
       console.log('dddddd',result.data)
        const itemAttrs = payload.attrs.map((t) => {
              return {
                attrName: t.attrName,
                attrValue: "",
                mediaType: 1,
              };
            });
            currAddNodeModel.itemAttrs = itemAttrs;
    }
  }
  
};

//根据类型id加载关系属性列表
// const categoryTypeAttrList = ref([]);
// const getcategoryTypeAttrList = async (id) => {
//    let formData = {
//     requestHeader: requestHeader,
//     sign: sign,
//     payload: {
//       categoryId: id,
//     },
//   };
//   let result = await vm.proxy.axios
//     .post("/dandelion/api/v1/item_category/attribute/list", formData)
//     .catch((error) => {});
//   if (result && result.status == "200") {
//    categoryTypeAttrList.value = result.data.payload.attrs;
//   }
// };
onMounted(async () => {
  
  nextTick(() => {
    initG6();
  });
  
  loadCategoryList(2).then((res) => {
    if (res) {
      categoryList2.value = res;
      if (res.length > 0) {
        // modelCategoryType.select = res[0].items[0].id;
      }
    }
  });
  store.dispatch('KnowledgeGraph/getCategoryList1')
});

onUnmounted(() => {
  graph.destroy();
  graph = null;
});
</script>

<style lang="less" scoped>
.knowledgegraphshow-container {
  .container {
    height: calc(100vh - 100px); 
    width: 100%; 
    background: #fff;
  }
  .zoomLevelbox {
    position: absolute;
    width: 250px;
    top: 25px;
    left: 30px;
  }
  .bottomDisplayBox {
    position: absolute;
    bottom: 25px;
    left: 30px;
  }

  :deep(#contextMenu) {
    .n-dropdown-option-body {
      line-height: 22px;
      padding: 5px;
    }
    .n-dropdown-option-body:hover {
      background-color: rgb(243, 243, 245);
    }
  }
  :deep(.g6-node-tooltip) {
    z-index: 9999;
  }
  :deep(#tooltipbox) {
    padding-bottom: 20px;
    background-color: #fff;
    padding: 8px 10px 15px;
    min-width: 150px;
    box-shadow: rgb(174 174 174) 0px 0px 10px;
    .name {
      font-size: 20px;
      font-weight: bold;
      padding: 5px 0px 0 20px;
    }
    .attrValue {
      font-size: 12px;
      padding-left: 20px;
    }
    img {
      max-width: 250px;
      display: block;
      margin-bottom: 10px;
    }
    .n-divider {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .n-divider__line {
      background-color: rgb(243, 243, 245);
      height: 1px;
      width: 100%;
      margin: 0;
    }
    .n-divider__line--left {
      width: 10px;
    }
    .n-divider__line--right {
      flex: 1;
    }
    .n-divider__title {
      display: flex;
      align-items: center;
      margin-left: 12px;
      margin-right: 12px;
      white-space: nowrap;
      font-weight: 600;
    }
  }
  .fileParseBox {
    display: flex;
    flex-direction: column;
    .fileParse {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 15px;
    }
    .fileParseList {
      height: calc(100vh - 150px);
      overflow: auto;
      overflow-x: hidden;
    }
  }

  :deep(.ant-tag) {
    cursor: pointer;
    padding: 3px 10px;
  }
}
.formRefUpdate {
  max-height: 400px;
  overflow: auto;
}
</style>
