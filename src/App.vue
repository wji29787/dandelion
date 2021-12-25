<template>
  <Loading :visible="state.isLoading" />

 <router-view />
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import { Loading } from "cmpts";

const store = useStore();

const state = reactive({
  isLoading: computed(() => store.getters["commons/isLoading"]),
});
</script>
