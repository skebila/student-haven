import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import  React, { useState, useEffect } from 'react'

const TopicList = ({navigation}) => {
    return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Accommodation'},
          {key: 'Events'},
        ]}
                renderItem={({ item }) => <TouchableOpacity onPress={() =>
                    alert(item.key + ' clicked')
                    //navigation.push(item.key + 'PostScreen')
                }>
                    <Text style={styles.item}>{item.key}</Text>
                </TouchableOpacity>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        color: '#6BB0F5',
        marginLeft: 20,
        fontSize: 18,
        padding: 10,
        fontWeight: '700'
    }
})

export default TopicList