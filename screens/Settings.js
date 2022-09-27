import React, { useState } from "react";
import {Button, Settings, StyleSheet, Text, View, Switch, SafeAreaView} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import BottomTabs from "../components/home/BottomTabs";

// Done by Mona G
const Setting = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <SettingBody/>
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

const SettingBody = () => {
    const [data, setData] = useState(Settings.get("data"));
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const storeData = data => {
        Settings.set(data);
        setData(Settings.get("data"));
    };
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{marginTop: 15, marginRight: "50%", fontSize: 18}}>Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "gray" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={styles.value}>
                <View style={styles.value}>
                    <Button
                        onPress={() => storeData({ data: "Native" })}
                        title="Change Password"
                    />
                </View>
                <View style={styles.value}>
                    <Button
                        onPress={() => storeData({ data: "Native" })}
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
