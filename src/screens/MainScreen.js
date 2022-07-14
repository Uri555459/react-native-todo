import { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo/AddTodo'
import { TodoItem } from '../components/TodoItem/TodoItem'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setDeviceWidth(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      )
    })

    return () => subscription?.remove()
  }, [])

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem removeTodo={removeTodo} todo={item} openTodo={openTodo} />
        )}
      />
    </View>
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/images/no-items.png')}
        />
      </View>
    )
  }

  return (
    <View>
      <AddTodo addTodo={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})
