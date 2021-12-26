import path from "path";
import { defineConfig } from "vite";
import VuePlugin from "@vitejs/plugin-vue";
import ViteComponents from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from '@vitejs/plugin-vue-jsx'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      cmpts: path.resolve(__dirname, "src/components"),
      // utils: path.resolve(__dirname, "src/utils.js"),
      actionTypes: path.resolve(__dirname, "src/store/action-types.js"),
      mutationTypes: path.resolve(__dirname, "src/store/mutation-types.js"),
      constants: path.resolve(__dirname, "src/constants.js"),
      apis: path.resolve(__dirname, "src/api"),
      '@':path.resolve(__dirname, "src"),
      // As: "axios/dist/axios.js",
    },
  },
  plugins: [
    // nodeResolve({
    //   // browser: true,
    // }),
    AutoImport({
      resolvers: [AntDesignVueResolver(), ElementPlusResolver()],
      // resolvers: [ElementPlusResolver()],
    }),
    ViteComponents({
      resolvers: [AntDesignVueResolver(), ElementPlusResolver()],
    }),
    VuePlugin(),
    vueJsx()
    // viteCommonjs({
    //   // include: ["node_modules/@antv/g6", "node_modules/axios"],
    // }),
  ],
  build: {
    target: "es2015",
    // minify: false,
    // sourcemap: true,
    // polyfillModulePreload: false,
  },
  base: "/hsh/",
  server: {
    proxy: {
      "/oauth": "http://localhost:19000",
      "/users/password": "http://localhost:8888",
      "/dandelion/api/v1": {
        target: "http://39.102.74.122:13006",
        // target: 'http://localhost:8888',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/dandelion\/api\/v1/, '/goalie/api/v3')
      },
    },
  },
});
