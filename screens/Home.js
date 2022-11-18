/**@author Steven Kebila
*
*/
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])
  //sets the post that has been created by the user, orders them by time created in descending order
  useEffect(() => {
    db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .onSnapshot(snapshot => {
          setUser(snapshot.data())
     })
    db.collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() }))) 
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView style={{marginBottom: 70}}>
        {posts.map((post, index) => ( //gets the post, maps it and displays it on the app UI
          <Post user={user} post={post} key={index} navigation={navigation} /> 
          
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