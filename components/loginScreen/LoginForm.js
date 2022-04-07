import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'

const LoginForm = () => {
  return (
      <View style={styles.wrapper}>
          <View style={styles.inputField}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor='#CDD0CB'
                placeholder='Email address'
                autoCapitalize='none'
                keyboardType='email-address'
                keyboardAppearance='dark'
                textContentType='emailAddress'
                autoFocus={true}
              />
          </View>
          
          <View style={styles.inputField}>
              
              <TextInput
                style={styles.textInput}
                placeholderTextColor='#CDD0CB'
                placeholder='Password'
                autoCapitalize='none'
                secureTextEntry={true}
                autoCorrect={false}
                keyboardAppearance='dark'
                textContentType='password'
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
              titleSize={20} style={styles.button}
              onPress={() => console.log("you clicked me")}>
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
    button: {
        backgroundColor: '#3282B8',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginHorizontal: 20,
    },
})
export default LoginForm