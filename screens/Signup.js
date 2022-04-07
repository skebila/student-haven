import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'

const Signup = ({navigation}) => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Text
        style={{
          color: 'white',
          fontWeight: '900',
          fontSize: 25
      }}>Student Haven</Text>
        </View>
        <SignupForm navigation={navigation}/>
  </View>
  
)

const styles = StyleSheet.create({
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
export default Signup