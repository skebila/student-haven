import React, { useState } from "react";
import {Button, StyleSheet, Text, View, Switch, SafeAreaView, Alert, Image, Linking} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import BottomTabs from "../components/home/BottomTabs";
import {db, firebase} from "../firebase";

// Done by Mona G

const Help = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <HelpBody navigation={navigation} />
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
                    color: 'white',
                    fontWeight: "bold",
                    textAlign: 'center',
                }}>Help</Text>
        </View>
    )
}

const HelpBody = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Image source={require('./../logo/HSL_white_v2.png')} style={styles.postHeaderImage}/>
            </View>
            <View style={{alignItems: "center"}}>
                <Text style={styles.value}>Help Support:
                    For any app-related issue, please email us on:
                    studenthaven.2022@gmail.com</Text>
                <Text style={[styles.value, {color: 'blue'}]}>
                    studenthaven.2022@gmail.com
                </Text>
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
    postHeaderImage: {
        width: 200,
        height: 200,
        marginVertical: '20%',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
        paddingHorizontal: 12,
    },
    view: {
        marginBottom: 40
    },
    value: {
        fontSize: 20,
        color: 'white',
        marginHorizontal: '10%',
    }
});

export default Help;
