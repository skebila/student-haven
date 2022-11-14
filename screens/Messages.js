import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    RefreshControl
} from 'react-native'
import React, {useEffect, useState} from 'react'
import BottomTabs from '../components/home/BottomTabs'
import { Ionicons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {db, firebase} from "../firebase";
import Post from "../components/home/Post";
import {Divider} from "react-native-elements/dist/divider/Divider";

//Made by Usman
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
//the main code (where everything is placed throughout the page)
const Messages = ({navigation}) => {
    const [chat, setChat] = useState([])
    const [users, setUsers] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        db.collection('chat')
            .where('from', '==', firebase.auth().currentUser.email)
            .get()
            .then(snapshot => {
                // console.log(snapshot.docs.map(doc => doc.data()))
                // setChat([...new Set((snapshot.docs.map(doc => doc.data())).map(item => item.from))])
                db.collection('chat')
                    .where('to', '==', firebase.auth().currentUser.email)
                    .get()
                    .then(snapshot1 => {
                        setChat([...new Set([...((snapshot1.docs.map(doc => doc.data())).map(item => item.from)), ...((snapshot.docs.map(doc => doc.data())).map(item => item.to))])])
                        setUsers([...new Set([...((snapshot1.docs.map(doc => doc.data())).map(item => item.from)), ...((snapshot.docs.map(doc => doc.data())).map(item => item.to))])])
                    })
                console.log(chat)
            })
    }, [refreshing])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const findUser = (name) => {
        let temp = [];
        for(let c of users){
            if(c.includes(name)){
                temp.push(c);
            }
        }
        setChat(temp)
    }
    return (
    <SafeAreaView style={styles.container}>
      <Header />
        <View style={styles.searchBarContainer}>
            <TouchableOpacity>
                <Ionicons name='search' style={styles.searchIcon} />
            </TouchableOpacity>
            <TextInput placeholder={'Search from Contacts'}
                       onChangeText={(value) => findUser(value)}
                       placeholderTextColor={'#CDD0CB'} style={styles.TextInput} />
        </View>
        <ScrollView style={{marginTop: 20, marginBottom: 70}}
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }>
            <View style={styles.headerContainer}>
                {chat.map((c, index) => (
                    <Person navigation={navigation} to={c} />
                ))}
            </View>
        </ScrollView>
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



const Person = ({navigation, to}) => {
    const [person, setPerson] = useState([])
    useEffect(() => {
        db
            .collection('users')
            .doc(to)
            .onSnapshot(snapshot => {
                setPerson(snapshot.data())
            })
    }, [])

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('MessengerScreen', {email: to})}
            >
                <View style={{flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image // profile image
                        source={{uri: person == null ? '' : person.profile_picture}} style={styles.postHeaderImage}/>
                    <Text
                        style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: "bold",
                            textAlign: 'center',
                        }}>{person == null ? '' : person.username}</Text>
                </View>
            </TouchableOpacity>
            <Divider style={{ marginTop: 20, opacity: .3 }} />
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
  },
    postHeaderImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
        marginRight: 30,
        borderWidth: 1.6,
        borderColor: '#E5E5E5',
    },
})

export default Messages
