import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {firebase} from "../../firebase";
import {Ionicons} from "react-native-vector-icons";

const handleSignout = async () =>
{
    try {
        await firebase.auth().signOut()
        console.log('Signed out successfully!')
    } catch (error) {
        console.log(error)
    }
}

const Menu = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.push("SettingScreen")
                            }
                            }
                        >
                            <Ionicons name='settings-outline' style={styles.buttonIcon} />
                            <Text style={[{color: "white"},styles.textStyle]}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.push("AboutScreen")
                            }}
                        >
                            <Ionicons name='information-circle-outline' style={styles.buttonIcon} />
                            <Text style={[{color: "white"},styles.textStyle]}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.push("HelpScreen")
                            }}
                        >
                            <Ionicons name='help-circle-outline' style={styles.buttonIcon} />
                            <Text style={[{color: "white"},styles.textStyle]}>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                handleSignout()
                            }}
                        >
                            <Ionicons name='log-out-outline' style={styles.buttonIcon} />
                            <Text style={[{color: "white"},styles.textStyle]}>Sign out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Ionicons name='close' style={styles.buttonIcon} />
                            <Text style={[{color: "white"},styles.textStyle]}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{marginTop: '5%'}}>
                <Ionicons name='menu' style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#1b1c1b",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        flexDirection: "row",
        width: "100%",
        height: 30,
        margin: 10,
        backgroundColor: "#232623"
    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonIcon: {
        color: 'white',
        fontSize: 20,
        marginRight: 10
    },
    icon: {
        color: 'white',
        fontSize: 30
    },
})

export default Menu
