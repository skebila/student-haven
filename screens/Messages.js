import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import BottomTabs from '../components/home/BottomTabs'

const Messages = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BottomTabs navigation={navigation}/>
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

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    }
})

export default Messages