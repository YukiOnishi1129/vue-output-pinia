<script setup>
import InputForm from '../Atoms/InputForm.vue'
import { useTodoStore } from '../../stores/todoStore'

const todoStore = useTodoStore()
</script>

<template>
  <h2 class="subTitle">Add TODO</h2>
  <InputForm
    v-model="todoStore.state.addInputValue"
    :placeholder="`Please input todo`"
    :on-keydown="todoStore.handleAddTodo"
  />
</template>

<style scoped>
.subTitle {
  text-align: center;
  color: #fff;
}
</style>
