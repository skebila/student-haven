import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import BottomTabs from '../components/home/BottomTabs'


const SelectTopic = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Accommodation'},
          {key: 'Events'},
        ]}
                renderItem={({ item }) => <TouchableOpacity onPress={() =>
                    navigation.push(item.key + 'AddPostScreen')
                }>
                    <Text style={styles.item}>--  {item.key}</Text>
                </TouchableOpacity>
                }
      />
    </View>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  )
}

const Header = () => {
  return (
      <View style={styles.headerContainer}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: "900",
          textAlign: 'center',
        }}>Select Post Topic</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      height:'100%',
      //flex: 1,
  },
  headerContainer: {
      marginHorizontal: 0,
      color: 'white',
      marginTop: 10,
      padding: 10,
    },
    headerText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '900',
      marginRight: 23,
      textAlign: 'center',
        
  },
    item: {
        color: '#F24A72',
        marginLeft: 20,
        fontSize: 14,
        padding: 10,
      fontWeight: '700',
    }
})

export default SelectTopic