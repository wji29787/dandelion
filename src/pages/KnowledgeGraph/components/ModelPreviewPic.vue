<template>
   <a-modal
        title="图片预览"
        v-model:visible="props.modelValue"
        :footer="null"
        @cancel="cancel"
        @update:visible="update"
      >
        <img
          alt="example"
          style="max-width: 100%; display: block; margin: 0 auto"
          :src="props.src"
        />
      </a-modal>
</template>

<script setup>

// 图片预览
const props = defineProps({
  modelValue:Boolean,
  src:String
})
const emit = defineEmits(['cancel','update:modelValue'])
const update = (v)=>{
  emit('update:modelValue',v)
}
const cancel = ()=>{
    emit('cancel')
}

</script>

