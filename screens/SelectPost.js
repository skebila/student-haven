import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome, Entypo } from 'react-native-vector-icons';
import { Divider } from 'react-native-elements';


const SelectPost = () => {
  return (
    <SafeAreaView style={styles.container}>
          <Header />
          <Divider width={0.2} orientation='vertical' style={{marginBottom: 20}}/>
        </SafeAreaView>
  )
}

const Header = () => {
  return (
      <View style={styles.headerContainer}>

        <TouchableOpacity>
          <Ionicons name='close' style={styles.icon} />
        </TouchableOpacity>
        <Text
            style={styles.headerText}
          >Post to</Text>
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
        fontWeight: '900',
        marginRight: 23,
    }
})

export default SelectPost