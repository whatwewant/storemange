var User = require('../models/user');
var Store = require('../models/store');
var Activity = require('../models/activity');
var _ = require('underscore');

module.exports = {
  getListPage: function (req, res, next) {
    Activity
      .find({})
      .populate('submitter solver', 'nickname')
      .exec(function (err, activities) {
        if (err) return next(err);

        res.render('activity', {
          title: '历史记录',
          activities: activities,
        });
      });
  },

  list: function (req, res, next) {
    var start = req.query.start || 0;
    var count = req.query.count || 10;

    Activity
      .find({})
      .sort({ updateAt: -1, createdAt: -1 })
      .exec(function (err, activities) {
        if (err) return next(err);

        return res.json({
          meta: {
            start: start,
            count: count,
            total: activities.length,
          },
          data: activities.slice([start, count]),
        });
      });
  },
  create: function (req, res, next) {
    var _activity = req.body.activity;

    var activity = new Activity(_activity);

    activity.save(function (err, _gactivity) {
      if (err) return next(err);

      return res.json(_gactivity);
    });
  },
  retrieve: function (req, res, next) {
    var id = req.params.id;

    if (id) {
      Activity
        .findOne({_id: id})
        .populate('submitter solver', 'nickname')
        .exec(function (err, activity) {
          if (err) return next(err);

          if (! activity) return res.json({ errcode: 400001, errmsg: 'activity not found'});

          return res.json(activity);
        });
    }
  },
  update: function (req, res, next) {
    var id = req.params.id;
    var _activity = req.params.activity;

    if (id) {
      Activity
        .findOne({_id: id})
        .exec(function (err, activity) {
          if (err) return next(err);

          if (! activity) return res.json({ errcode: 400002, errmsg: 'activity not found' });

          var _n_activity = _.extend({}, activity, _activity);

          _n_activity.save(function (err, ac) {
            if (err) return next(err);

            return res.json(ac);
          });
        });
    }
  },
  delete: function (req, res, next) {
    var id = req.params.id;

    if (id) {
      Activity
        .findOneAndRemove({_id: id})
        .exec(function (err, ac) {
          if (err) return next(err);

          if (! ac) return res.json({ errcode: 400004, errmsg: 'activity not found' });

          return res.json({
            errcode: 400005,
            errmsg: 'activity removed',
          });
        });
    }
  },
};
