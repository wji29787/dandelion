import G6 from "@antv/g6/dist/g6.min";

//设置右键菜单
const getContextMenu = (opts={}) => {

    const events = opts.on||{};

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
        if(events[type]){
            events[type](target,item)
        }
     
      },
      offsetX: 16,
      offsetY: 6,
      itemTypes: ["node", "edge"],
    });
  
    return contextMenu;
  };


  export default getContextMenu