/****************************************************
  > File Name    : app/schemas/store.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 07时45分37秒
 ****************************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var StoreSchema = module.exports = new Schema({
    belongsTo: {type: ObjectId, ref: 'User'},
    manipulator: {type: ObjectId, ref: 'User'},
    name: {type: String, trim: true, required: true},
    remain: {type: Number, default: 0},
    total: {type: Number, default: 0},
    comment: String,
}, {timestamps: true});
