import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome, Entypo } from 'react-native-vector-icons';


//import Screens
import Home from '../screens/Home'
import Messages from '../screens/Messages'
import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'
import Topics from '../screens/Topics'
import NewPost from '../screens/NewPost'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AccommodationPost from '../screens/AccommodationPost';
import EventPost from '../screens/EventPost';
import EditProfile from '../screens/EditProfile';

const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false,
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={screenOptions}>
            
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="TopicsScreen" component={Topics} />
            <Stack.Screen name="NotificationsScreen" component={Notifications} />
            <Stack.Screen name="MessagesScreen" component={Messages} />
            <Stack.Screen name="NewPostScreen" component={NewPost} />
            <Stack.Screen name="AccommodationPostScreen" component={AccommodationPost} />
            <Stack.Screen name="EventsPostScreen" component={EventPost} />
            <Stack.Screen name="EditProfileScreen" component={EditProfile} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={screenOptions}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="SignupScreen" component={Signup} />
        </Stack.Navigator>
    </NavigationContainer>
)
const Tab = createBottomTabNavigator();



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