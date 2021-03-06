import { createRouter, createWebHashHistory } from "vue-router";
import RouterComponent from  '@/components/RouterComponent.vue'
import Main from  '@/pages/Main/index.vue'
import Login from  '@/pages/Login/index.vue'
// 文档管理 DocManage
// 数据管理 DataManage
// 模型管理 ModelManage
// 用户管理 UserManage
// 系统管理 SysManage
// 日志管理 LogManage

const routes = [
  
  {
    path: "/login",
    name: "Login",
    component: Login,
    name: "Login",
    meta: {
      title: "登录",
      icon: "",
      hidden: true,
    },
  },
  {
    path: "/main",
    name: "Main",
    meta: {
      title: "",
      icon: "",
      hidden: false,
    },
    component: Main,
    // beforeEnter: (to, from, next) => {
    //   if (!window.localStorage.getItem("token")) {

    //     next("/login");
    //   } else {
    //     next();
    //   }
    // },
    // redirect:'/main/MonitoringChart',
    children: [
      {
        path: "/main",
        redirect: "/main/MonitoringChart",
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
      {
        path: "DocManage",
        name: "DocManage",
        component: () => import("./pages/DocManage/index.vue"),
        meta: {
          title: "文档管理",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "ModelManage",
        name: "ModelManage",
        component: () => import("./pages/ModelManage/index.vue"),
        meta: {
          title: "模型管理",
          icon: "",
          hidden: false,
        },
      },
      {
        path: "SysManage",
        name: "SysManage",
        component: RouterComponent,
        meta: {
          title: "系统管理",
          icon: "",
          hidden: false,
        },
        children:[
          {
            path: "UserManage",
            name: "UserManage",
            component: ()=> import("./pages/SysManage/UserManage/index.vue"),
            meta: {
              title: "用户管理",
              icon: "",
              hidden: false,
            },

          },
          {
            path: "LogManage",
            name: "LogManage",
            component:  ()=>import("./pages/SysManage/LogManage/index.vue"),
            meta: {
              title: "日志管理",
              icon: "",
              hidden: false,
            },

          },
       
        ]
      },
      {
        path: "MonitoringChart",
        name: "MonitoringChart",
        component: () => import("./pages/MonitoringChart/index.vue"),
        meta: {
          title: "危害范围态势展示",
          icon: "",
          hidden: false,
        },

      },
      {
        path: "MeteorologicalManage",
        name: "MeteorologicalManage",
        component: () => import("./pages/MeteorologicalManage/index.vue"),
        meta: {
          title: "气象管理",
          icon: "",
          hidden: false,
        },

      }
    ],
  },
  {
    path: "/",
    redirect: "/main",
    // component: () => import("./pages/Login/index.vue"),
    // name: "Login",
    // meta: {
    //   title: "登录",
    //   icon: "",
    //   hidden: true,
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !window.localStorage.getItem("token")){
    next({ name: 'Login' })
  } 
  else {
    next()
  }
})

export default router;
