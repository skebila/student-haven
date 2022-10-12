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
      <Text
        style={{
          fontSize: 13,
          color: 'white',
          fontWeight: "bold",
          textAlign: 'center',
          marginTop: 200,
        }}>No Messages Found</Text>
      <TextMessage />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  )
}

const TextMessage = () => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder='Type Message...'
        />
        <View style={styles.button}>
        <Button 
          title="Send Message" 
          onPress={() => navigation.push("MessengerScreen")} />
      </View>
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
  },
  headerContainer: {
    marginHorizontal: 0,
    color: 'white',
    marginTop: 10,
    padding: 10,
  },
  input: {
    width: 400,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
    color: 'grey',
    backgroundColor: 'white',
    height: 65,
    fontSize: 15,
    marginTop: 315,
  },

  button: {
    width: 119,
    height: 50,
    borderRadius: 2,
    marginLeft: 275,

  },
})

export default Messenger
