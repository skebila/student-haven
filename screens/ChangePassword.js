/**@author Mona G
 *
 */
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase, db} from '../firebase'
import LoginForm from "../components/loginScreen/LoginForm";


const ChangePassword = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text
                    style={{
                        color: 'white',
                        fontWeight: '900',
                        fontSize: 25
                    }}>Change Password</Text>
            </View>
            <ChangePasswordForm navigation={navigation}/>
        </View>
    )
}
const ChangePasswordForm = ({navigation}) => {
    const LoginFormSchema = Yup.object().shape({
        oldPassword: Yup.string().required()
            .min(6, 'Your password must contain at least 6 characters'),
        newPassword: Yup.string()
            .required()
            .min(6, 'Your password must contain at least 6 characters')
    })

    const onUpdate = async (oldPassword, newPassword) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(firebase.auth().currentUser.email, oldPassword).then(() => {
                firebase.auth().currentUser.updatePassword(newPassword)
            })
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
        } catch (error) {
            Alert.alert(
                'Ooops',
                error.message + '\n\n Please try again'
                    [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        style:'cancel',
                    }
                    ]
            )
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ oldPassword: '', newPassword: '' }}
                onSubmit={values => {
                    onUpdate(values.oldPassword, values.newPassword)
                }}
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >


                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, }) => (
                    <>


                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    values.oldPassword.length < 1 || values.oldPassword.length >= 6
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
                                keyboardAppearance='dark'
                                textContentType='password'
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
                                keyboardAppearance='dark'
                                textContentType='password'
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
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
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 150,
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
        marginTop: 20,
        marginHorizontal: 20,
    }),
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logoContainer: {
        color: 'white',
        alignItems: 'center',
        marginTop: 60
    }

})
export default ChangePassword
