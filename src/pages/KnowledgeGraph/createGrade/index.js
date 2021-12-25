import G6 from "@antv/g6/dist/g6.min"; 

export const defaultOpts = {
  fitCenter: true,
  layout: {
    linkDistance: 100,
    nodeSize: 50,
    nodeStrength: 30,
    edgeStrength: 0.1,
    type: "force",
    preventOverlap: true,
  },
  animate: true,
  defaultNode: {
    size: 40,
    type: "circle",
    style: {
      fill: "#fff",
      stroke: "#333",
      cursor: "pointer",
      fontSize: 12,
    },
  },
  defaultEdge: {
    type: "line",
    color: "#999",
    style: {
      lineWidth: 1,
      lineAppendWidth: 3,
      cursor: "pointer",
      endArrow: {
        path: G6.Arrow.circle(),
        fill: "#fff",
      },
    },
    labelCfg: {
      refY: 10,
      autoRotate: true,
      style: {
        fontSize: 12,
      },
    },
  },
  nodeStateStyles: {
    activeByLegend: {
      lineWidth: 5,
      strokeOpacity: 0.8,
      stroke: "#333",
    },
    inactiveByLegend: {
      opacity: 0.5,
    },
    hover: {
      lineWidth: 5,
      strokeOpacity: 0.8,
      stroke: "#333",
    },
    selected: {
      fill: "#00ff55",
      stroke: "#333",
      strokeOpacity: 0.8,
    },
  },
  edgeStateStyles: {
    activeByLegend: {
      lineWidth: 3,
    },
    inactiveByLegend: {
      opacity: 0.5,
    },
  },
}


//初始化图谱
const create  = (opt) => {
    const container = g6Ref.value;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const legend = getLegend();
    const contextMenu = getContextMenu();
  
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
      container: container,
      width,
      height,
      fitCenter: true,
      layout: {
        linkDistance: 100,
        nodeSize: 50,
        nodeStrength: 30,
        edgeStrength: 0.1,
        type: "force",
        preventOverlap: true,
      },
      animate: true,
      defaultNode: {
        size: 40,
        type: "circle",
        style: {
          fill: "#fff",
          stroke: "#333",
          cursor: "pointer",
          fontSize: 12,
        },
      },
      defaultEdge: {
        type: "line",
        color: "#999",
        style: {
          lineWidth: 1,
          lineAppendWidth: 3,
          cursor: "pointer",
          endArrow: {
            path: G6.Arrow.circle(),
            fill: "#fff",
          },
        },
        labelCfg: {
          refY: 10,
          autoRotate: true,
          style: {
            fontSize: 12,
          },
        },
      },
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
      nodeStateStyles: {
        activeByLegend: {
          lineWidth: 5,
          strokeOpacity: 0.8,
          stroke: "#333",
        },
        inactiveByLegend: {
          opacity: 0.5,
        },
        hover: {
          lineWidth: 5,
          strokeOpacity: 0.8,
          stroke: "#333",
        },
        selected: {
          fill: "#00ff55",
          stroke: "#333",
          strokeOpacity: 0.8,
        },
      },
      edgeStateStyles: {
        activeByLegend: {
          lineWidth: 3,
        },
        inactiveByLegend: {
          opacity: 0.5,
        },
      },
      plugins: [legend, contextMenu],
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
    function refreshDragedNodePosition(e) {
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    }
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
  };


  //设置右键菜单
const getContextMenu = () => {
    const contextMenu = new G6.Menu({
      shouldBegin(evt) {
        return (
          (evt.item.getType() == "node" &&
            evt.item.getModel().nodeCategory != "node-relation") ||
          (evt.item.getType() == "edge" &&
            evt.item.getModel().nodeCategory == "edge-relation")
        );
      },
      getContent(evt) {
        const type = evt.item.getType();
        const model = evt.item.getModel();
        // console.log(model);
        if (type == "node") {
          if (model.nodeCategory == "node") {
            //节点
            return `<div id='contextMenu' class="n-dropdown-menu n-popover n-dropdown">
                  <div class="n-dropdown-option">
                    <div class="n-dropdown-option-body" data-type="updateNode">编辑节点</div>
                    <div class="n-dropdown-option-body" data-type="delNode">删除节点</div>
                    <div class="n-dropdown-option-body" data-type="createRelation">建立关系</div>
                  </div>
                </div>`;
          } else {
            //属性节点
            return `<div id='contextMenu' class="n-dropdown-menu n-popover n-dropdown">
                      <div class="n-dropdown-option">
                        <div class="n-dropdown-option-body" data-type="updateAttr">编辑属性</div>
                        <div class="n-dropdown-option-body" data-type="delAttr">删除属性</div>
                      </div>
                    </div>`;
          }
        } else if (type == "edge") {
          return `<div id='contextMenu' class="n-dropdown-menu n-popover n-dropdown">
                  <div class="n-dropdown-option">
                    <div class="n-dropdown-option-body" data-type="updateRelation">编辑关系</div>
                    <div class="n-dropdown-option-body" data-type="delEdgeByRelation">删除关系</div>
                  </div>
                </div>`;
        }
      },
      handleMenuClick: (target, item) => {
        const type = target.getAttribute("data-type");
        console.log("item---", item);
        // console.log(target, item);
        switch (type) {
          case "updateNode":
            let getModel = JSON.parse(JSON.stringify(item.getModel()));
            currCreateAttrsModel.itemName = getModel.label;
            currCreateAttrsModel.id = getModel.id;
            currCreateAttrsModel.categoryId = getModel.categoryId;
            currCreateAttrsModel.itemAttrs = getModel.itemAttrs || [];
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
            break;
          case "delNode":
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
  
            break;
          case "delAttr":
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
  
            break;
          case "delEdgeByRelation":
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
  
            break;
          case "createRelation":
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
            break;
          case "updateRelation":
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
            break;
          case "updateAttr":
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
            break;
          default:
            break;
        }
      },
      offsetX: 16,
      offsetY: 6,
      itemTypes: ["node", "edge"],
    });
  
    return contextMenu;
  };