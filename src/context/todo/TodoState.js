import { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

import { Http } from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title) => {
    clearError()
    try {
      const data = Http.post(
        'https://rn-todo-app-5f22c-default-rtdb.firebaseio.com/todos.json',
        { title }
      )

      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (error) {
      showError('Что-то пошло не так...')
    }
  }

  const removeTodo = (id) => {
    const todo = state.todos.find((todo) => todo.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: async () => {
            changeScreen(null)
            await Http.delete(
              `https://rn-todo-app-5f22c-default-rtdb.firebaseio.com/todos/${id}.json`
            )

            dispatch({ type: REMOVE_TODO, id })
          },
        },
      ],
      { cancelable: false }
    )
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await Http.patch(
        `https://rn-todo-app-5f22c-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title }
      )
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (error) {
      showError('Что-то пошло не так...')
      console.log(error)
    }
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get(
        'https://rn-todo-app-5f22c-default-rtdb.firebaseio.com/todos.json'
      )

      if (data === null) {
        return
      }

      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (error) {
      showError('Что-то пошло не так...')
      console.log(error)
    } finally {
      hideLoader()
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = (error) => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
