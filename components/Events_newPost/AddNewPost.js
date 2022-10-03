import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'
import { Ionicons } from 'react-native-vector-icons';


const AddNewPost = ({navigation}) => {
  return (
      <ScrollView style={styles.container}>
      <Header navigation={navigation}/>
      <FormikPostUploader navigation={navigation}/>
      </ScrollView>
    
  )
}

const Header = ({navigation}) => {
  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name='chevron-back-outline' style={styles.icon} />
        </TouchableOpacity>
      <Text style={styles.headerText}>New post</Text>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
      
    }
})
export default AddNewPost