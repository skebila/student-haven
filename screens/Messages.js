import { View, Button, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import BottomTabs from '../components/home/BottomTabs'
import { Ionicons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

//Made by Usman

//the main code (where everything is placed throughout the page)
const Messages = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchContact />
      <NoMessage navigation={navigation}/>
      <BottomTabs navigation={navigation}/>
        </SafeAreaView>
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
        }}>Messages</Text>

      </View>
  )
}

//The search bar and its placement
const SearchContact = () => {
    return (
        <SafeAreaView>
            <View style={styles.searchBarContainer}>
                <TouchableOpacity>
                    <Ionicons name='search' style={styles.searchIcon} />
                </TouchableOpacity>
                <TextInput placeholder={'Search from Contacts'}
                    placeholderTextColor={'#CDD0CB'} style={styles.TextInput} />
            </View>

        </SafeAreaView>
    )
}

const NoMessage = ({navigation}) => {
  return (
      <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 13,
          color: 'white',
          fontWeight: "bold",
          textAlign: 'center',
        }}>No Messages Found</Text>
      <Button title="Send Message to Someone Interface" onPress={() => navigation.push("MessengerScreen")} />
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

    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#444444',
      borderRadius: 10,
      paddingLeft: 10,
      marginHorizontal: 20,
      marginTop: 0,
  },
  TextInput: {
      height: 40,
      color: '#EEEEEE',
      fontWeight: '400',
      marginLeft: 5,
      width: '100%',
      fontSize: 16
  },
  searchIcon: {
      fontSize: 25,
      color: '#CDD0CB',
  }
})

export default Messages
