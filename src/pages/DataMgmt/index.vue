<template>
  <div id="DataMgmt">
    <a-row :gutter="15">
      <a-col :span="8">
        <a-card title="节点类型列表" :bordered="false">
          <a-row>
            <a-form layout="inline">
              <a-form-item>
                <a-input
                  placeholder="请输入节点类型名称"
                  v-model:value="keyWord"
                />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="search">
                  <SearchOutlined />
                  搜索
                </a-button>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="addCategory">
                  <PlusOutlined />
                  添加
                </a-button>
              </a-form-item>
            </a-form>
          </a-row>
          <a-row style="margin-top: 10px">
            <a-col :span="24" style="padding: 10px; background-color: #fff">
              <div v-for="(item,index) in categoryList" :key="index">
                <div class="shortcuts">
                  <div style="padding: 0px 20px; color: #000">
                    {{ item.title }}
                  </div>
                </div>
                <div v-for="ite in item.items" :key="ite.id">
                  <div
                    :class="
                      ite.active ? 'cateName-active cateName' : 'cateName'
                    "
                  >
                    <div
                      @click="changeCategory(ite.id)"
                      style="
                        padding: 0px 20px;
                        color: #000;
                        display: flex;
                        cursor: pointer;
                      "
                    >
                      <div
                        class="circle"
                        :style="{ 'background-color': ite.categoryColor }"
                      ></div>
                      <span>{{ ite.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card title="节点类型编辑" :bordered="false">
          <a-form>
             <a-row justify="start" :gutter="6" align="middle">
                <a-col :span="14">
                    <a-form-item label="节点名称">
                      <a-input
                        placeholder="请输入节点名称"
                        v-model:value="currCreateAttrsModel.category"
                      />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                    <a-form-item label="">
                        <el-color-picker
                        v-model="currCreateAttrsModel.categoryColor"
                      ></el-color-picker>
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item label="">
                         <a-button
                    @click="editCategory('prop')"
                    size="small"
                    type="primary"
                    >保存</a-button>
                  </a-form-item>
                </a-col>

              </a-row>
          </a-form>
         
       <a-row align="middle" :gutter="8" >
            <a-col :span="8"> <a-typography-text  strong>节点类型对应属性列表</a-typography-text></a-col>
            <a-col :span="6">
              <a-button type="primary" @click="updateAttr(null)">
                <PlusOutlined />
                添加属性
              </a-button>
              </a-col>
          </a-row>
         <br />
   
          <a-table
            size="small"
            bordered
            :columns="editAttrColumns"
            :data-source="categoryAttrList"
            :scroll="{ y: 'max-content' }"
            :rowKey="(data) => data.id"
            :pagination="false"
          >
            <template  #attrName="{ text, record,  }">
              <div>
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  v-model:value="record.attrName"
                />
                <template v-else>
                  {{ text }}
                </template>
              </div>
            </template>
            <template #mediaType="{  record }">
              <div>
                <a-radio-group
                  v-if="record.editable"
                  name="radioGroup"
                  v-model:value="record.mediaType"
                >
                  <a-radio value="image">图片</a-radio>
                  <a-radio value="text">文本</a-radio>
                </a-radio-group>
                <template v-else>
                  <span>{{
                    record.mediaType == "text" ? "文本" : "图片"
                  }}</span>
                </template>
              </div>
            </template>

            <template #action="{ record }">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a-button
                    @click="() => editCategory('attr')"
                    size="small"
                    type="primary"
                    >保存</a-button
                  >
                  <a-button
                    style="margin-left: 5px"
                    @click="() => cancel(record.id)"
                    size="small"
                    type="primary"
                    >取消</a-button
                  >
                </span>
                <span v-else>
                  <a-button
                    @click="() => updateAttr(record)"
                    size="small"
                    type="primary"
                    >修改</a-button
                  >
                  <a-popconfirm
                    @confirm="delAttr(record)"
                    title="确定删除吗?"
                    cancelText="取消"
                    okText="确定"
                  >
                    <a-button
                      style="margin-left: 5px"
                      size="small"
                      type="primary"
                      danger
                      >
                      删除
                      </a-button>
                  </a-popconfirm>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="showEditCategory"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title="编辑节点类型"
      @ok="saveCategory"
      cancelText="取消"
      okText="确定"
      @cancel="showEditCategory.value = false"
    >
      <a-row>
        <a-col :span="24">
          <a-form layout="inline">
            <a-form-item label="节点类型名称：">
              <a-input
                v-model:value="categoryEditModel.category"
                placeholder="请输入节点类型名称"
              ></a-input>
            </a-form-item>
            <a-form-item label="选择颜色">
              <el-color-picker
                v-model="categoryEditModel.categoryColor"
              ></el-color-picker>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
      <a-row style="text-align: right">
        <a-button type="primary" @click="addCategoryRow">
          <PlusOutlined />
          添加属性
        </a-button>
      </a-row>
      <a-row>
        <a-table
          size="small"
          :columns="editAttrColumns"
          bordered
          :data-source="attrList"
          :scroll="{ y: 300 }"
          style="margin: 15px 0 0"
          :pagination="false"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
        >
          <template #attrName="{ record }">
            <a-input
              v-model:value="record.attrName"
              placeholder="请输入属性名称"
            ></a-input>
          </template>
          <template #mediaType="{ record }">
            <a-radio-group name="radioGroup" v-model:value="record.mediaType">
              <a-radio value="image">图片</a-radio>
              <a-radio value="text">文本</a-radio>
            </a-radio-group>
          </template>
          <template #action="{  index }">
            <el-button @click="delCategoryRow(index)" type="text"
              >删除</el-button
            >
          </template>
        </a-table>
      </a-row>
    </a-modal>
  </div>
</template>

<script setup>
import { SearchOutlined, PlusOutlined } from "@ant-design/icons-vue";
// import { ColorPicker } from 'element-ui';
import { useRoute } from "vue-router";
import { onMounted, ref, getCurrentInstance } from "vue";
import { Modal, message } from "ant-design-vue";
import { requestHeader, sign } from "constants";

const route = useRoute();
const vm = getCurrentInstance();
const axios = vm.proxy.axios;

const keyWord = ref("");
//节点类型列表数据
const categoryList = ref([]);
const currentCategoryId = ref("");

//节点类型属性列表
const categoryAttrList = ref([]);;
// 缓存 属性列表
let cacaheCategoryAttrList ;
let cacheGategoryModel ;
const currCreateAttrsModel = ref({
  category: "",
  categoryColor: "",
  id:''
  // categoryType: 1,
  // categoryColor: "",
  // attrList: [],
}); 
const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
  },
  {
    title: "名称",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "类型",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]);

