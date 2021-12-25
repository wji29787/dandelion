<template>
  <div>
    <a-button type="primary" @click="login">登录</a-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  localStorage.token = "123456";
  router.replace({
    name: "KnowledgeGraph",
  });
};
</script>