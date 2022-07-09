import { useState } from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { THEME } from '../../theme'

export const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      addTodo(value.trim())
      setValue('')
    } else {
      Alert.alert('Введите текст задачи')
      setValue('')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={setValue}
        placeholder='Введите задачу...'
        autoCorrect={false}
      />
      <Button title='Добавить' style={styles.button} onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  button: {},
})
