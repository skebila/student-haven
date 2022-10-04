/**@author Steven Kebila
*
*/

import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements/dist/divider/Divider'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase';


const AccommodationPost = ({ navigation }) => {
  const [posts, setPosts] = useState([])

  //sets the post that has been created by the user
    useEffect(() => {
      db.collectionGroup('posts')
          .where('topic', '==', 'Accommodation')
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
            <PostBody post={post} key={index} navigation={navigation}/> 
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
        
      <Text style={styles.headerText}>Accommodation</Text>
      

      <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={()=> navigation.push('AccommodationAddPostScreen')}
        >
            <Entypo name='squared-plus' style={styles.icon} />
          </TouchableOpacity>
    </View>
  )
}

const PostBody = ({post, navigation}) => (
    <>
        <Divider style={{ marginBottom: 5, opacity: .3 }} />
        <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 5,
            paddingBottom: 10,
            alignItems: 'flex-start',
    }}>
        <Image //post profile image
            source={{ uri: post.profile_picture }} style={styles.postHeaderImage} />

        <View style={{ flexDirection: 'column', width: '80%', marginRight: 10}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("UserProfileScreen", {username: post.user})}
                >
                    <Text //user name
                        style={{
                            color: 'white',
                            margin: 10,
                            marginBottom: 0,
                            marginLeft: 0,
                            fontWeight: '900',
                        }}>
                        {post.user}
                    </Text>
                </TouchableOpacity>

                <Text //post menu button
                    style={{ color: 'white', fontWeight: '900', margin: 10, marginBottom: 0, }}>...</Text>
            </View>
            <Topics //Topics (Clickable)
                post={post} navigation={navigation} />
            <PostImage //post image
                post={post}
            />
            <PostFooter //post footer
                post={post}
            />
        </View>
    </View>
    </>
)

const PostImage = ({ post }) => (
    <View
    style={{
            width: '100%',
            height: 350,
            marginBottom: 10,
        }}>
        <Image //post image
        source={{ uri: post.imageUrl }}
        style={{
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
        }}
    />
    </View>
)

const PostFooter = ({ post }) => (
    <View>
        <Text //caption
            style={{
            color: 'white',
            marginBottom: 5,
            fontWeight: '500',
            marginTop: 4,
            }}>
            {post.caption}
        </Text>
        <View //Icons (Like, Comment, Share)
            style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                <View //Icons (Like, Comment, Share)
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.footerIconContainer}>
                        <Ionicons name='heart-outline' style={styles.footerIcon} />
                        <Likes //likes count
                            post={post} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerIconContainer}>
                        <Ionicons name='chatbox-outline' style={styles.footerIcon} />
                        <CommentsCount
                            post={post} />
                    </TouchableOpacity>
                </View>
                    <View //Icons (Like, Comment, Share)
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Ionicons name='share-outline' style={styles.shareIcon} />
                    </TouchableOpacity>
                </View>
            </View>
    </View>
)

const Likes = ({ post }) => ( //likes per post
    <Text style={{ color: 'white', fontSize: 11 }}>
        {post.likes.toLocaleString('en') != 1 ? post.likes.toLocaleString('en') + ' Likes' : post.likes.toLocaleString('en') + ' Like'}
    </Text>
)

const CommentsCount = ({ post }) => ( //post count per post

    <Text style={{ color: 'white', fontSize: 11 }}>

        {post.comments.length.toLocaleString('en') != 1 ? post.comments.length.toLocaleString('en') + ' Comments' : post.comments.length.toLocaleString('en') + ' Comment'}
    </Text>
)

const Topics = ({ post, navigation }) => {
    return (

    <View style={{ marginBottom: 10, flexDirection:'row' }}>
            <Text style={{ opacity: .7, color: 'white', fontWeight: '900' }}>{post.topic}: </Text>
            <TouchableOpacity
                //onPress={() => navigation.push(post.topic + 'PostScreen')}
            >
            <Text
                style={{
                    color: '#6BB0F5',
                    fontWeight: '700',
                    textDecorationLine: 'underline'
                }}
            >View more</Text>
        </TouchableOpacity>
    </View>

)}

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

export default AccommodationPost