import { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { EditModal } from '../components/EditModal/EditModal'
import { AppCard } from '../components/ui/AppCard'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'
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
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GRAY_COLOR} onPress={goBack}>
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(id)}>
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
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
    // width: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width > 400 ? 150 : 100,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
})
