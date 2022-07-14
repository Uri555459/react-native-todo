import { useState } from 'react'
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { THEME } from '../../theme'

export const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      addTodo(value.trim())
      setValue('')
      Keyboard.dismiss()
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
      <AntDesign.Button name='pluscircleo' onPress={pressHandler}>
        Добавить
      </AntDesign.Button>
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
    width: '60%',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  button: {},
})
