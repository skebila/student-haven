import React, { useState } from "react";
import {Button, StyleSheet, Text, View, Switch, SafeAreaView, Alert, Image} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import BottomTabs from "../components/home/BottomTabs";
import {db, firebase} from "../firebase";

// Done by Mona G

const About = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <AboutBody navigation={navigation} />
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
                }}>About Us</Text>
        </View>
    )
}

const AboutBody = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Image source={require('./../logo/HSL_white_v2.png')} style={styles.postHeaderImage}/>
            </View>
            <View style={{alignItems: "center"}}>
                <Text style={styles.value}>Student haven is a revolutionary app for the student community and the purpose of this app is to create a safe space where students can interact with each other and share ideas.</Text>
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
        marginTop: 10,
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
        marginVertical: '20%',
        marginHorizontal: '10%',
    }
});

export default About;
