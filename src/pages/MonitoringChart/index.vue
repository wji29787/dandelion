<template>
  <div class="test">
    <div class="left">
      <div class="title">请输入坐标或者地图中点击</div>
      <a-form>
        <a-form-item label="经度">
          <a-input />
        </a-form-item>
        <a-form-item label="纬度">
          <a-input />
        </a-form-item>
      </a-form>
      <div class="title">污染信息</div>
      <a-form>
        <a-form-item label="类别">
          <a-select placeholder="请选择类别">
            <a-select-option value="shanghai">化学平</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="名称">
          <a-input placeholder="污染物名称" />
        </a-form-item>
        <a-form-item label="总量">
          <a-input placeholder="单位mg" />
        </a-form-item>
        <a-form-item label="泄露量">
          <a-input placeholder="单位mg" />
        </a-form-item>
        <div style="text-align: center;">
          <a-button >导入气象数据</a-button>
        </div>
        <a-form-item label="选择模型">
          <a-select placeholder="请选择模型">
            <a-select-option value="shanghai">高斯烟团模型</a-select-option>
          </a-select>
        </a-form-item>
        <div class="left-footer">
          <div style="text-align: center;">
            <a-button >案例库</a-button>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a-button >知识库</a-button>
          </div>
        </div>
      </a-form>
    </div>
    <img id="image" style="display: none;" src="@/images/1640615815477.jpg" alt="Picture" />
    <div class="right">
      <!-- <div class="title">请输入坐标或者地图中点击</div> -->
      <a-form>
        <a-form-item label="侦查方案">
          <a-button >详情>></a-button>
        </a-form-item>
        <a-form-item label="装备">
          <!-- <a-input /> -->
        </a-form-item>
      </a-form>
      <a-form>
        <a-form-item label="数量">
        </a-form-item>
        <a-form-item label="目标物">

        </a-form-item>
        <a-form-item label="地点">
        </a-form-item>
        <a-form-item label="人员方案">
         <a-button >详情>></a-button>
        </a-form-item>
        <a-form-item label="装备">

        </a-form-item>
        <a-form-item label="使用时长">
        </a-form-item>
         <a-form-item label="消洗方案">

         <a-button >详情>></a-button>
        </a-form-item>
        <a-form-item label="装备">

        </a-form-item>
        <a-form-item label="消息地">
        </a-form-item>
        <a-form-item label="地点">
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
// You should import the CSS file.

import { onMounted } from 'vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
console.log(document.querySelector('#image'));

onMounted(() => {
  // View an image.
  const viewer = new Viewer(document.getElementById('image'), {
    inline: true,
    viewed() {
      viewer.zoomTo(0.7);
    },
    backdrop: false,
    button: false,
    toolbar: false,
    minHeight: 700,
    fullscreen: false,
    // movable: false
  });
  // Then, show the image by clicking it, or call `viewer.show()`.

  // View a list of images.
  // Note: All images within the container will be found by calling `element.querySelectorAll('img')`.
  // const gallery = new Viewer(document.getElementById('images'));
});
// const viewer = new Viewer(, {
//   inline: true,
//   viewed() {
//     viewer.zoomTo(1);
//   },
// });
// View an image.
// const viewer = new Viewer(document.getElementById('image'), {
//   inline: true,
//   viewed() {
//     viewer.zoomTo(1);
//   },
// });
// Then, show the image by clicking it, or call `viewer.show()`.

// View a list of images.
// Note: All images within the container will be found by calling `element.querySelectorAll('img')`.
// const gallery = new Viewer(document.getElementById('images'));
</script>

<style lang="less">
.test {
  position: relative;
  .left,
  .right {
    position: absolute;
    z-index: 999;
    height: 700px;
    width: 170px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  // .left {
  //   position: relative;
  //   left: 0;
  //
  // }
  .left-footer {
      position: absolute;
      bottom:10px;
      width: 100%;
    }
  .right {
    right: 0;
  }

}
</style>