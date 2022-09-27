import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/Events_newPost/AddNewPost'

const EventAddPost = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default EventAddPost