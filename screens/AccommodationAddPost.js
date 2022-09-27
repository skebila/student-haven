import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/Accommodation_newPost/AddNewPost'

const AccommodationAddPost = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default AccommodationAddPost