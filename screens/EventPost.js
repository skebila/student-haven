import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import BottomTabs from '../components/home/BottomTabs'
import { Ionicons } from 'react-native-vector-icons';
import Post from '../components/home/Post';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from '../firebase';


const EventPost = ({navigation}) => {
  const [posts, setPosts] = useState([])

  //sets the post that has been created by the user
  useEffect(() => {
    db.collectionGroup('posts').where('topic', '==', 'Events').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data())) 
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {posts.map((post, index) => ( //gets the post, maps it and displays it on the app UI
          <Post post={post} key={index} navigation={navigation}/> 
        ))}
      </ScrollView>
        </SafeAreaView>
  )
}

const Header = ({navigation}) => {
  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name='chevron-back-outline' style={styles.icon} />
        </TouchableOpacity>
      <Text style={styles.headerText}>Events</Text>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
  },
  headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 0,
      color: 'white',
      marginTop: 10,
      padding: 10,
    },
  icon: {
      color: 'white',
      fontSize: 30
  },
  headerText: {
      fontSize: 16,
      color: 'white',
      fontWeight: "900",
      marginRight: 23
      
    }
})

export default EventPost