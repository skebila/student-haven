import {
    View,
    Button,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    ScrollView, Alert, RefreshControl
} from 'react-native'
import React, {useEffect} from 'react'
import { useState } from 'react';
import BottomTabs from '../components/home/BottomTabs'
import { Ionicons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {db, firebase} from "../firebase";
import messages from "./Messages";

//Made by Usman

const onSend = async (to, message) => {
    const current = (new Date()).toUTCString();
    if(message === null || message === '')
        return;
    console.log(current);
    try {
        await db.collection('chat')
            .add({
                owner_uid: firebase.auth().currentUser.uid,
                from: firebase.auth().currentUser.email,
                to: to,
                message: message,
                sent_at: current,
            })
    } catch (error) {
        Alert.alert('Unable to send message. Please try again.')
    }
}
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
//the main code (where everything is placed throughout the page)
const Messenger = ({ navigation, route }) => {
    const { email } = route.params;
    const [sent, setSent] = useState([])
    const [receive, setReceive] = useState([])
    const [user, setUser] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        // fetching user data from firebase
        db
            .collection('users')
            .doc(email)
            .onSnapshot(snapshot => {
                setUser(snapshot.data())
            })
        db.collection('chat')
            .where('from', '==', firebase.auth().currentUser.email)
            .where('to', '==', email)
            .get()
            .then(snapshot1 => {
                db.collection('chat')
                    .where('to', '==', firebase.auth().currentUser.email)
                    .where('from', '==', email)
                    .get()
                    .then(snapshot => {
                        setSent(getMessages([...(snapshot.docs.map(doc => doc.data())), ...(snapshot1.docs.map(doc => doc.data()))]))
                    })
            })
    }, [refreshing])
    const getMessages = (array) => {
        array.sort(function(a,b){
            return new Date(a.sent_at) - new Date(b.sent_at);
        });
        console.log(array)
        return array;
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <Header title={user == null ? '' : user.username}/>
        <ScrollView style={{marginTop: 20, marginBottom: 70}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
            {sent.map((message, index) => (
                <View>
                    <ChatMessage message={message} />
                    <Text>{'\n'}</Text>
                </View>
            ))}
        </ScrollView>
        <TextMessage to={user == null ? '' : user.email} />
    </SafeAreaView>
  )
}
const  ChatMessage = ({message}) => {
    const getLocal = (date) => {
        const d = new Date(date).toLocaleString()
        return d;
    }
    return (
        <View style={[styles.talkBubble, {
            flexDirection: message.from === firebase.auth().currentUser.email ? 'row-reverse' : 'row',
        }]}>
            <View style={[styles.talkBubbleSquare, {
                marginHorizontal: 20,
                flexDirection: 'column',
                height: 50,
                width: '70%',
                backgroundColor: message.from === firebase.auth().currentUser.email ? '#075E54' : 'gray',
            }]}>
                <Text
                    style={{
                        fontSize: 16,
                        color: 'white',
                        fontWeight: "bold",
                        paddingHorizontal: 10,
                        textAlign: message.from === firebase.auth().currentUser.email ? 'right' : 'left',
                        // marginTop: 200,
                    }}>{message.message}</Text>
                <Text
                    style={{
                        fontSize: 10,
                        color: 'white',
                        fontWeight: "bold",
                        paddingTop: 20,
                        paddingHorizontal: 10,
                        textAlign: message.from === firebase.auth().currentUser.email ? 'left' : 'right',
                        // marginTop: 200,
                    }}>{getLocal(message.sent_at)}</Text>
            </View>
        </View>
    )
}
const TextMessage = ({to}) => {
    const [message, setMessage] = useState(null)
    return (
      <View style={styles.textContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder='Type Message...'
          value={message === null ? '' : message}
          onChangeText={(value) => setMessage(value)}
        />
        <View style={styles.button}>
        <TouchableOpacity
            onPress={()=> {
                onSend(to, message).then(r => setMessage(''))
            }}
        >
            <Ionicons name='send' style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View>
  )
}

//Header code and its style
const Header = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
          textAlign: 'center',
        }}>{title}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    talkBubble: {
        backgroundColor: "transparent",
    },
    talkBubbleSquare: {
        width: 120,
        height: 80,
        borderRadius: 10,
    },
    textContainer: {
        backgroundColor: 'black',
        height: 100,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',

    },

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
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
    color: 'grey',
    marginRight: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 65,
    fontSize: 15,
  },
    icon: {

        color: '#CDD0CB',
        fontSize: 65
    },
  button: {
    width: '20%',
    height: 65,
    borderRadius: 5,
  },
})

export default Messenger
