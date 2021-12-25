import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Login.vue"),
    name: "Login",
    meta: {
      title: "登录",
      icon: "",
      hidden: true,
    },
  },
  {
    path: "/main",
    name: "main",
    meta: {
      title: "",
      icon: "",
      hidden: false,
    },
    component: () => import("./pages/Main.vue"),
    beforeEnter: (to, from, next) => {
      if (!window.localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    },
    children: [
      {
        path: "/",
        redirect: "/main/KnowledgeGraph",
      },
      {
        path: "KnowledgeGraph",
        name: "KnowledgeGraph",
        component: () => import("./pages/KnowledgeGraph/index.vue"),
        meta: {
          title: "知识图谱显示",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "DataMgmt",
        name: "DataMgmt",
        component: () => import("./pages/DataMgmt/index.vue"),
        meta: {
          title: "节点类型管理",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "WordMgmt",
        name: "WordMgmt",
        component: () => import("./pages/WordMgmt/index.vue"),
        meta: {
          title: "词库管理",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "relatshipTypeMgmt",
        name: "relatshipTypeMgmt",
        component: () => import("./pages/relatshipTypeMgmt/index.vue"),
        meta: {
          title: "关系类型管理",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "Map",
        name: "Map",
        component: () => import("./pages/Map/index.vue"),
        meta: {
          title: "地图",
          icon: "",
          hidden: false,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
