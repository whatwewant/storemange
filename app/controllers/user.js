/****************************************************
  > File Name    : app/controllers/admin.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时29分12秒
 ****************************************************/

var User = require('../models/user');
var _ = require('underscore');
var moment = require('moment');

module.exports = {
    // page
    getListPage: function (req, res) {
        console.log(123);
        User
          .find({})
          .sort('-status.active')
          .sort({
              updateAt: -1,
          })
          .exec(function (err, users) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.render('user', {
                title: '管理员列表',
                users: users,
            });
          });
    },
    getCreatePage: function (req, res) {
        res.render('user-create', {
            title: '创建管理员',
            user: {},
        });
    },
    getRetrievePage: function (req, res) {
        var id = req.params.id;
        
        if (id) {
            User
              .find({_id: id})
              .exec(function (err, user) {
                res.render('user-retrieve', {
                    title: '管理员 ' + user.nickname + ' 的详细信息',
                    user: user,
                });
              });
        }
    },
    getUpdatePage: function (req, res) {
        var id = req.params.id;
        if (id) {
            User
              .find({_id: id})
              .exec(function (err, user) {
                res.render('user-update', {
                    title: '更新管理员 ' + user.nickname + ' 的信息',
                    user: user,
                });
              });
        }
    },

    // form post
    postCreate: function (req, res) {
        var {nickname, username, password} = req.body.user;

        if (nickname, username && password) {
            User
              .findOne({username: username})
              .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                if (user) {
                    return res.render('alert', {
                        title: '温馨提示',
                        errcode: 400001,
                        errmsg: '该用户名已存在, 请重新注册!',
                    });
                }

                var _ = new User({nickname, username, password});
                _.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        return sendStatus(500);
                    }

                    return res.redirect('/admin/user');
                });
              });
        }
    },
    postUpdate: function (req, res) {
        var id = req.params.id;
        var _user = req.body.user;

        if (id) {
            User
              .findOne({_id: id})
              .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                user = _.extend(user, _user);
                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    res.redirect('/admin/user/' + user._id);
                });
              });
        }
    },

    // rest get/post + get/put/delete
    // -- many
    list: function (req, res) {
        var start = req.query.start || 0;
        var count = req.query.count || 0;

        user
          .find({})
          // .limit(count)
          .sort({createdAt: 1})
          .exec(function (err, users) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.json({
                meta: {
                    start: start,
                    count: count,
                    total: users.length,
                },
                data: users.slice([start, count]),
            });
          });
    },
    create: function (req, res) {
        var {username, password} = req.body.user;

        if (username && password) {
            User
              .findOne({username: username})
              .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                if (user) {
                    return res.json({
                        errcode: 400001,
                        errmsg: '该用户名已存在, 请重新注册!',
                    });
                }

                var _ = new User({username: username, password: password});
                _.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        return sendStatus(500);
                    }

                    return res.json(user);
                });
              });
        }
    },
    // -- one
    retrieve: function (req, res) {
        var id = req.params.id;

        if (id) {
            User
              .findOne({_id: id})
              .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                // console.log(user);
                // user.createdAt = moment(user.createdAt).format('llll');
                // user.updatedAt = moment(user.updatedAt).format('MM/DD/YYYY HH:mm:SS [CST]ZZ');
                // console.log(user);

                res.json(user);
              });
        }
    },
    update: function (req, res) {
        var id = req.params.id;
        var _user = req.body.user;

        if (id) {
            User
              .findOne({_id: id})
              .exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                user = _.extend(user, _user);
                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    res.json(user);
                });
              });
        }
    },
    delete: function (req, res) {
        var id = req.params.id;

        if (id) {
            User
              .findOneAndRemove({_id: id}, function (err, user) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                if (! user) {
                    return res.sendStatus(404);
                }

                return res.json(user);
              })
        }
    },

    // permissions
};

