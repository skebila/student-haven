/**@author Steven Kebila
*
*/
import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { Ionicons } from 'react-native-vector-icons';


const Post = ({user, post, navigation}) => {
  return (
      <View>
          <Divider style={{ marginBottom: 5, opacity: .3 }} />
          <View>
              <PostBody user={user}  post={post} navigation={navigation} />
          </View>
    </View>
  )
}

const PostBody = ({user, post, navigation}) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 5,
            paddingBottom: 10,
            alignItems: 'flex-start',
    }}>

        <Image //post profile image
            source={{ uri: user.profile_picture }} style={styles.postHeaderImage} />

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

const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, index) =>(
            <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color:'white'}}>
                    <Text style={{fontWeight: '600'}}>{comment.user}</Text> {comment.comment}
                </Text>
            </View>
        ))}
    </>
)


const Topics = ({ post, navigation }) => {
    return (

    <View style={{ marginBottom: 10, flexDirection:'row' }}>
            <Text style={{ opacity: .7, color: 'white', fontWeight: '900' }}>Topic: </Text>
            <TouchableOpacity
                onPress={() => navigation.push(post.topic + 'PostScreen')}
            >
            <Text
                style={{
                    color: '#6BB0F5',
                    fontWeight: '700',
                    textDecorationLine: 'underline'
                }}
            >{post.topic}</Text>
        </TouchableOpacity>
    </View>

)}

const styles = StyleSheet.create({ //styles
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



export default Post
