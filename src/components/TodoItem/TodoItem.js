import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const TodoItem = ({ todo: { id, title }, removeTodo }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={removeTodo.bind(null, id)}
    >
      <View style={styles.todo}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
})
