<template>
  <div id="DataMgmt">
    <a-row :gutter="15">
      <a-col :span="8">
        <a-card title="关系类型列表" :bordered="false">
          <a-row>
            <a-form layout="inline">
              <a-form-item>
                <a-input
                  placeholder="请输入关系类型名称"
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
                <a-button type="primary" @click="openCategory">
                  <PlusOutlined />
                  添加
                </a-button>
              </a-form-item>
            </a-form>
          </a-row>
          <a-row style="margin-top: 10px">
            <a-col :span="24" style="padding: 10px; background-color: #fff">
              <div v-for="(item, inx) in categoryList" :key="inx">
                <div class="shortcuts">
                  <div style="padding: 0px 20px; color: #000">
                    {{ item.title }}
                  </div>
                </div>
                <div v-for="(ite, idx) in item.items" :key="idx">
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
        <a-card title="关系类型对应属性列表" :bordered="false">
          <a-form>
            <a-form-item>
              <a-button type="primary" @click="updateAttr(null)">
                <PlusOutlined />
                添加属性
              </a-button>
            </a-form-item>
          </a-form>
          <a-table
            size="small"
            bordered
            :columns="editAttrColumns"
            :data-source="categoryAttrList"
            :scroll="{ y: 'max-content' }"
            :rowKey="(data) => data.id"
            :pagination="false"
          >
            <template  #attrName="{ text, record }">
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
            <template #mediaType="{ record }">
             <span>{{ mediaTypeOpt2[record.mediaType]  }}</span>
            </template>

            <template #action="{ record }">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a-button
                    @click="() => saveAttr(record)"
                    size="small"
                    type="primary"
                    >保存</a-button
                  >
                  <a-button
                    style="margin-left: 5px"
                    @click="() => cancelAttr(record)"
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
                      >删除</a-button
                    >
                  </a-popconfirm>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="modelData.showEditCategory"
      :maskClosable="false"
      :mask="true"
      width="620px"
      title="编辑关系类型"
      @ok="saveCategory"
      cancelText="取消"
      okText="确定"
      @cancel="cancel"
    >
      <a-row>
        <a-col :span="24">
          <a-form layout="inline">
            <a-form-item label="关系类型名称：">
              <a-input
                v-model:value="categoryEditModel.category"
                placeholder="请输入关系类型名称"
              ></a-input>
            </a-form-item>
            <!-- <a-form-item label="选择颜色">
              <el-color-picker
                v-model="categoryEditModel.categoryColor"
              ></el-color-picker>
            </a-form-item> -->
          </a-form>
        </a-col>
      </a-row>
      <a-row style="text-align: right">
        <a-button type="primary" @click="addAttrsRow">
          <PlusOutlined />
          添加属性
        </a-button>
      </a-row>
      <a-row>
        <a-table
          size="small"
          :columns="editAttrColumns"
          bordered
          :data-source="modelData.attrList"
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
            <span>{{ mediaTypeOpt2[record.mediaType]  }}</span>
            <!-- <a-radio-group name="radioGroup" v-model:value="record.mediaType" disabled> -->
              <!-- <a-radio value="image">图片</a-radio> -->
              <!-- <a-radio value="text">文本</a-radio>
            </a-radio-group> -->
          </template>
          <template #action="{ index }">
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
import { onMounted, ref, getCurrentInstance ,reactive} from "vue";
import { Modal, message } from "ant-design-vue";
import { requestHeader, sign } from "constants";
import {  mediaTypeOpt2   } from '@/utils/assetsType'
//属性table列
import { editAttrColumns ,defaultattrsItem} from './conf'

const route = useRoute();
const vm = getCurrentInstance();
const axios = vm.proxy.axios;


let cacheAttr;
const keyWord = ref("");
//关系类型列表数据
const categoryList = ref([]);
const currentCategoryId = ref("");

//关系类型属性列表
const categoryAttrList = ref([]);

