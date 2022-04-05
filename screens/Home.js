import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { POSTS } from '../data/posts'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header LeftIconName= "menu" RightIconName="ios-person-sharp" title="Haven Hub" PostIcon='squared-plus'/>
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} /> 
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    }
})

export default Home