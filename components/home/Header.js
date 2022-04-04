import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from 'react-native-vector-icons';


const Header = (props) => {
  return (
      <View style={styles.container}>
          <TouchableOpacity>
            <Ionicons name={props.LeftIconName} style={styles.icon} />
          </TouchableOpacity>
        
          <Text style={styles.logo}>{props.title}</Text>

          <TouchableOpacity>
            <Ionicons name={props.RightIconName} style={styles.icon} />
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
        color: 'white',
    marginTop: 10,
        padding: 10,
    },
    icon: {
        color: 'white',
        fontSize: 30
    },
    logo: {
        fontSize: 16,
        color: 'white',
        fontWeight: "900",
    }
})

export default Header