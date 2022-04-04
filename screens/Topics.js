import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'

const Topics = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Topics"/>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
    }
})

export default Topics