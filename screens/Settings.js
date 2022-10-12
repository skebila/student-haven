import React, { useState } from "react";
import {Button, StyleSheet, Text, View, Switch, SafeAreaView, Alert} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import BottomTabs from "../components/home/BottomTabs";
import {db, firebase} from "../firebase";

// Done by Mona G

const deleteUser = async (navigation) => {
    try {
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .delete().then(() => {
            console.log('User Deleted!');
            firebase.auth().currentUser.delete().then(() => {
                navigation.pop();
            });
        })
        var colRef = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts');

        colRef.get().then((querySnapshot) => {
            Promise.all(querySnapshot.docs.map((d) => d.ref.delete()));
        });
    } catch (error) {
        Alert.alert('Oops' + error.message)
    }
}

const Setting = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <SettingBody navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};
// Header
const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: "bold",
                    textAlign: 'center',
                }}>Settings</Text>
        </View>
    )
}

const SettingBody = (navigation) => {
    // const [data, setData] = useState(Settings.get("data"));
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // const storeData = data => {
    //     Settings.set(data);
    //     setData(Settings.get("data"));
    // };
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{marginTop: 15, marginRight: "50%", fontSize: 18}}>Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#767577" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.value}>
                <View style={styles.value}>
                    <Button
                        // onPress={() => storeData({ data: "Native" })}
                        title="Change Password"
                    />
                </View>
                <View style={styles.value}>
                    <Button
                        onPress={() => deleteUser(navigation)}
                        title="Delete Account"
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 0,
        color: 'white',
        marginTop: 30,
        padding: 10,
    },
    container: {
        // marginTop: 30,
        marginHorizontal: 10,
        flexDirection: "column",
        // justifyContent: "center",
    },
    view: {
       marginBottom: 40
    },
    value: {
        fontSize: 24,
        marginVertical: 12
    }
});

export default Setting;
