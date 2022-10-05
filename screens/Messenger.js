import { View, Button, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import BottomTabs from '../components/home/BottomTabs'
import { Ionicons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

//Made by Usman

//the main code (where everything is placed throughout the page)
const Messenger = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TextMessage />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  )
}

const TextMessage = () => {
  const [name, setName ] = useState(' ');
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder='Type Message...'
          onChangeText={(val)=> setName(val)}
        />
        <View style={styles.button}>
        <Button 
          title="Send Message" 
          onPress={() => navigation.push("MessengerScreen")} />

      </View>
      <Text style={{
          fontSize: 16,
          padding: 8,
          color: 'white',
          fontWeight: "900",
          textAlign: 'right',
        }}>Your message: {name}</Text>
      </View>
    </KeyboardAvoidingView>
  )
}

//Header code and its style
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
          textAlign: 'center',
        }}>Messenger</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  headerContainer: {
    marginHorizontal: 0,
    color: 'white',
    marginTop: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 8,
    top: 0, 
    margin: 5,
    width: 400,
    height: 100,
    color:'white',
    backgroundColor: 'grey',

  },

  button: {
    width: 119,
    height: 50,
    borderRadius: 2,
    marginLeft: 285,
    top: 0, 
  },
})

export default Messenger
