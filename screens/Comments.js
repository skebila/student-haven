import { View, Text, FlatList, Button, TextInput, StyleSheet, SafeAreaView } from 'react-native'
import { React, useState, useEffect } from 'react'
import {firebase, db} from '../firebase'
import { color } from 'react-native-reanimated'

const Comments = (props, navigation) => {
  const [comments, setComments] = useState([])
  const [postId, setPostId] = useState("")
  const [text, setText] = useState("")
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  const getUsername = () => {
      const user = firebase.auth().currentUser 
      const unsubscribe = db
        .collection('users')
        .where('owner_uid', '==', user.uid)  //how to use where statement
        .limit(1)
        .onSnapshot(snapshot =>
          snapshot.docs.map(doc => {
            setCurrentLoggedInUser({
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            })
          }))
      return unsubscribe
    }

  useEffect(() => {
    getUsername()

    if (props.route.params.postId !== postId) {
      
      db.collection('users')
        .doc(props.route.params.uid)
        .collection('posts')
        .doc(props.route.params.postId)
        .collection('comments')
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data}
          })
          setComments(comments)
      })
      setPostId(props.route.params.postId)
    }
    
  },[props.route.params.postId])

  const onCommentSend = () => {
    db.collection('users')
      .doc(props.route.params.uid)
      .collection('posts')
      .doc(props.route.params.postId)
      .collection('comments')
      .add({
        creator: firebase.auth().currentUser.uid,
        username: currentLoggedInUser.username,
        text
      })
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: 'white', color: '#F24A72', opacity: 0.8, fontWeight:'900', marginBottom: 5  }}>@{item.username}</Text>
            <Text style={{ color: 'white' }}>{item.text}</Text>
          </View>
        )}
      />

      <View>
        <TextInput
          style={{color:'white', fontSize:14, fontWeight: '500',}}
          placeholder='comment here'
          placeholderTextColor='gray'
          onChangeText={(text) => setText(text)}
        />

        <Button
          onPress={() => {
            onCommentSend()
            //navigation.goBack()
           }}
          title="Comment"
        />
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

export default Comments