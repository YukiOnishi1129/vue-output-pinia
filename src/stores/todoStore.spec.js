import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from './todoStore'
import { INIT_TODO_LIST } from '../constants/data'
import { expect } from 'vitest'

describe('useTodoStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia()) // 新しいPiniaインスタンスを作成
    store = useTodoStore() // 各テストごとに新しいストアを作成
  })

  afterEach(() => {
    store.resetStore() // ストアの状態を初期化
  })

  it('初期状態を確認する', () => {
    expect(store.state.originTodoList).toStrictEqual(INIT_TODO_LIST)
    expect(store.showTodoList.length).toBe(2)
    expect(store.state.addInputValue).toBe('')
    expect(store.state.searchKeyword).toBe('')
  })

  it('Todoを追加する', () => {
    store.state.addInputValue = '新しいTodo'
    store.handleAddTodo({ key: 'Enter' })

    expect(store.state.originTodoList.length).toBe(3)
    expect(store.state.originTodoList[2].title).toBe('新しいTodo')
    expect(store.showTodoList.length).toBe(3)
    expect(store.showTodoList[2].title).toBe('新しいTodo')
    expect(store.state.addInputValue).toBe('')
  })

  it('Todoを削除する', () => {
    // window.confirmをモック化
    const originalConfirm = window.confirm
    window.confirm = () => true

    store.state.addInputValue = '削除するTodo'
    store.handleAddTodo({ key: 'Enter' })

    expect(store.state.originTodoList.length).toBe(3)
    expect(store.showTodoList.length).toBe(3)

    const todoId = store.state.originTodoList[2].id
    store.handleDeleteTodo(todoId, '削除するTodo')

    expect(store.state.originTodoList.length).toBe(2)
    expect(store.showTodoList.length).toBe(2)
    // モックを元に戻す
    window.confirm = originalConfirm
  })

  it('検索機能を確認する', () => {
    store.state.addInputValue = '検索するTodo'
    store.handleAddTodo({ key: 'Enter' })

    store.state.searchKeyword = '検索'
    const filteredTodos = store.showTodoList

    expect(filteredTodos.length).toBe(1)
    expect(filteredTodos[0].title).toBe('検索するTodo')
  })
})
