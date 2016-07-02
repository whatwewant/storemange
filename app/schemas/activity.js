/****************************************************
  > File Name    : app/schemas/activity.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时02分18秒
 ****************************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var Activity = module.exports = new Schema({
    leader: {type: ObjectId, ref: 'User'},
    name: {type: String, trim: true, required: true},
    comment: {type: String, trim: true},
    returnDate: Date,
    materiel: [{type: ObjectId, ref: 'Store'}],
    status: {type: Boolean, default: true}, // 完成状态
}, {timestamps: true});
