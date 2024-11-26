import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoTemplate } from './useTodoTemplate'

describe('useTodoTemplate', () => {
  let todoTemplate

  beforeEach(() => {
    todoTemplate = useTodoTemplate()
  })

  describe('showTodoList', () => {
    it('検索キーワードが空の場合、全てのTodoを返す', () => {
      todoTemplate.searchKeyword.value = ''
      expect(todoTemplate.showTodoList.value.length).toBe(2) // INIT_TODO_LISTの初期値による
    })

    it('検索キーワードに一致するTodoのみを返す', () => {
      todoTemplate.searchKeyword.value = 'Todo1'
      expect(todoTemplate.showTodoList.value.length).toBe(1)
      expect(todoTemplate.showTodoList.value[0].title).toContain('Todo1')
    })
  })

  describe('handleAddTodo', () => {
    it('Enterキーで新しいTodoを追加できる', () => {
      todoTemplate.addInputValue.value = '新しいタスク'
      todoTemplate.handleAddTodo({ key: 'Enter' })

      const lastTodo = todoTemplate.showTodoList.value[todoTemplate.showTodoList.value.length - 1]
      expect(lastTodo.title).toBe('新しいタスク')
      expect(todoTemplate.addInputValue.value).toBe('') // 入力値がリセットされる
    })

    it('空文字の場合は追加されない', () => {
      const initialLength = todoTemplate.showTodoList.value.length
      todoTemplate.addInputValue.value = '   '
      todoTemplate.handleAddTodo({ key: 'Enter' })

      expect(todoTemplate.showTodoList.value.length).toBe(initialLength)
    })
  })

  describe('handleDeleteTodo', () => {
    it('確認後にTodoを削除できる', () => {
      // window.confirmをモック化
      const originalConfirm = window.confirm
      window.confirm = () => true

      const initialLength = todoTemplate.showTodoList.value.length
      const targetTodo = todoTemplate.showTodoList.value[0]

      todoTemplate.handleDeleteTodo(targetTodo.id, targetTodo.title)
      expect(todoTemplate.showTodoList.value.length).toBe(initialLength - 1)

      // モックを元に戻す
      window.confirm = originalConfirm
    })

    it('確認をキャンセルした場合、Todoは削除されない', () => {
      // window.confirmをモック化
      const originalConfirm = window.confirm
      window.confirm = () => false

      const initialLength = todoTemplate.showTodoList.value.length
      const targetTodo = todoTemplate.showTodoList.value[0]

      todoTemplate.handleDeleteTodo(targetTodo.id, targetTodo.title)
      expect(todoTemplate.showTodoList.value.length).toBe(initialLength)

      // モックを元に戻す
      window.confirm = originalConfirm
    })
  })
})
