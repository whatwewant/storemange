/****************************************************
  > File Name    : app/schemas/user.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 07时48分37秒
 ****************************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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

var SALT_WORK_FACTORY = 10;
UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        var user = this;
        bcrypt.genSalt(SALT_WORK_FACTORY, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) return cb(err);

            cb(null, isMatch);
        });
    }
};



