import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

const Messages = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
        </SafeAreaView>
  )
}

const Header = () => {
  return (
      <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
        }}>Messages</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    }
})

export default Messages