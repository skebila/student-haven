import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import SearchTopic from '../components/topics/SearchTopic'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'

const Topics = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchTopic />
      <BottomTabs navigation={navigation} />
        </SafeAreaView>
  )
}

const Header = () => {
  return (
      <View style={styles.headerContainer}>
      <Text
        style={styles.headerText}
      >Topics</Text>
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
    headerText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '900',
      marginRight: 23,
      textAlign: 'center',
        
    }
})

export default Topics