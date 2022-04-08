import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { POSTS } from '../data/posts'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([])

  //sets the post that has been created by the user
  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data())) 
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView>
        {posts.map((post, index) => ( //gets the post, maps it and displays it on the app UI
          <Post post={post} key={index} /> 
        ))}
      </ScrollView>
      <BottomTabs navigation={navigation}/>
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