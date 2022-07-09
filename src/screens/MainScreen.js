import { StyleSheet, View, FlatList, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo/AddTodo'
import { TodoItem } from '../components/TodoItem/TodoItem'

export const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  let content = (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem removeTodo={removeTodo} todo={item} openTodo={openTodo} />
      )}
    />
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
