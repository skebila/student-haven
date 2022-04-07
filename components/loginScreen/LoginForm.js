import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'


const LoginForm = () => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string()
            .required()
        .min(6, 'Your password must contain atleast 8 characters')
    })

  return (
      <View style={styles.wrapper}>
          <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => {
                  console.log(values)
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
                    
                    <TouchableOpacity
                        style={{
                            alignItems: 'flex-end',
                            paddingRight: 20,
                            marginTop: 10,
                            marginBottom: 30
                            }}> 
                        <Text style={{color: '#3282B8', }}
                        >Forgot password?</Text>
                    </TouchableOpacity>
                        
                    <Pressable
                        titleSize={20} style={styles.button(isValid)}
                        onPress={handleSubmit}>
                        <Text style={{color: 'white', fontWeight:'500', fontSize: 16}}>Login</Text>
                    </Pressable>

                    <Divider style={{ marginTop: 20, opacity: .3 }} />

                    <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center'}}>
                        <Text
                            style={{
                                color: '#EEEEEE',
                                alignItems: 'center',
                                marginBottom: 30
                            }}>Don't have an account yet?</Text>
                        
                        <TouchableOpacity> 
                            <Text style={{ color: '#3282B8', }}> Sign up.</Text>
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
    }),
})
export default LoginForm