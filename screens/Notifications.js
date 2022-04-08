import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import BottomTabs from '../components/home/BottomTabs'

const Notifications = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BottomTabs navigation={navigation}/>
        </SafeAreaView>
  )
}

const Header = () => {
  return (
      <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
          textAlign: 'center',
        }}>Notifications</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
    flex: 1,
  },
  headerContainer: {
      marginHorizontal: 0,
      color: 'white',
      marginTop: 10,
      padding: 10,
    },
})

export default Notifications