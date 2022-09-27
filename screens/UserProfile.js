import {Button, View, Text, SafeAreaView, StyleSheet, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'


// Mona G
const UserProfile = ({ navigation, route }) => {
    const { username } = route.params;
    //sets the user profile
    const [user, setUser] = useState([])
    //sets the number of post that has been created by the user
    useEffect(() => {
        // fetching user data from firebase
        db.collection('users')
            .where('username', '==', username)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    setUser(doc.data())
                })
            })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <ProfileBody
                    user={user}
                />
                <View style={{marginHorizontal: '10%'}}>
                    <Button title="Send a Message"
                            // onPress={() => navigation.push('MessengerScreen')}
                    />
                </View>
            </ScrollView>
            <BottomTabs navigation={navigation}/>
        </SafeAreaView>
    )
}
// Header
const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: "900",
                    textAlign: 'center',
                }}>User Profile</Text>
        </View>
    )
}

// profile body
const ProfileBody = ({user}) => {
    const [posts, setPosts] = useState([])
    {console.log(user.owner_uid)}
    useEffect(() => {
        // fetching user data from firebase
        // db.collection('posts')
        //     .where('user', '==', user.username)
        //     .get()
        //     .then(snapshot => {
        //         snapshot.forEach(doc => {
        //             console.log(doc.data())
        //             // setPosts(doc.data())
        //         })
        //     })
        // db.collectionGroup('posts')
        //     .where('owner_uid', '==', user.owner_uid)
        //     .orderBy("createdAt")
        //     .onSnapshot(snapshot => {
        //         console.log(snapshot.docs.map(doc => doc.data()))
        //         setPosts(snapshot.docs.map(doc => doc.data()))
        //     })
    }, [])

    return (

        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                paddingBottom: 10,
                alignItems: 'flex-start',
            }}>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: 5,
                    paddingBottom: 10,
                    alignItems: 'flex-start',
                }}>

                <Image // profile image
                    source={{uri: user.profile_picture}} style={styles.postHeaderImage}/>
                <View style={{flexDirection: 'column', width: '100%', alignItems: 'center', marginLeft: '15%'}}>
                    <Text style={styles.heading}>
                        {user.username}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    width: '60%',
                    justifyContent: 'space-evenly',
                    marginRight: '25%',
                    marginTop: '15%'
                }}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.number}>{posts.length}</Text>
                    <Text style={styles.heading}>Posts</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.number}>0</Text>
                    <Text style={styles.heading}>Follower</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.number}>0</Text>
                    <Text style={styles.heading}>Following</Text>
                </View>
            </View>
        </View>
    )
}
// styles for components
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    headerContainer: {
        marginHorizontal: 0,
        color: 'white',
        marginTop: 30,
        padding: 10,
    },
    heading:{
        color: 'white',
        margin: 10,
        marginBottom: 0,
        marginLeft: 0,
        fontWeight: 'bold'
    },
    number:{
        color: 'white',
        margin: 10,
        marginBottom: 0,
        marginLeft: 0,
        textAlign:'center',
        fontSize: 25,
        fontWeight: 'bold'
    },
    postHeaderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 30,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
})

export default UserProfile