//加载关系类型列表
const loadCategoryList = async () => {
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      category: keyWord.value,
      categoryType: 2,
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
    if (ret.length > 0) {
      currentCategoryId.value = ret[0].items[0].id;
      await changeCategory(currentCategoryId.value);
      await getAttrList();
    }
  }
};
//切换选择关系类型
const changeCategory = async (id) => {
  currentCategoryId.value = id;
  categoryList.value.forEach((item, index) => {
    if (item.items.length > 0) {
      item.items.forEach((ite) => {
        ite.active = false;
        if (id == ite.id) {
          ite.active = true;
        }
      });
    }
  });
  await getAttrList();
};

//关系类型编辑model
const  modelData = reactive({
  showEditCategory:false,
  attrList:[]
})

const categoryEditModel = reactive({
  categoryId: "",
  category: "",
  categoryType: 2,
  categoryColor: "#22ff00",
});

const openCategory = () => {
   modelData.showEditCategory = true;
};
const cancle = ()=>{
  modelData.showEditCategory = false;
  modelData.attrList = [];
  categoryEditModel.category=''
}
// 新增属性
const addAttrsRow = ()=>{
  modelData.attrList.push(defaultattrsItem())
}


//删除属性行
const delCategoryRow = (index) => {
  const newlist = modelData.attrList.filter((t,i)=>i!==index);
  modelData.attrList = newlist;
};
//关系类型保存
const saveCategory = async () => {
  if (!categoryEditModel.category) {
    message.error("请输入关系类型名称");
    return ;
  }

  let idx ; 
  const errorFlag = modelData.attrList.some((item,i)=>{
          if(!item.attrName){
            idx = i
            return true
          }
          return false
         
  })
  if(errorFlag){
     message.error(`第${idx+1}项,属性名称不能为空`);
     return
  }
  
  let formData = {
    requestHeader: requestHeader,
    sign: sign,
    payload: {
      category: {
        category: categoryEditModel.category,
        categoryType: 2,
        categoryColor: categoryEditModel.categoryColor,
      },
      attrs:  modelData.attrList ,
    },
  };
  
  try {
      let result = await axios
      .post("/dandelion/api/v1/item_category/create", formData)
 
      if (result && result.status == "200") {
        message.info("关系类型保存成功");
      
        cancle()
        await loadCategoryList();
      } else {
        message.error("关系类型保存失败");
      }
  }catch(e){
      message.error("关系类型保存失败");
  }
 
};

/**
 * 搜索方法
 */
const search = async () => {
  await loadCategoryList();
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
    categoryAttrList.value = result.data.payload.attrs;
  }
};

//修改关系类型的属性信息
const updateAttr = (rowData) => {
  if(rowData){
    cacheAttr = {
      ...rowData
    }
    rowData.editable = true;
  }else {
      //添加
    categoryAttrList.value.push(defaultattrsItem({
      id:'',
       categoryId: currentCategoryId,
    }));
  }
};
//属性保存
const saveAttr = async (rowData) => {
    const attr = {
            categoryId: rowData.categoryId,
            attrName: rowData.attrName,
            mediaType: rowData.mediaType,
    }
    // 新增
    let url ="/dandelion/api/v1/item_category/attribute/create"
    if (rowData.id) {
      attr.id = rowData.id;
      url = "/dandelion/api/v1/item_category/attribute/edit"
    } 
    const formData ={
      requestHeader: requestHeader,
      sign: sign,
      payload: {
        attr,
      },
    };


      try {
        let res = await axios.post(url, formData)

        if (res && res.status == "200") {
          message.info("属性保存成功");
          await getAttrList();
        } else {
          message.info("属性保存失败");
        }
      
      }catch(e){
            message.info("属性保存失败");
      }
   
  
};
//删除关系类型的属性
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
// 取消 
const cancelAttr=()=>{
  getAttrList();
}
onMounted(async () => {
   message.info("属性保存成功");
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