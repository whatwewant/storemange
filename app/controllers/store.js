/****************************************************
  > File Name    : app/controllers/admin.js
  > Author       : Cole Smith
  > Mail         : tobewhatwewant@gmail.com
  > Github       : whatwewant
  > Created Time : 2016年07月01日 星期五 08时29分12秒
 ****************************************************/

var User = require('../models/user');
var Store = require('../models/store');
var _ = require('underscore');

module.exports = {
    // page
    getListPage: function (req, res) {
        Store
          .find({})
          .populate('belongsTo manipulator', 'nickname')
          .exec(function (err, stores) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            User
              .find({})
              .exec(function (err, users) {
                if (err) {
                  console.log(err);
                  return res.sendStatus(500);
                }

                res.render('store', {
                    title: '仓库储物列表',
                    users: users,
                    stores: stores,
                });
              });
          });
    },
    getCreatePage: function (req, res) {
        User
          .find({})
          .exec(function (err, users) {
            res.render('store-create', {
                title: '创建管理员',
                users: users,
                store: {},
            });
          });
    },
    getRetrievePage: function (req, res) {
        var id = req.params.id;
        
        if (id) {
            Store
              .find({_id: id})
              .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                res.render('store-retrieve', {
                    title: '管理员 ' + store.nickname + ' 的详细信息',
                    store: store,
                });
              });
        }
    },
    getUpdatePage: function (req, res) {
        var id = req.params.id;
        if (id) {
            Store
              .find({_id: id})
              .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                res.render('store-update', {
                    title: '更新管理员 ' + store.nickname + ' 的信息',
                    store: store,
                });
              });
        }
    },

    // form post
    postCreate: function (req, res) {
        var {
            belongsTo,
            manipulator,
            name,
            number,
            comment
        } = req.body.store;

        if (name) {
            Store
              .findOne({name: name})
              // .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                if (store) {
                    return res.render('alert', {
                        title: '温馨提示',
                        errcode: 400001,
                        errmsg: '物料 ' + store.name + ' 已存在!',
                    });
                }

                var _ = new Store({
                    belongsTo,
                    manipulator,
                    name,
                    number,
                    comment,
                });
                _.save(function (err, store) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    return res.redirect('/admin/store');
                });
              });
        }
    },
    postUpdate: function (req, res) {
        var id = req.params.id;
        var _store = req.body.store;

        if (id) {
            Store
              .findOne({_id: id})
              .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                store = _.extend(store, _store);
                store.save(function (err, store) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    res.redirect('/admin/store/' + store._id);
                });
              });
        }
    },

    // rest get/post + get/put/delete
    // -- many
    list: function (req, res) {
        var start = req.query.start || 0;
        var count = req.query.count || 0;

        store
          .find({})
          // .limit(count)
          .sort({createdAt: 1})
          .exec(function (err, stores) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.json({
                meta: {
                    start: start,
                    count: count,
                    total: stores.length,
                },
                data: stores.slice([start, count]),
            });
          });
    },
    create: function (req, res) {
        var {storename, password} = req.body.store;

        if (storename && password) {
            Store
              .findOne({storename: storename})
              // .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                if (store) {
                    return res.json({
                        errcode: 400001,
                        errmsg: '该用户名已存在, 请重新注册!',
                    });
                }

                var _ = new Store({storename: storename, password: password});
                _.save(function (err, store) {
                    if (err) {
                        console.log(err);
                        return sendStatus(500);
                    }

                    return res.json(store);
                });
              });
        }
    },
    // -- one
    retrieve: function (req, res) {
        var id = req.params.id;

        if (id) {
            Store
              .findOne({_id: id})
              .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                res.json(store);
              });
        }
    },
    update: function (req, res) {
        var id = req.params.id;
        var _store = req.body.store;

        if (id) {
            Store
              .findOne({_id: id})
              // .populate('belongsTo manipulator', 'nickname')
              .exec(function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                store = _.extend(store, _store);
                store.save(function (err, store) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }

                    res.json(store);
                });
              });
        }
    },
    delete: function (req, res) {
        var id = req.params.id;

        if (id) {
            Store
              .findOneAndRemove({_id: id}, function (err, store) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                return res.json(store);
              })
        }
    },

    // permissions
};

