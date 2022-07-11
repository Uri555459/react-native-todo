import { View, StyleSheet, SafeAreaView } from 'react-native'
import { AppTextBold } from '../ui/AppTextBold'
import { THEME } from '../../theme'

export const Navbar = ({ title }) => {
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <AppTextBold style={styles.text}>{title}</AppTextBold>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})
