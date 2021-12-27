import { createApp } from "vue";

import VueAxios from "vue-axios";
import {  message } from 'ant-design-vue';
// import axios from "./api/request";
import axios from "axios";
import App from "./App.vue";
import Router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";

import "normalize.css/normalize.css";

// import Element from 'element-plus';
// import 'element-plus/dist/index.css';


const app = createApp(App);
app.config.globalProperties.$message = message;
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.use(Router);
app.use(store);
// app.use(Element);

app.mount("#app");
