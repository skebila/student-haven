
/**@author Steven Kebila
*
*/
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements/dist/divider/Divider'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase';


const ExpandedPost = ({navigation}) => {
    const [posts, setPosts] = useState([])
    
  //sets the post that has been created by the user
    useEffect(() => {
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
        
      </ScrollView>
        </SafeAreaView>
  )
}

const Header = ({ navigation, route }) => {
      //const currentPost = post.route.params.uid

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
  postHeaderImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 6,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
    footerIcon: {
        fontSize: 25,
        color: 'white',
        marginRight: 5,
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