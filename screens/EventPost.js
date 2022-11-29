/**@author Steven Kebila
*
*/
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements/dist/divider/Divider'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase';


const EventPost = ({navigation}) => {
    const [posts, setPosts] = useState([])
    
  //sets the post that has been created by the user
    useEffect(() => {
      db.collectionGroup('posts')
          .where('topic', '==', 'Events')
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() }))) 
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
      <Text style={styles.headerText}>Events</Text>
      <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={()=> navigation.push('EventsAddPostScreen')}
        >
            <Entypo name='squared-plus' style={styles.icon} />
          </TouchableOpacity>
    </View>
  )
}

const PostBody = ({ post, navigation }) => {
    const handleLike = () => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentLikeStatus
                    ? firebase.firestore.FieldValue.arrayUnion(
                        firebase.auth().currentUser.email
                    )
                    : firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    ),
            }).then(() => {
                console.log('Like works')
            })
            .catch(error => {
                console.error('Error updating likes: ', error)
            })
    }
    return (
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

                <View style={{ flexDirection: 'column', width: '80%', marginRight: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("UserProfileScreen", { username: post.user })}
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

                        <TouchableOpacity onPress={() => navigation.navigate("ExpandedPostScreen", { postId: post.id, uid: post.owner_email })}>
                            <Text //post menu button
                                style={{ color: 'white', fontWeight: '900', margin: 10, marginBottom: 0, }}>...
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Topics //Topics (Clickable)
                        post={post} navigation={navigation} />
                    <PostImage //post image
                        post={post}
                    />
                    <PostFooter //post footer
                        post={post} handleLike={handleLike} navigation={navigation}
                    />
                </View>
            </View>
        </>
    
    )
}

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/student-haven-257b5.appspot.com/o/assets%2Fheart_white.png?alt=media&token=8ea07fce-a4c8-474a-b7c9-bd1fc6944f22',
        likedImageUrl: 'https://cdn0.iconfinder.com/data/icons/twitter-24/512/166_Heart_Love_Like_Twitter-512.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/student-haven-257b5.appspot.com/o/assets%2Fcomment_white.png?alt=media&token=b0c469bf-80ac-4cb9-b947-23183cae158d',
    },
    {
        name: 'Message',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/student-haven-257b5.appspot.com/o/assets%2Fmessage_icon.png?alt=media&token=8e2bc7f1-93e7-4c5c-bc1d-1447dfd50bba',
    }
]

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

const PostFooter = ({ handleLike, post, navigation }) => {
    //sets the user profile
    const [user, setUser] = useState([])
    //sets the number of post that has been created by the user
    useEffect(() => {
        // fetching user data from firebase
        db.collection('users')
            .where('email', '==', post.owner_email)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setUser(doc.data())
                })
            })
    }, [])

    return (
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
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View //Icons (Like, Comment, Share)
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => handleLike(post)}
                        style={styles.footerIconContainer}>
                        <Image
                            style={styles.footerIcon}
                            source={{
                                uri: post.likes_by_users.includes(firebase.auth().currentUser.email
                                ) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl
                            }}
                        />
                        <Likes //likes count
                            post={post} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("CommentsScreen", {postId: post.id, uid: post.owner_email})}
                        style={styles.footerIconContainer}>
                        <Image
                            style={styles.footerIcon}
                            source={{
                                uri: postFooterIcons[1].imageUrl
                            }}
                        />
                        <CommentsCount
                            post={post} />
                    </TouchableOpacity>
                </View>
                <View //Icons (Like, Comment, Share)
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MessengerScreen", { email: user.email })}>
                        <Image
                            style={styles.footerIcon}
                            source={{
                                uri: postFooterIcons[2].imageUrl
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Likes = ({ post }) => ( //likes per post
    <Text style={{ color: 'white', fontSize: 11 }}>
        {post.likes_by_users.length.toLocaleString('en') != 1 ? post.likes_by_users.length.toLocaleString('en') + ' Likes' : post.likes_by_users.length.toLocaleString('en') + ' Like'}
    </Text>
)

const CommentsCount = ({ post }) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        // fetching user data from firebase
        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
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
    },[])

    return (
        //post count per post
        <Text style={{ color: 'white', fontSize: 11 }}>

            {comments.length.toLocaleString('en') != 1 ? comments.length.toLocaleString('en') + ' Comments' : comments.length.toLocaleString('en') + ' Comment'}
        </Text>
    )
}

const Topics = ({ post }) => {
    return (

    <View style={{ marginBottom: 10, flexDirection:'row' }}>
            <Text style={{ opacity: .7, color: 'white', fontWeight: '700', fontSize: 10 }}>{post.topic} </Text>
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

export default EventPost