/**@author Steven Kebila
*
*/

import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import SearchTopic from '../components/topics/SearchTopic'
import { Divider } from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs'
import TopicList from '../components/topics/TopicList'

const Topics = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchTopic />
      <TopicList navigation={navigation}/>
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
      height:'100%',
      //flex: 1,
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