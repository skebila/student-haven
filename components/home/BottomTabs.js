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

      <TouchableOpacity onPress={()=> navigation.push('MessagesScreen')}>
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















/*import { View, Text, Dimensions } from 'react-native'

import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons';

//import Screens
import Home from '../screens/Home'
import Messages from '../screens/Messages'
import Notifications from '../screens/Notifications'
//import Profile from '../screens/Profile'
import Topics from '../screens/Topics'



const fullScreenWidth = Dimensions.get('window').width;



const Stack = createStackNavigator()

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={Home} options={{
                title: false,
                headerMode:false,
        }}/>
        </Stack.Navigator>
    );
}

function TopicsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TopicsScreen" component={Topics} options={{
                title: false,
                headerMode:false,
        }}/>
        </Stack.Navigator>
    );
}

function NotificationsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="NotificationsScreen" component={Notifications} options={{
                title: false,
                headerMode:false,
        }}/>
        </Stack.Navigator>
    );
}

function MessagesStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MessagesScreen" component={Messages} options={{
                title: false,
                headerMode:false,
        }}/>
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function Navigation(props) {
    return (
        <NavigationContainer >
            <Tab.Navigator
                screenOptions={
                    
                    ({ route }) => ({
                    //headerTitle: () => <Text>Header</Text>,
                    tabBarIcon: ({ focused, color, size, padding }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                        }else if (route.name === 'Topics') {
                            iconName = focused ? 'newspaper' : 'newspaper-outline'
                        }else if (route.name === 'Notifications') {
                            iconName = focused ? 'notifications' : 'md-notifications-outline'
                        }else if (route.name === 'Messages') {
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                                style={{paddingBottom: padding}}
                            />
                        )
                    }
                
                })}
                >
                
                <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="Topics" component={TopicsStackScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="Notifications" component={NotificationsStackScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="Messages" component={MessagesStackScreen} options={{ headerShown: false }}/>
            </Tab.Navigator>
      </NavigationContainer>
  )  
}
*/