//加载节点类型列表
const loadCategoryList = async () => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      category: keyWord.value,
      categoryType: 1,
      pagination: {
        // 分页信息，不能为空，如若查询所有（不建议），size给最大值
        number: 1, // 从 1 开始
        size: 10000,
      },
    },
  };
  let result = await vm.proxy.axios
    .post("/dandelion/api/v1/item_category/page", formData)
    .catch((error) => {});
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
    categoryList.value = ret;
    console.log("节点", categoryList);
    if (ret.length > 0) {
      currentCategoryId.value = ret[0].items[0].id;
      await changeCategory(currentCategoryId.value);
      await getAttrList();
    }
  }
};
//切换选择节点类型
const changeCategory = async (id) => {
  currentCategoryId.value = id;
  categoryList.value.forEach((item, index) => {
    if (item.items.length > 0) {
      item.items.forEach((ite) => {
        ite.active = false;
        if (id == ite.id) {
          cacheGategoryModel = JSON.stringify(ite)
          currCreateAttrsModel.value = {
            ...ite
          }
         
          ite.active = true;
        }
      });
    }
  });
  await getAttrList();
};

//节点类型编辑model
const categoryEditModel = ref({
  categoryId: "",
  category: "",
  categoryType: 1,
  categoryColor: "",
  attrList: [],
});
const attrList = ref([]);
//属性table列
const editAttrColumns = ref([
  {
    title: "属性名称",
    dataIndex: "attrName",
    key: "attrName",
    align: "center",
    slots: { customRender: "attrName" },
  },
  {
    title: "属性类型",
    key: "mediaType",
    dataIndex: "mediaType",
    slots: { customRender: "mediaType" },
  },
  {
    title: "操作",
    key: "action",
    slots: { customRender: "action" },
  },
]);

//显示节点类型编辑框
const showEditCategory = ref(false);
//节点类型保存
const saveCategory = async () => {
  if (!categoryEditModel.value.category) {
    message.error("请输入节点类型名称");
    return false;
  }
  if (!categoryEditModel.value.categoryColor) {
    message.error("请选择颜色");
    return false;
  }
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      category: {
        category: categoryEditModel.value.category,
        categoryType: 1,
        categoryColor: categoryEditModel.value.categoryColor,
      },
      attrs: attrList.value,
    },
  };
  let result = await vm.proxy.axios
    .post("/dandelion/api/v1/item_category/create", formData)
    .catch((error) => {});
  if (result && result.status == "200") {
    message.info("节点类型保存成功");
    showEditCategory.value = false;
    await loadCategoryList();
  } else {
    message.error("节点类型保存失败");
  }
};

/**
 * 搜索方法
 */
const search = async () => {
  await loadCategoryList();
};
/**
 * 添加节点类型
 */
const addCategory = () => {
  showEditCategory.value = true;
};

