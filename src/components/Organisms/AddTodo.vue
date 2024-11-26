<script setup>
import InputForm from '../Atoms/InputForm.vue'

defineProps({
  addInputValue: {
    type: String,
    required: true
  },
  onAddTodo: {
    type: Function,
    required: true
  }
})

defineEmits(['update:addInputValue'])
</script>

<template>
  <h2 class="subTitle">Add TODO</h2>
  <InputForm
    :model-value="addInputValue"
    :placeholder="`Please input todo`"
    :on-keydown="onAddTodo"
    @update:model-value="$emit('update:addInputValue', $event)"
  />
</template>

<style scoped>
.subTitle {
  text-align: center;
  color: #fff;
}
</style>
