import { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { EditModal } from '../components/EditModal/EditModal'
import { AppCard } from '../components/ui/AppCard'
import { AppTextBold } from '../components/ui/AppTextBold'
import { THEME } from '../theme'

export const TodoScreen = ({
  todo: { id, title },
  goBack,
  removeTodo,
  onSave,
}) => {
  const [modal, setModal] = useState(false)

  const saveHandler = (title) => {
    onSave(id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        value={title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{title}</AppTextBold>
        <Button title='Редактировать' onPress={() => setModal(true)} />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='Назад' color={THEME.GRAY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title='Удалить'
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(id)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
})
