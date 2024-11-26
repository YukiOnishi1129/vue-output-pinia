import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from '../constants/data'

export const useTodoStore = defineStore('todo', () => {
  // 初期値を設定
  const initialState = () => ({
    originTodoList: [...INIT_TODO_LIST], // 配列をコピー
    addInputValue: '',
    uniqueId: INIT_UNIQUE_ID,
    searchKeyword: ''
  })

  const state = ref(initialState())

  const showTodoList = computed(() => {
    return state.value.originTodoList.filter((todo) => {
      const regexp = new RegExp('^' + state.value.searchKeyword, 'i')
      return todo.title.match(regexp)
    })
  })

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && state.value.addInputValue.trim() !== '') {
      const nextUniqueId = state.value.uniqueId + 1
      state.value.originTodoList.push({
        id: nextUniqueId,
        title: state.value.addInputValue.trim()
      })
      state.value.uniqueId = nextUniqueId
      state.value.addInputValue = ''
    }
  }

  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」を削除しますか？`)) {
      const newTodoList = state.value.originTodoList.filter((todo) => {
        return todo.id !== targetId
      })
      state.value.originTodoList = newTodoList
    }
  }

  // ストアの状態をリセットする関数
  const resetStore = () => {
    state.value = initialState() // 初期状態に戻す
  }

  return {
    showTodoList,
    state,
    handleAddTodo,
    handleDeleteTodo,
    resetStore
  }
})
