import React, { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Switch,
    SafeAreaView,
    Alert,
    Image,
    Linking,
    TextInput,
    Pressable, TouchableOpacity
} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import BottomTabs from "../components/home/BottomTabs";
import {db, firebase} from "../firebase";
import {Formik} from "formik";
import Validator from "email-validator";
import {Divider} from "react-native-elements/dist/divider/Divider";
import * as Yup from "yup";

// Done by Mona G

const ChangePassword = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <ChangePasswordBody navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};
// Header
const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: "bold",
                    textAlign: 'center',
                }}>Change Password</Text>
        </View>
    )
}

const ChangePasswordBody = ({navigation}) => {
    const ChangePasswordFormSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required()
            .min(6, 'Your password must contain at least 6 characters'),
        newPassword: Yup.string().
        required()
            .min(6, 'Your password must contain at least 6 characters'),
        confirmPassword: Yup.string()
            .required()
            .min(6, 'Your password must contain at least 6 characters')
    })

    const onChange = async (oldPassword, newPassword, confirmPassword) => {
        if(confirmPassword != newPassword){
            Alert.alert('Password mismatch');
            return;
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email, oldPassword).then(()=> {
                firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                    console.log('firebase credentials successful', oldPassword, newPassword)
                    Alert.alert(
                        'Information',
                        'Password Changed successfully',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK'),
                                style:'cancel',
                            }
                        ]
                    )
                    navigation.pop();
                });
            });

        } catch (error) {
            Alert.alert('Error in changing Password')
        }
    }
    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                onSubmit={values => {
                    onChange(values.oldPassword, values.newPassword, values.confirmPassword)
                }}
                validationSchema={ChangePasswordFormSchema}
                validateOnMount={true}
            >


                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, }) => (
                    <>


                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    1 > values.oldPassword.length || values.oldPassword.length >= 6
                                        ? '#444444'
                                        : '#F24A72',
                            },
                        ]}>

                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#CDD0CB'
                                placeholder='Old Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                autoCorrect={false}
                                keyboardType= 'default'
                                keyboardAppearance='dark'
                                textContentType='password'
                                secureTextEntry={true}
                                onChangeText={handleChange('oldPassword')}
                                onBlur={handleBlur('oldPassword')}
                                value={values.oldPassword}
                            />

                        </View>

                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    1 > values.newPassword.length || values.newPassword.length >= 6
                                        ? '#444444'
                                        : '#F24A72',
                            },
                        ]}>

                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#CDD0CB'
                                placeholder='New Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                autoCorrect={false}
                                keyboardType= 'default'
                                keyboardAppearance='dark'
                                textContentType='password'
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />

                        </View>

                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    1 > values.confirmPassword.length || values.confirmPassword.length >= 6 || values.confirmPassword != values.newPassword
                                        ? '#444444'
                                        : '#F24A72',
                            },
                        ]}>

                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#CDD0CB'
                                placeholder='Confirm Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                autoCorrect={false}
                                keyboardAppearance='dark'
                                textContentType='password'
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>

                        <Pressable
                            titleSize={20} style={styles.button(isValid)}
                            onPress={handleSubmit}>
                            <Text style={{color: 'white', fontWeight:'500', fontSize: 16}}>Change Password</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        marginTop: 150,
    },
    headerContainer: {
        marginHorizontal: 0,
        color: 'white',
        marginTop: 30,
        padding: 10,
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
    button: (isValid) =>({
        backgroundColor: isValid? '#3282B8' : '#6BB0F5',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginHorizontal: 20,
        marginTop: 60,
    }),
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
        paddingHorizontal: 12,
    },
});

export default ChangePassword;
