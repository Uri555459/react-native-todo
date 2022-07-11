import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { Navbar } from './src/components/Navbar/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])
  const [loaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  })

  if (!loaded) {
    return null
  }

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ])
  }

  const removeTodo = (id) => {
    const { title } = todos.find((todo) => todo.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((todo) => todo.id != id))
          },
        },
      ],
      { cancelable: false }
    )
  }

  const openTodo = (id) => {
    setTodoId(id)
  }

  const goBack = () => {
    setTodoId(null)
  }

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title
        }

        return todo
      })
    )
  }

  let content = (
    <MainScreen
      addTodo={addTodo}
      removeTodo={removeTodo}
      todos={todos}
      openTodo={openTodo}
    />
  )

  if (todoId) {
    const todo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen
        todo={todo}
        goBack={goBack}
        removeTodo={removeTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <StatusBar style='auto' />
      <Navbar title='Todo App' />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
})
