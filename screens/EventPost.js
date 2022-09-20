import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import BottomTabs from '../components/home/BottomTabs'
import React from 'react'
import { Ionicons } from 'react-native-vector-icons';


const EventPost = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <BottomTabs navigation={navigation}/>
        </SafeAreaView>
  )
}

const Header = ({navigation}) => {
  return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name='chevron-back-outline' style={styles.icon} />
        </TouchableOpacity>
      <Text style={styles.headerText}>Events</Text>
      <Text></Text>
    </View>
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
      
    }
})

export default EventPost