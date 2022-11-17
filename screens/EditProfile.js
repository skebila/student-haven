import {RefreshControl, Modal, TextInput, View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import { db, firebase, storage } from '../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

// Done by Mona G
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
        Alert.alert('Error in updating profile. Try again later')
    }
}
const deleteProfilePic = async () => {
    try {
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .update({
                profile_picture: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
            }).then(() => {
            console.log('Image Deleted!');
        })
    } catch (error) {
        Alert.alert('Error in Deleting profile Picture. Try again later')
    }
}
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
// Mona G
const EditProfile = ({ navigation }) => {
    //sets the user profile
    const [user, setUser] = useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [date, setDate] = useState(new Date())
    const [radio, setRadio] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [datePicker, setDatePicker] = useState(false);
    const [image, setImage] = useState(null);
    const radio_props = [
        {label: 'Male', value: 0 },
        {label: 'Female', value: 1 }
    ];
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        // fetching user data from firebase
        db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .onSnapshot(snapshot => {
                setUser(snapshot.data())
                setRadio(snapshot.data().gender)
                setDate(new Date(snapshot.data().birthday))
                setImage(snapshot.data().profile_picture);
            })
    }, [refreshing])
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).then((result)=>{
            if(result != undefined)
                if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    setImage(uri);
                    return uriToBlob(uri);
                }else{
                    return null
                }
        }).then((blob)=>{
            if(blob)
                return uploadToFirebase(blob);
        }).then((snapshot)=>{
            if(snapshot)
                console.log("File uploaded");
        }).catch((error)=>{
            throw error;
        });
        if(result !== undefined)
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
    };

    return (
        <SafeAreaView style={styles.container}>
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
                    onPress={() => updateUser(navigation, user.name, user.username, user.bio, user.phone, radio, date.toDateString())}
                >
                    <Text style={{color: 'dodgerblue', fontSize: 15, fontWeight: "bold"}}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
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
                        {<Image source={{ uri: user == null ? '' : image }} style={styles.postHeaderImage} />}
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
                                    placeholder={user == null ? "" : user.name}
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    keyboardAppearance='dark'
                                    textContentType='name'
                                    onChangeText={text => {user.name = text}}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
                            <Text style={styles.title}>Username:</Text>
                            <View style={styles.inputField}>
                                <Text style={[styles.textInput, {
                                    paddingTop: 10}]}>{user == null ? "" : user.username}</Text>
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
                                    placeholder={user == null ? "" : user.phone}
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    keyboardAppearance='dark'
                                    textContentType='none'
                                    onChangeText={text => {user.phone = text}}
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
                                <RadioForm
                                    formHorizontal={true}
                                    animation={true}
                                >
                                    {/* To create radio buttons, loop through your array of options */}
                                    {
                                        radio_props.map((obj, i) => (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={obj.value === radio}
                                                    onPress={(value) => {
                                                        setRadio(value);
                                                    }}
                                                    borderWidth={1}
                                                    // buttonInnerColor={'#e74c3c'}
                                                    buttonOuterColor={obj.label === radio ? '#2196f3' : '#000'}
                                                    // buttonSize={40}
                                                    // buttonOuterSize={80}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{marginLeft: 10}}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={(value) => {
                                                        setRadio(value);
                                                    }}
                                                    labelStyle={{fontSize: 20, color: 'white'}}
                                                    labelWrapStyle={{}}
                                                />
                                            </RadioButton>
                                        ))
                                    }
                                </RadioForm>
                                {/*<RadioForm*/}
                                {/*    style={{width: '100%', justifyContent: 'space-between'}}*/}
                                {/*    labelColor={'white'}*/}
                                {/*    formHorizontal={false}*/}
                                {/*    radio_props={radio_props}*/}
                                {/*    initial={user.gender == 'Male' ? 0 : user.gender == 'Female' ? 1 : -1}*/}
                                {/*    onPress={(value) => {gender = value == 0 ? 'Male' : 'Female'}}*/}
                                {/*/>*/}
                                {/*<TextInput*/}
                                {/*    style={styles.textInput}*/}
                                {/*    placeholderTextColor='#CDD0CB'*/}
                                {/*    placeholder={gender}*/}
                                {/*    autoCapitalize='none'*/}
                                {/*    keyboardType='default'*/}
                                {/*    keyboardAppearance='dark'*/}
                                {/*    textContentType='none'*/}
                                {/*    onChangeText={text => {gender = text}}*/}
                                {/*/>*/}
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
                            <TouchableOpacity
                                onPress={() => setDatePicker(true)}
                                style={{width: '100%', marginVertical: '5%'}}>
                                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                                    {date.toDateString()}
                                </Text>
                            </TouchableOpacity>
                            {datePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={(event, d) => {
                                        setDate(d)
                                        setDatePicker(false)
                                    }}
                                    style={{width: '100%'}}
                                />
                            )}
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
                                    placeholder={user == null ? '' : user.bio}
                                    autoCapitalize='none'
                                    keyboardType='default'
                                    keyboardAppearance='dark'
                                    textContentType='none'
                                    onChangeText={text => {user.bio = text}}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const uploadToFirebase =  (blob) => {
    var storageRef = storage.ref();
    var date = new Date();
    const metadata = {
        contentType: 'image/jpeg'
    };
    var d = date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds();
    const uploadTask = storageRef.child('profile_images/photo_'+d+'.jpeg').put(blob, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log('User doesn\'t have permission to access the object');
                    break;
                case 'storage/canceled':
                    console.log('User canceled the upload');
                    break;

                case 'storage/unknown':
                    console.log('Unknown error occurred, inspect error.serverResponse');
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                db.collection('users')
                    .doc(firebase.auth().currentUser.email)
                    .update({
                        profile_picture: downloadURL,
                    }).then(() => {
                    console.log('User updated!');
                })
            });
        }
    );
}
const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
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
