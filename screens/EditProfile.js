import {Modal, TextInput, View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'

// Done by Mona G
let name, username, bio
const updateUser = async (navigation, name, username, bio) => {
    try {
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .update({
                name: name,
                username: username,
                bio: bio,
            }).then(() => {
                console.log('User updated!');
                navigation.pop();
            })
    } catch (error) {
        Alert.alert('Oops' + error.message)
    }
}
const deleteProfilePic = async () => {
    try {
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .update({
                profile_picture: "",
            }).then(() => {
            console.log('Image Deleted!');
        })
    } catch (error) {
        Alert.alert('Oops' + error.message)
    }
}

// Mona G
const EditProfile = ({ navigation }) => {
    //sets the user profile
    const [user, setUser] = useState([])

    useEffect(() => {
        // fetching user data from firebase
        db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .onSnapshot(snapshot => {
                setUser(snapshot.data())
            })
    }, [])
    name = user.name
    username=user.username
    bio = user.bio
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}
            />
            <ScrollView>
                <ProfileBody
                    user={user}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
// Header
const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={()=> navigation.pop()}
            >
                <Text style={{color: 'white', fontSize: 15, fontWeight: "bold"}}>Cancel</Text>
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 20,
                    color: 'white',
                    fontWeight: "bold",
                    textAlign: 'center',
                }}>Edit Profile</Text>
            <TouchableOpacity
                onPress={() => updateUser(navigation, name, username, bio)}
            >
                <Text style={{color: 'dodgerblue', fontSize: 15, fontWeight: "bold"}}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

// profile body
const ProfileBody = ({user}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View
            style={{
                flexDirection: 'column',
                margin: 5,
                paddingTop: 10,
                alignItems: 'center',
            }}>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    margin: 5,
                    paddingBottom: 10,
                    alignItems: 'center',
                }}>
                <Image // profile image
                    source={{uri: user.profile_picture}} style={styles.postHeaderImage}/>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={[{color: "dodgerblue"},styles.textStyle]}>Change Profile Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        deleteProfilePic()
                                        setModalVisible(!modalVisible)
                                    }}
                                >
                                    <Text style={[{color: "red"},styles.textStyle]}>Delete Profile Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={[{color: "grey"},styles.textStyle]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{marginTop: '5%'}}>
                        <Text style={{color: 'dodgerblue', fontSize: 15, fontWeight: "bold"}}>
                            Change Profile Photo
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    width: '60%',
                    marginRight: '25%',
                    marginTop: 5
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={styles.title}>Name: </Text>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor: '#444444'
                        },
                    ]}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#CDD0CB'
                            placeholder={name}
                            autoCapitalize='none'
                            keyboardType='default'
                            keyboardAppearance='dark'
                            textContentType='name'
                            onChangeText={text => {name = text}}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={styles.title}>Username:</Text>
                    <View style={styles.inputField}>
                        <Text style={[styles.textInput, {
        paddingTop: 10}]}>{username}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={styles.title}>Bio:</Text>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor: '#444444'
                        },
                    ]}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#CDD0CB'
                            placeholder={bio}
                            autoCapitalize='none'
                            keyboardType='default'
                            keyboardAppearance='dark'
                            textContentType='none'
                            onChangeText={text => {bio = text}}
                        />
                    </View>
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
    headerContainer: {
        marginHorizontal: 10,
        color: 'white',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    heading:{
        color: 'white',
        margin: 10,
        marginBottom: 0,
        marginLeft: 0,
        fontWeight: 'bold'
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
    postHeaderImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 10,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: "100%",
        height: 40,
        margin: 10,
        backgroundColor: "#E8E8E8"
    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default EditProfile
