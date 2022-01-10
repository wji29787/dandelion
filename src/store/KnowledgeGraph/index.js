import axios from "axios";
import { requestHeader, sign } from "constants";
import { ADD_STACK_ITEM, DEL_STACK_ITEM } from "../mutation-types";







const store = {

  namespaced: true,
  state: {
    categoryList1:[], 
    categoryList2:[] 
  },

  mutations:{
    save(state, paload) {
      if (!paload || typeof paload !== 'object') {
        return;
      }
      Object.keys(paload).forEach((key) => {
        const value = paload[key];
        state[key] = value;
      });
    },
  },
  actions:{
    async loadCategoryList(_,categoryType=1){
       // 1 节点模版 2 属性模版
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
      let { status, data} = await axios.post(
        "/dandelion/api/v1/item_category/page",
        formData
      );
       let ret = []
      if (status == "200") {
        let tempCategoryList = data.payload.items;
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
        // var ret = [];
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
        // return ret;
      }
      return ret
       
    },
    async getCategoryList1({ dispatch,state,commit }){
      if(state.categoryList1.length>0){
        return
      }
      const list =  await  dispatch('loadCategoryList',1) 
      console.log('list',list)
      commit('save',{
        categoryList1:list
      })
    },
    async getCategoryList2({ dispatch,state,commit }){
      if(state.categoryList2.length>0){
        return
      }
      const list =  await dispatch('loadCategoryList',2) 
      commit('save',{
        categoryList2:list
      })
    },
    // 获取属性列表
    async getAttrList (_,paload={}) {
     const { id,type } = paload
      let formData = {
        requestHeader: requestHeader,
        sign: sign,
        payload: {
          categoryId: id,
        },
      };
      let result = await axios
        .post("/dandelion/api/v1/item_category/attribute/list", formData)
      if (result && result.status == "200") {
         const { payload } = result.data
        if(type ===1){
            
                const itemAttrs = payload.attrs.map((t) => {
                  return {
                    attrName: t.attrName,
                    attrValue: "",
                    mediaType: 1,
                  };
                });
                return itemAttrs;
              
        }else {
           
            const itemAttrs = payload.attrs.map((t) => {
                  return {
                    attrName: t.attrName,
                    attrValue: "",
                    mediaType: 1,
                  };
                });
                return itemAttrs;
        }
      }
      
    },
     async merge({ commit },paload){
       const data = {
        requestHeader: requestHeader,
        sign: sign,
        payload:{
          ...paload
        }
       }
       store.commit(`commons/${ADD_STACK_ITEM}`, data,{root:true});
       const res = await   axios.post("/dandelion/api/v1/hazard-item/merge", data).catch((error) => {
                 commit(`commons/${DEL_STACK_ITEM}`, data,{root:true});
            });
        commit(`commons/${DEL_STACK_ITEM}`, data,{root:true});  
        return res  
    },
    async gategoryAdd({ dispatch },paload){
      const { itemAttrs ,fileList,itemName,categoryId} = paload
      let attrs = [];
      for (let index = 0; index < itemAttrs.length; index++) {
        const element = itemAttrs[index];
        attrs.push({
          mediaType: 1,
          attrName: element.attrName,
          attrValue: element.attrValue,
        });
      }
     
      if (fileList.length) {
        let attrValue = [];
        for (let index = 0; index < fileList.length; index++) {
          const element = fileList[index];
          attrValue.push(await getBase64(element.originFileObj));
        }
        attrs.push({
          mediaType: 2,
          attrName: "图片",
          attrValue: attrValue.join("@"),
        });
      }
      const item = {
        itemName: itemName,
        categoryId: categoryId || +new Date(),
        nodeColor: "#00ff55",
      };
      if (attrs.length > 0) {
        item.itemAttrs = attrs;
      }
    
      return dispatch('merge',{item})
    },
 async gategoryEdit({ dispatch },paload){
      const { itemAttrs ,fileList,itemName,categoryId,id,nodeColor} = paload
      let attrs = [];
      let itemImg;
      for (let index = 0; index < itemAttrs.length; index++) {
        const element = itemAttrs[index];
        if(element.mediaType==1){
          const attr = {
            mediaType: 1,
            attrName: element.attrName,
            attrValue: element.attrValue,
          }
          if(element.id){
            attr.id = element.id;
          }
          attrs.push(attr);
        }else {
          itemImg = element;
        }
      
      }
    
      if (fileList.length) {
        let attrValue = [];
        for (let index = 0; index < fileList.length; index++) {
          const element = fileList[index];
          if(element.url){
            attrValue.push(element.url);
          }else {
            attrValue.push(await getBase64(element.originFileObj));
          }
        
        }
        let imgAttr = {
          mediaType: 2,
          attrName: "图片",
          attrValue: attrValue.join("@"),
        }
        if(itemImg){
          imgAttr.id = itemImg.id
        }
        attrs.push(imgAttr);
      }
      const item = {
        itemName,
        categoryId,
        nodeColor,
        id,
        itemAttrs: attrs,
      };
     
      return dispatch('merge',{item})
    },
    //属性添加
    relationAdd({ dispatch },paload){
      // if (!modelCategoryType.select) {
      //   message.info("关系不能为空");
      // }
      const { select,id,itemName,categoryId,relation, item}  =paload
      const current = getCurrentRations(categoryList2, modelCategoryType.select);
      
      // let formData = {
      //   requestHeader: requestHeader,
      //   sign: sign,
      //   payload: {
      //     item: {
      //       id: item.getModel().source,
      //       itemName: item.getSource().getModel().label,
      //       categoryId: item.getSource().getModel().categoryId,
      //       relations: [
      //         {
      //           relationName: current.category,
      //           categoryId: current.id,
      //           items: [
      //             {
      //               id: item.getModel().target,
      //               categoryId: item.getTarget().getModel().categoryId,
      //               itemName: item.getTarget().getModel().label,
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      // };
      const payload = {
        item :{
          id,
          itemName,
          categoryId,
          relations:[
           {
            relationName:relation.category,
            categoryId:relation.id,
            items:[
               {
                 id:item.id,
                 categoryId:item.categoryId,
                 itemName:item.itemName,
               }
            ]
           }
          ]

        }
      }
      return dispatch('merge',payload)
    },
    relationEdit({ dispatch },paload){
      return dispatch('merge',payload)
    },
    load(_,paload){

    }
  },

}

export default store;