//属性table列
export const editAttrColumns = [
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
  ];

  export const defaultattrsItem = (data={})=>{
    return {
      attrName:'',
      mediaType:'text', // 图片2 文本1 // 默认文本
      categoryId:new Date().getTime(),
      ...data
    }
 }