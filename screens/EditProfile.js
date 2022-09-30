import {Modal, TextInput, View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import { db, firebase } from '../firebase'
import DatePicker from 'react-native-datepicker'
import * as ImagePicker from 'expo-image-picker';

// Done by Mona G
let name, username, bio, phone, gender, birthday
const updateUser = async (navigation, name, username, bio, phone, gender, birthday) => {
    try {
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .update({
                name: name,
                username: username,
                bio: bio,
                phone: phone,
                gender: gender,
                birthday: birthday
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
                profile_picture: 'https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_33-512.png',
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
    phone = user.phone
    gender = user.gender
    birthday = user.birthday
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
                onPress={() => updateUser(navigation, name, username, bio, phone, gender, birthday)}
            >
                <Text style={{color: 'dodgerblue', fontSize: 15, fontWeight: "bold"}}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

// profile body
const ProfileBody = ({user}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(birthday !== undefined ? new Date(birthday) : new Date())
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
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
                {(image == null ? user.profile_picture : image) && <Image source={{ uri: image == null ? user.profile_picture : image }} style={styles.postHeaderImage} />}
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
                                    onPress={() => {
                                        pickImage()
                                        setModalVisible(!modalVisible)
                                    }}
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
                    <Text style={styles.title}>Phone:</Text>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor: '#444444'
                        },
                    ]}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#CDD0CB'
                            placeholder={phone}
                            autoCapitalize='none'
                            keyboardType='default'
                            keyboardAppearance='dark'
                            textContentType='none'
                            onChangeText={text => {phone = text}}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={styles.title}>Gender:</Text>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor: '#444444'
                        },
                    ]}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#CDD0CB'
                            placeholder={gender}
                            autoCapitalize='none'
                            keyboardType='default'
                            keyboardAppearance='dark'
                            textContentType='none'
                            onChangeText={text => {gender = text}}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={styles.title}>Birthday:</Text>
                    <View style={[
                        styles.inputField,
                        {
                            borderColor: '#444444'
                        },
                    ]}>
                        <DatePicker
                            style={{width: '100%'}}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1950-01-01"
                            maxDate="2022-09-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(d) => {
                                setDate(d)
                                birthday = d
                            }}
                        />
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
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
