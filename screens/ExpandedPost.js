/**@author Steven Kebila
*
*/
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'

const ExpandedPost = ( props ) => {


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Divider style={{ marginBottom: 5, opacity: .3 }} />
      <Body props={props} />
    </SafeAreaView>
  )
}


const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View></View>
      <Text style={styles.headerText}>More Details</Text>
      <View></View>
    </View>
  )
}

const Body = ({ props }) => {
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

  //Render accommodation details
  if (post.topic == 'Accommodation') {
    return (
      <ScrollView style={{ padding: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', marginBottom: 20, fontSize: 16 }}><Text style={{ color: '#F24A72', fontWeight: '700' }}>@{post.user}</Text></Text>
        
        <Image //post image
          source={{ uri: post.imageUrl }}
          style={{
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
            marginBottom: 30
          }}
        />

        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Description: </Text>{post.caption}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Address: </Text>{post.address}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Number of people: </Text>{post.no_of_people}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Number of rooms: </Text>{post.no_of_rooms}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Date to move in: </Text>{post.date_move_in}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Gender: </Text>{post.gender}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Status: </Text>{post.status_required}</Text>
          
      </ScrollView>
    )
  }

  //Render events details
  if (post.topic == 'Events') {
    return (
      <ScrollView style={{ padding: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', marginBottom: 20, fontSize: 16 }}><Text style={{ color: '#F24A72', fontWeight: '700' }}>@{post.user}</Text></Text>
        
        <Image //post image
          source={{ uri: post.imageUrl }}
          style={{
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
            marginBottom: 30
          }}
        />

        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Event name: </Text>{post.event_name}</Text>

        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Description: </Text>{post.caption}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Address: </Text>{post.address}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Date: </Text>{post.event_date}</Text>
          
        <Text style={{ color: 'white', marginBottom: 10, fontSize: 14 }}><Text style={{ color: '#30AADD', fontWeight: '700' }}>Ticket Price: </Text>{post.ticket_price}</Text>
          
      </ScrollView>
    )
  }
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