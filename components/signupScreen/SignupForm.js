import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase, db} from '../../firebase'


const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().
            required()
            .min(2, 'An username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password must contain atleast 6 characters')
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
            console.log('Firebase user created successfully', email, password)

            db.collection('users')
                .doc(authUser.user.email)
                .set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        } catch (error) {
            Alert.alert('Oops' + error.message)
        }
    }

  return (
      <View style={styles.wrapper}>
          <Formik
              initialValues={{ email: '', username: '', password: '' }}
              onSubmit={values => {
                  onSignup(values.email, values.password, values.username)
              }}
              validationSchema={SignupFormSchema}
              validateOnMount={true}
          >

              
              {({ handleBlur, handleChange, handleSubmit, values, errors, isValid, }) => (
                  <>
                      
                    
                      <View style={[
                          styles.inputField,
                          {
                              borderColor:
                                values.email.length < 1 || Validator.validate(values.email)
                                  ? '#444444'
                                  : '#F24A72',
                          },
                      ]}>
                        
                          <TextInput
                              style={styles.textInput}
                              placeholderTextColor='#CDD0CB'
                              placeholder='Email address'
                              autoCapitalize='none'
                              keyboardType='email-address'
                              keyboardAppearance='dark'
                              textContentType='emailAddress'
                              autoFocus={true}
                              onChangeText={handleChange('email')}
                              onBlur={handleBlur('email')}
                              value={values.email}
                        />
                    
                      </View>

                      <View style={[
                          styles.inputField,
                          {
                              borderColor:
                                1 > values.username.length || values.username.length >= 2
                                  ? '#444444'
                                  : '#F24A72',
                          },
                      ]}>
                        
                          <TextInput
                              style={styles.textInput}
                              placeholderTextColor='#CDD0CB'
                              placeholder='Username'
                              autoCapitalize='none'
                              keyboardType= 'default'
                              keyboardAppearance='dark'
                              textContentType='username'
                              onChangeText={handleChange('username')}
                              onBlur={handleBlur('username')}
                              value={values.username}
                        />
                    
                      </View>
                    
                    <View style={[
                          styles.inputField,
                          {
                              borderColor:
                                1 > values.password.length || values.password.length >= 6
                                  ? '#444444'
                                  : '#F24A72',
                          },
                      ]}>
                        
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#CDD0CB'
                            placeholder='Password'
                            autoCapitalize='none'
                            secureTextEntry={true}
                            autoCorrect={false}
                            keyboardAppearance='dark'
                              textContentType='password'
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                        />
                    </View>
                    
                        
                    <Pressable
                        titleSize={20} style={styles.button(isValid)}
                        onPress={handleSubmit}>
                        <Text style={{color: 'white', fontWeight:'500', fontSize: 16}}>Sign Up</Text>
                    </Pressable>

                    <Divider style={{ marginTop: 20, opacity: .3 }} />

                    <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center'}}>
                        <Text
                            style={{
                                color: '#EEEEEE',
                                alignItems: 'center',
                                marginBottom: 30
                            }}>Already have an account?</Text>
                        
                        <TouchableOpacity onPress={()=> navigation.goBack()}> 
                            <Text style={{ color: '#3282B8', }}> Login.</Text>
                        </TouchableOpacity>
                    </View> 
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
        marginHorizontal: 20,
        marginTop: 60,
    }),
})
export default SignupForm