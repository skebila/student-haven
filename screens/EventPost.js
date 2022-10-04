/**@author Steven Kebila
*
*/


import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements/dist/divider/Divider'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase';
import Post from '../components/home/Post'


/**
 * Updated by Mona G. Logic was wrong
 *
 */
const EventPost = ({navigation}) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])

  //sets the post that has been created by the user
    useEffect(() => {
      db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .onSnapshot(snapshot => {
          setUser(snapshot.data())
     })
      db.collectionGroup('posts')
          .where('topic', '==', 'Events')
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={{marginBottom: 10}}>
        {posts.map((post, index) => ( //gets the post, maps it and displays it on the app UI
          <Post user={user} post={post} key={index} navigation={navigation}/>
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
      <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={()=> navigation.push('EventAddPostScreen')}
        >
            <Entypo name='squared-plus' style={styles.icon} />
          </TouchableOpacity>
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

    },
})

export default EventPost
