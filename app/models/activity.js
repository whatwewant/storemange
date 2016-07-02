/****************************************************
  > File Name    : app/models/activity.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时27分46秒
 ****************************************************/
var mongoose = require('mongoose');

var ActivitySchema = require('../schemas/activity');

var Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
