/**@author Steven Kebila
*
*/
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome, Entypo } from 'react-native-vector-icons';


//import Screens
import Home from '../screens/Home'
import Messages from '../screens/Messages'
import Messenger from '../screens/Messenger'
import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'
import Topics from '../screens/Topics'
import NewPost from '../screens/NewPost'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AccommodationPost from '../screens/AccommodationPost';
import EventPost from '../screens/EventPost';
import EditProfile from '../screens/EditProfile';
import UserProfile from "../screens/UserProfile";
import Setting from "../screens/Settings";
import AccommodationAddPost from '../screens/AccommodationAddPost';
import EventAddPost from '../screens/EventAddPost';

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
            <Stack.Screen name="MessengerScreen" component={Messenger} />
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
