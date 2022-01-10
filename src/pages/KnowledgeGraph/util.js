import G6 from "@antv/g6/dist/g6.min";

// 获取当前关系
export const getCurrentRations = (list, id) => {
  if (list.value.length > 0 && id) {
    let current;
    list.value.find((item) => {
      const t = item.items.find((ite) => ite.id === id);
      if (t) {
        current = t;
        return true;
      }
      return false;
    });
    return current;
  }
};
export const defaultattrsItem = (data={})=>{
  return {
    attrName:'',
    mediaType:'文本', // 图片 文本 // 默认文本
    categoryId:new Date().getTime(),
    ...data
  }
}

//设置节点样式
const setNodeStyle = (element, nodeColor) => {
  
  element.label = element.itemName || element.attrValue;
  if (element.nodeCategory == "node") {
    element.labelCfg = {
      style: {
        fontSize: 14,
      },
    };
  }
  const color = element.nodeColor||nodeColor;
  if(color){
    element.style = {
      fill: color,
    };
  }
 
};

// 创建节点数据源
export const createNodes = (nodesandedges,data) => {
  let nodes = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    element.nodeCategory = "node";
    setNodeStyle(element);
    nodes.push(element);
    const parent = {
      id:element.id,
      itemName:element.itemName,
      categoryId:element.categoryId,
    }
    //属性节点
    if (element.itemAttrs && element.itemAttrs.length) {
      let itemAttrs = element.itemAttrs;
      for (let j = 0; j < itemAttrs.length; j++) {
        const elementj = itemAttrs[j];
        if (elementj.mediaType && elementj.mediaType == "1") {
          
          elementj.parent = parent;
          elementj.nodeCategory = "node-attr";
          setNodeStyle(elementj);
          nodes.push(elementj);
        }
      }
    }
    //关系节点
    if (element.relations && element.relations.length) {
      let relations = element.relations;
      for (let k = 0; k < relations.length; k++) {
        const elementk = relations[k];
        if (elementk.items && elementk.items.length) {
          for (let i = 0; i < elementk.items.length; i++) {
            const elementi = elementk.items[i];
            elementi.parent = parent;
            elementi.nodeCategory = "node-relation";
            setNodeStyle(elementi, elementk.nodeColor);
            nodes.push(elementi);
          }
        }
      }
    }
  }
  nodesandedges.nodes = nodes;
};

// 创建边数据源
export const createEdges = (nodesandedges,data) => {
  let edges = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    //属性边
    if (element.itemAttrs && element.itemAttrs.length) {
      let itemAttrs = element.itemAttrs;
      for (let j = 0; j < itemAttrs.length; j++) {
        const elementj = itemAttrs[j];
        if (elementj.mediaType == "1") {
          edges.push({
            id: `${element.id}=>${elementj.id}`,
            source: element.id,
            target: elementj.id,
            label: elementj.attrName,
            nodeCategory: "edge-attr",
          });
        }
      }
    }
    //关系边
    if (element.relations && element.relations.length) {
      let relations = element.relations;
      for (let k = 0; k < relations.length; k++) {
        const elementk = relations[k];
        if (elementk.items && elementk.items.length) {
          for (let i = 0; i < elementk.items.length; i++) {
            const elementi = elementk.items[i];
            edges.push({
              id: `${element.id}=>${elementi.id}`,
              source: element.id,
              target: elementi.id,
              label: elementk.relationName,
              relationid: elementk.id,
              categoryId: elementk.categoryId,
              color: "#000",
              nodeCategory: "edge-relation",
              style: {
                lineWidth: 1,
                lineAppendWidth: 3,
                cursor: "pointer",
                endArrow: {
                  path: G6.Arrow.triangle(),
                  fill: "#000",
                },
              },
            });
          }
        }
      }
    }
  }
  nodesandedges.edges = edges;
};


export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}