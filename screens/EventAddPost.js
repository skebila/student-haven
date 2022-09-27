'use strict'
var util = require('util')
var TrackerBase = require('./tracker-base.js')
var Tracker = require('./tracker.js')
var TrackerStream = require('./tracker-stream.js')

var TrackerGroup = module.exports = function (name) {
  TrackerBase.call(this, name)
  this.parentGroup = null
  this.trackers = []
  this.completion = {}
  this.weight = {}
  this.tot
}
