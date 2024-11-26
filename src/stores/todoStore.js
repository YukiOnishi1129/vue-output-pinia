import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from '../constants/data'

export const useTodoStore = defineStore('todo', () => {
  const originTodoList = ref(INIT_TODO_LIST)
  const addInputValue = ref('')
  const uniqueId = ref(INIT_UNIQUE_ID)
  const searchKeyword = ref('')

  const showTodoList = computed(() => {
    return originTodoList.value.filter((todo) => {
      const regexp = new RegExp('^' + searchKeyword.value, 'i')
      return todo.title.match(regexp)
    })
  })

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && addInputValue.value.trim() !== '') {
      const nextUniqueId = uniqueId.value + 1
      originTodoList.value.push({
        id: nextUniqueId,
        title: addInputValue.value.trim()
      })
      uniqueId.value = nextUniqueId
      addInputValue.value = ''
    }
  }

  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」を削除しますか？`)) {
      const newTodoList = originTodoList.value.filter((todo) => {
        return todo.id !== targetId
      })
      originTodoList.value = newTodoList
    }
  }

  return {
    showTodoList,
    addInputValue,
    searchKeyword,
    handleAddTodo,
    handleDeleteTodo
  }
})
