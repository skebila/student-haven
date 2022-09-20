import { View, Text, SafeAreaView } from 'react-native'
import BottomTabs from '../components/home/BottomTabs'
import React from 'react'

const AccommodationPost = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BottomTabs navigation={navigation}/>
        </SafeAreaView>
  )
}

export default AccommodationPost