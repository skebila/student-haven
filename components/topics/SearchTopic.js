import { View, TextInput, StyleSheet, TouchableOpacity,  } from 'react-native'
import React from 'react'
import { Ionicons } from 'react-native-vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchTopic = () => {
    return (
        <SafeAreaView>
        
            <View style={styles.searchBarContainer}>
                <TouchableOpacity>
                    <Ionicons name='search' style={styles.searchIcon} />
                </TouchableOpacity>
                <TextInput placeholder={'Search for a topic'}
                    placeholderTextColor={'#CDD0CB'} style={styles.TextInput} />
            </View>            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#444444',
        borderRadius: 10,
        paddingLeft: 10,
        marginHorizontal: 20,
        marginTop: 20,
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
        //transform: [{rotate: '90deg'}]
    }
})
export default SearchTopic