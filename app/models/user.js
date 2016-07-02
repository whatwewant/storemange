/****************************************************
  > File Name    : app/models/user.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时25分26秒
 ****************************************************/
var mongoose = require('mongoose');

var UserSchema = require('../schemas/user');

var User = mongoose.model('User', UserSchema);

module.exports = User;
