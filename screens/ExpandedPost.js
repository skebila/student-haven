/**@author Steven Kebila
*
*/
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements/dist/divider/Divider'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { db, firebase } from '../firebase';

const ExpandedPost = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 10 }}>
        <Text style={styles.headerText}>Expanded post page</Text>
      </ScrollView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black',
      flex: 1,
  },
  headerContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 0,
      color: 'white',
      marginTop: 10,
      padding: 10,
    },
  icon: {
      color: 'white',
      fontSize: 30
  },
  headerText: {
      fontSize: 16,
      color: 'white',
      fontWeight: "900",
      marginRight: 23
      
  },
  postHeaderImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: 6,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
    footerIcon: {
        marginRight: 5,
        width: 25,
        height: 25,
    },
    footerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        alignItems: 'center'
    },
    shareIcon: {
        fontSize: 25,
        color: 'white',
        marginRight: 15,
        transform: [{rotate: '90deg'}]
    }
})

export default ExpandedPost