//'use strict'
//var util = require('util')
//var TrackerBase = require('./tracker-base.js')
//var Tracker = require('./tracker.js')
//var TrackerStream = require('./tracker-stream.js')

//var TrackerGroup = module.exports = function (name) {
  //TrackerBase.call(this, name)
  //this.parentGroup = null
  //this.trackers = []
  //this.completion = {}
  //this.weight = {}
  //this.tot
//}

import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/Events_newPost/AddNewPost'

const EventAddPost = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default EventAddPost
