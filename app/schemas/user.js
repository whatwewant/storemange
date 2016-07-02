/****************************************************
  > File Name    : app/schemas/user.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 07时48分37秒
 ****************************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = module.exports = new Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {type: String, required: true},
    nickname: {type: String, default: '仓库一员'},
    openid: String,
    phone: {type: String, trim: true},
    
    // 0 - new member
    // 10 - admin
    // 50 - superadmin
    role: {type: Number, default: 0},

    // status
    status: {
        active: {type: Boolean, default: true},
        login: {
            last: {
                ip: String,
                ua: String,
                datetime: {type: Date, default: Date.now},
            }
        }
    },
}, {timestamps: true});
