import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome, Entypo } from 'react-native-vector-icons';

// LeftIconName= "menu" RightIconName="ios-person-sharp" title="Haven Hub" PostIcon='squared-plus'
const Header = ({navigation}) => {
  return (
      <View style={styles.container}>
          <TouchableOpacity>
            <Ionicons name='menu' style={styles.icon} />
          </TouchableOpacity>
        
          <Text style={styles.logo}>Haven Hub</Text>
      <View style={{flexDirection:'row',}}>
        
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={()=> navigation.push('NewPostScreen')}
        >
            <Entypo name='squared-plus' style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='ios-person-sharp' style={styles.icon} />
          </TouchableOpacity>
      </View>
          
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
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
    logo: {
        fontSize: 16,
        color: 'white',
      fontWeight: "900",
    }
})

export default Header