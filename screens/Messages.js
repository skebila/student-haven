import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import React from 'react'
import BottomTabs from '../components/home/BottomTabs'

const Messages = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <NoMessage />
      <BottomTabs navigation={navigation} />
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
          textAlign: 'center'
        }}>Messages</Text>
    </View>
  )
}

//Usman when the user opens the Message first time after they sign up
const NoMessage = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
          textAlign: 'center'
        }}>You do not have any messages yet</Text>
      <View style={{ marginHorizontal: '10%' }}>
        <Button title="Send Message to Someone" onPress={() => navigation.push('')} />
      </View>

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