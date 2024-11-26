<script setup>
const { todoList } = defineProps({
  todoList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['onDeleteTodo'])

const handleDeleteClick = (targetId, targetTitle) => {
  emit('onDeleteTodo', targetId, targetTitle)
}
</script>

<template>
  <ul class="list">
    <li
      v-for="(todo, index) in todoList"
      :key="index"
      class="todo"
    >
      <span class="task">{{ todo.title }}</span>
      <font-awesome-icon
        class="far"
        icon="fa-trash"
        @click="handleDeleteClick(todo.id, todo.title)"
      />
    </li>
  </ul>
</template>

<style scoped>
.list {
  padding: 0;
}

.todo {
  position: relative;
  margin-bottom: 10px;
  list-style: none;
  line-height: 1.5;
  font-weight: bold;
  background-color: rgba(3, 80, 63, 0.5);
  border-radius: 5px;
  padding: 10px;
  height: 50px;
}

.task {
  cursor: pointer;
  display: block;
  padding-top: 8px;
  padding-left: 10px;
  font-size: 24px;
  font-family: 'Times New Roman', Times, serif;
  color: #fff;
}

.far {
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 10px;
  width: 30px;
  height: 30px;
  color: #ff9900;
}
</style>
