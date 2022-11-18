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

const ExpandedPost = ( props ) => {

  const [postId, setPostId] = useState([])
  const [post, setPost] = useState([])
  //sets the post that has been created by the user, orders them by time created in descending order
  useEffect(() => {
    if (props.route.params.postId !== postId) {
      db.collection('users')
        .doc(props.route.params.uid)
        .collection('posts')
        .doc(props.route.params.postId)
        .onSnapshot(snapshot => {
          setPost(snapshot.data()) 
        })
      
     
      setPostId(props.route.params.postId)
      }
      
    }, [props.route.params.postId]
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 70}}>
        <Text style={{color:'white'}}>{ post.caption }</Text>
      </View>
    </SafeAreaView>
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
  postHeaderImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 6,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
    footerIcon: {
        marginRight: 5,
        width: 25,
        height: 25,
    },
    footerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        alignItems: 'center'
    },
    shareIcon: {
        fontSize: 25,
        color: 'white',
        marginRight: 15,
        transform: [{rotate: '90deg'}]
    }
})

export default ExpandedPost