import {Button, View, Text, SafeAreaView, StyleSheet, Image, TextInput, Switch, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import BottomTabs from '../components/home/BottomTabs'
import {Divider} from "react-native-elements/dist/divider/Divider";


// Mona G
const Profile = ({ navigation }) => {
    //sets the user profile
    const [user, setUser] = useState([])
    //sets the number of post that has been created by the user
    const [post, setPosts] = useState([])
    useEffect(() => {
      // fetching user data from firebase
    db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .onSnapshot(snapshot => {
          setUser(snapshot.data());
          console.log(user.follow)
     })
      db.collectionGroup('posts')
          .where('owner_uid', '==', firebase.auth().currentUser.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot(snapshot => {
              setPosts(snapshot.docs.map(doc => doc.data()))
          })
    }, [])
    const updateUser = async (val) => {
        let f = user.follow;
        if(f.includes(val)){
            const index = f.indexOf(val);
            if (index > -1) {
                f.splice(index, 1);
            }
        }else{
            f.push(val);
        }
        try {
            db.collection('users')
                .doc(firebase.auth().currentUser.email)
                .update({
                    follow: f,
                }).then(() => {
                console.log('User updated!');
                navigation.pop();
            })
        } catch (error) {
            Alert.alert('Oops' + error.message)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <ProfileBody
          user={user}
          posts={post}
          follow={user.follow !== undefined ? user.follow.length : 0}
        />
        <View style={{marginHorizontal: '10%'}}>
            <Button title="Edit Profile" onPress={() => navigation.push('EditProfileScreen')} />
        </View>
          <View
              style={{
                  flexDirection: 'column',
                  width: '60%',
                  alignItems: 'center',
                  marginLeft: '25%',
                  marginTop: '10%'
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                  <Text style={styles.title}>Name: </Text>
                  <View style={[
                      styles.inputField,
                      {
                          borderColor: '#444444'
                      },
                  ]}>
                      <Text style={styles.textInput}>{user.name}</Text>
                  </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                  <Text style={styles.title}>Username:</Text>
                  <View style={styles.inputField}>
                      <Text style={[styles.textInput, {
                          paddingTop: 10}]}>{user.username}</Text>
                  </View>
              </View>
              {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>*/}
              {/*    <Text style={styles.title}>Phone:</Text>*/}
              {/*    <View style={styles.inputField}>*/}
              {/*        <Text style={[styles.textInput, {*/}
              {/*            paddingTop: 10}]}>{user.phone}</Text>*/}
              {/*    </View>*/}
              {/*</View>*/}
              {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>*/}
              {/*    <Text style={styles.title}>Gender:</Text>*/}
              {/*    <View style={styles.inputField}>*/}
              {/*        <Text style={[styles.textInput, {*/}
              {/*            paddingTop: 10}]}>{user.gender}</Text>*/}
              {/*    </View>*/}
              {/*</View>*/}
              {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>*/}
              {/*    <Text style={styles.title}>Birthday:</Text>*/}
              {/*    <View style={styles.inputField}>*/}
              {/*        <Text style={[styles.textInput, {*/}
              {/*            paddingTop: 10}]}>{user.birthday}</Text>*/}
              {/*    </View>*/}
              {/*</View>*/}
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                  <Text style={styles.title}>Bio:</Text>
                  <View style={[
                      styles.inputField,
                      {
                          borderColor: '#444444'
                      },
                  ]}>
                      <Text style={styles.textInput}>{user.bio} </Text>
                  </View>
              </View>
          </View>
          <Divider style={{ marginTop: 20, opacity: .3 }} />
          <View style={{marginHorizontal: '10%', flexDirection: "row", justifyContent: "space-between"}}>
              <View style={{flexDirection: "column", marginTop: 20, justifyContent: "space-between"}}>
                  <Text style={{color: 'white',marginTop: 15, marginRight: "50%", fontSize: 18}}>Accommodation</Text>
                  <Text style={{color: 'white',marginTop: 15, marginRight: "50%", fontSize: 18}}>Event</Text>
              </View>
              {
                     <View style={{flexDirection: "column",marginTop: 20, justifyContent: "space-between"}}>
                          <Button title={user.follow === undefined ? "Follow" : user.follow.includes("Accommodation") ? "UnFollow" : "Follow"} onPress={() => updateUser('Accommodation')} />
                          <Button title={user.follow === undefined ? "Follow" : user.follow.includes("Event") ? "UnFollow" : "Follow"} onPress={() => updateUser('Event')} />
                     </View>
              }
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
        }}>Profile</Text>
      </View>
  )
}

// profile body
const ProfileBody = ({user, posts, follow}) => (
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
                source={{ uri: user.profile_picture }} style={styles.postHeaderImage} />
            <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', marginLeft:'15%'}}>
                <Text style={styles.heading}>
                    {user.username}
                </Text>
            </View>
        </View>
        <View
            style={{
                    flexDirection: 'row',
                    width: '60%',
                    justifyContent:'space-evenly',
                    marginRight: '25%',
                    marginTop: '15%'}}>
            <View style={{ flexDirection: 'column'}}>
                <Text style={styles.number}>{posts.length}</Text>
                <Text style={styles.heading}>Posts</Text>
            </View>
            <View style={{ flexDirection: 'column'}}>
                <Text style={styles.number}>{follow}</Text>
                <Text style={styles.heading}>Categories</Text>
            </View>
            {/*<View style={{ flexDirection: 'column'}}>*/}
            {/*    <Text style={styles.number}>0</Text>*/}
            {/*    <Text style={styles.heading}>Following</Text>*/}
            {/*</View>*/}
        </View>
    </View>
)
// styles for components
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#444444',
        borderRadius: 10,
        borderColor: '#444444',
        borderWidth: 1,
        paddingLeft: 10,
        marginHorizontal: 20,
        marginTop: 20,
    },
    textInput: {
        height: 40,
        color: '#EEEEEE',
        fontWeight: '400',
        marginLeft: 5,
        width: '100%',
        fontSize: 16
    },
    title:{
        color: 'white',
        margin: 10,
        marginBottom: 0,
        marginLeft: 0,
        textAlign:'center',
        fontSize: 15,
        fontWeight: 'bold'
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

export default Profile