//添加属性行
const addCategoryRow = () => {
  attrList.value.push({
    categoryId: null,
    attrName: "",
    mediaType: "",
  });
};
//删除属性行
const delCategoryRow = (index) => {
  let tempArr = JSON.parse(JSON.stringify(attrList));
  attrList.value = ref([]);
  let aa = [];
  tempArr.forEach((item, ind) => {
    if (ind !== index) {
      aa.push(item);
    }
  });
  attrList.value = aa;
};

//根据类型id加载属性列表
const getAttrList = async () => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      categoryId: currentCategoryId.value,
    },
  };
  let result = await vm.proxy.axios
    .post("/dandelion/api/v1/item_category/attribute/list", formData)
    .catch((error) => {});
  if (result && result.status == "200") {
    
    const attrs = result.data.payload.attrs;
    categoryAttrList.value = attrs;
    cacaheCategoryAttrList =  JSON.stringify(attrs)
  }
};



//修改节点类型的属性信息
const updateAttr = (rowData) => {
  if (rowData != null) {
    rowData.editable = true;
  } else {
    //添加
    categoryAttrList.value.push({
      id: "",
      categoryId: currentCategoryId,
      attrName: "",
      mediaType: "",
    });
  }
};
 
 // 编辑保存
  const editCategory = async (type)=>{
    let category = {
      categoryType:1,
    }
    let attrs;
    const getattrs = (list)=>{
      return list.map(t=>{
        
        return {
          id:t.id,
          attrName:t.attrName,
          mediaType:t.mediaType
        }
      })
    }
   if(type==='prop'){
    
     category={
      ...category, 
      id:currCreateAttrsModel.value.id,
      categoryColor:currCreateAttrsModel.value.categoryColor,
      category:currCreateAttrsModel.value.category,
     }
     attrs=getattrs(JSON.parse(cacaheCategoryAttrList||'[]'))   
   }
   if(type==='attr'){
     const cache = JSON.parse(cacheGategoryModel||'{}')
     category={
      ...category, 
      id:cache.id,
      categoryColor:cache.categoryColor,
      category:cache.category,
     }
     attrs =  getattrs( categoryAttrList.value)
   }


    let formData = {
      requestHeader: requestHeader,
      sign: sign,
      payload: {
       category,
       attrs
      },
    };

    
    let res = await axios
      .post("/dandelion/api/v1/item_category/edit", formData)
    if (res && res.status == "200") {
      if(type==='prop'){
        currCreateAttrsModel.value = {
           category: "",
            categoryColor: "",
            id:''
        }
        cacheGategoryModel = null;
        cacaheCategoryAttrList = null
        categoryAttrList.value=[];
        currentCategoryId.value='';
         message.info("保存成功");
        loadCategoryList()
      }else {
        message.info("属性保存成功");
        await getAttrList();
      }
    
    } else {
      message.info("操作失败");
    }
     
  }
 

//属性保存
const saveAttr = async (rowData) => {
  if (rowData.id === "") {
    let formData = {
      requestHeader: requestHeader,
      sign: sign,
      payload: {
        attr: {
          categoryId: rowData.categoryId,
          attrName: rowData.attrName,
          mediaType: rowData.mediaType,
        },
      },
    };
    let res = await vm.proxy.axios
      .post("/dandelion/api/v1/item_category/attribute/create", formData)
      .catch((error) => {});
    if (res && res.status == "200") {
      message.info("属性保存成功");
      await getAttrList();
    } else {
      message.info("属性保存失败");
    }
  } else {
    let formData = {
      requestHeader: requestHeader,
      sign: sign,
      payload: {
        attr: {
          id: rowData.id,
          categoryId: rowData.categoryId,
          attrName: rowData.attrName,
          mediaType: rowData.mediaType,
        },
      },
    };
    let res = await vm.proxy.axios
      .post("/dandelion/api/v1/item_category/attribute/edit", formData)
      .catch((error) => {});
    if (res && res.status == "200") {
      message.info("属性保存成功");
      await getAttrList();
    } else {
      message.info("属性保存失败");
    }
  }
};
//删除节点类型的属性
const delAttr = async (rowData) => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      ids: [rowData.id],
    },
  };
  let res = await vm.proxy.axios
    .post("/dandelion/api/v1/item_category/attribute/clear", formData)
    .catch((error) => {});
  if (res && res.status == "200") {
    message.info("属性删除成功");
    await getAttrList();
  } else {
    message.info("属性删除失败");
  }
};

onMounted(async () => {
  await loadCategoryList();
});
</script>
<style lang="less" scoped>
#DataMgmt {
  margin: 15px 0;
}

.shortcuts {
  background-color: #f0f2f5;
  height: 30px;
  line-height: 30px;
  border-bottom: solid 1px #e5e5e5;
}

.cateName {
  height: 45px;
  line-height: 45px;
  border-bottom: solid 1px #e5e5e5;

  .circle {
    margin-top: 12px;
    margin-right: 10px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  span {
    vertical-align: center;
  }
}

.cateName-active {
  background-color: #d5d5d5 !important;
}

.cateName .active {
}
</style>