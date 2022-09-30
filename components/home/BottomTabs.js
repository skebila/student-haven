/**@author Steven Kebila
*
*/
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {Ionicons} from 'react-native-vector-icons';


const BottomTabs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> navigation.push('HomeScreen')}>
        <Ionicons name={'home'} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.push('TopicsScreen')}>
        <Ionicons name='newspaper' style={styles.icon}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.push('NotificationsScreen')}>
        <Ionicons name='notifications' style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
          onPress={()=> navigation.push('MessagesScreen')}
      >
        <Ionicons name='chatbubbles' style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 90,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',

  },
  icon: {

        color: '#CDD0CB',
        fontSize: 30
  },

})

export default BottomTabs

