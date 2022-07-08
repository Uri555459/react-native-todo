import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Navbar } from './src/components/Navbar/Navbar'
import { AddTodo } from './src/components/AddTodo/AddTodo'
import { TodoItem } from './src/components/TodoItem/TodoItem'

export default function App() {
  const [todos, setTodos] = useState([])

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
    setTodos((prev) => prev.filter((todo) => todo.id != id))
  }

  return (
    <View>
      <StatusBar style='auto' />
      <Navbar title='Todo App' />
      <View style={styles.container}>
        <AddTodo addTodo={addTodo} />

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem removeTodo={removeTodo} todo={item} />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
})
