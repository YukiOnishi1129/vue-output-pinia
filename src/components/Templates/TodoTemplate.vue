<script setup>
import AddTodo from '../Organisms/AddTodo.vue'
import TodoList from '../Organisms/TodoList.vue'
import InputForm from '../Atoms/InputForm.vue'
import { useTodoTemplate } from '../../composables/useTodoTemplate'

const { showTodoList, addInputValue, searchKeyword, handleAddTodo, handleDeleteTodo } = useTodoTemplate()
</script>

<template>
  <div class="container">
    <h1 class="title">
      Todo List
    </h1>
  </div>
  <!-- Todo追加エリア -->
  <section class="common">
    <AddTodo
      v-model:add-input-value="addInputValue"
      :on-add-todo="handleAddTodo"
    />
  </section>
  <!-- Todo フォームエリア -->
  <section class="common">
    <InputForm
      v-model="searchKeyword"
      :placeholder="`Search Keyword`"
    />
  </section>
  <!-- Todo 一覧表示エリア -->
  <section class="common">
    <TodoList
      :todo-list="showTodoList"
      @on-delete-todo="handleDeleteTodo"
    />
  </section>
</template>

<style scoped>
.container {
  width: 50%;
  margin: 80px auto;
}

.title {
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
  color: #fff;
  font-size: 48px;
}

.common {
  width: 80%;
  margin: 40px auto;
}
</style>
