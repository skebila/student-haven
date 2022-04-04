import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from 'react-native-vector-icons';


const Header = (props) => {
  return (
      <View style={styles.container}>
          <TouchableOpacity>
            <Ionicons name="menu" style={styles.icon} />
          </TouchableOpacity>
        
          <Text style={styles.logo}>{props.title}</Text>

          <TouchableOpacity>
            <FontAwesome name="gear" style={styles.icon} />
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        color: 'white'
    },
    icon: {
        color: 'white',
        fontSize: 30
    },
    logo: {
        fontSize: 20,
        color: 'white',
        fontWeight: "700",
    }
})

export default Header