

//设置图例
const nodeTypeColorMap = {
    1: "#AAD3F5", //物质
    2: "#FEC3B3", //灭火剂
    3: "#AADA8F", //设备
    4: "#FFCE80", //症状
  };
   const getLegend = () => {
    const legendData = {
      nodes: [
        {
          id: "node",
          label: "主节点",
          type: "circle",
          size: 15,
          style: {
            fill: nodeTypeColorMap["1"],
            cursor: "pointer",
          },
        },
        {
          id: "attr",
          label: "属性节点",
          size: 15,
          type: "circle",
          style: {
            fill: nodeTypeColorMap["3"],
          },
        },
        {
          id: "relation",
          label: "关系节点",
          size: 15,
          type: "circle",
          style: {
            fill: nodeTypeColorMap["4"],
          },
        },
      ],
    };
    const legend = new G6.Legend({
      data: legendData,
      align: "center",
      layout: "vertical",
      position: "top-right",
      offsetX: -20,
      offsetY: 20,
      vertiSep: 5,
      horiSep: 0,
      padding: [10, 10, 10, 16],
      containerStyle: {
        fill: "#fff",
        lineWidth: 1,
        radius: 10,
        cursor: "pointer",
        style: {
          stroke: "#666",
          cursor: "pointer",
        },
      },
      title: "图例",
      titleConfig: {
        position: "center",
        offsetX: 0,
        offsetY: 5,
        style: {
          cursor: "pointer",
          textAlign: "center",
          fontSize: 18,
        },
      },
      filter: {
        enable: true,
        multiple: true,
        trigger: "mouseenter", //click
        graphActiveState: "activeByLegend",
        graphInactiveState: "inactiveByLegend",
        filterFunctions: {
          node: (d) => {
            if (d.nodeCategory === "node") return true;
            return false;
          },
          attr: (d) => {
            if (d.nodeCategory === "node-attr") return true;
            return false;
          },
          relation: (d) => {
            if (d.nodeCategory === "node-relation") return true;
            return false;
          },
        },
      },
    });
  
    return legend;
  };

export default getLegend