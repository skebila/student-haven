import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'

const Profile = ({ navigation, post }) => {
  const [posts, setPosts] = useState([])
  const user = firebase.auth().currentUser
  //sets the post that has been created by the user
  useEffect(() => {
    db
      .collection('users')
      .doc(firebase.auth().currentUser.email) 
      .collection('posts')
      .where('owner_uid', '==', user.uid)
      .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data())) 
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {posts.map((post, index) => ( //gets the post, maps it and displays it on the app UI
          <Post post={post} key={index} /> 
        ))}
      </ScrollView>
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
        }}>Profile</Text>
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

export default Profile