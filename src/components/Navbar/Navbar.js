import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

export const Navbar = ({ title }) => {
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3949ab',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})
