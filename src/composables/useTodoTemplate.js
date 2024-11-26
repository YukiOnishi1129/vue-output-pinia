import { ref, computed } from 'vue'
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from '../constants/data'

export const useTodoTemplate = () => {
  const originTodoList = ref(INIT_TODO_LIST)
  const addInputValue = ref('')
  const uniqueId = ref(INIT_UNIQUE_ID)
  const searchKeyword = ref('')

  // 表示用のTodoリストを返す算出プロパティ
  const showTodoList = computed(() => {
    return originTodoList.value.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
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

      // 採番IDを更新
      uniqueId.value = nextUniqueId
      // todo追加後、入力値をリセット
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
}
