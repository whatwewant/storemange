/****************************************************
  > File Name    : app/models/store.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时26分43秒
 ****************************************************/
var mongoose = require('mongoose');

var StoreSchema = require('../schemas/store');

var Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
