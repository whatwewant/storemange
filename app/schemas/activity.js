var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var ActivitySchema = module.exports = new Schema({
  name: { type: String, required: true, trim: true },
  action: { type: String, trim: true },
  submitter: { type: ObjectId, ref: 'User' },
  solver: { type: ObjectId, ref: 'User', default: null },
  // 0  - default not verify
  // -1 - rejected
  // 1  - approved
  status: { type: Number, default: 0 },
  comment: { type: String, default: '', trim: true },
  materiel: [{ type: ObjectId, ref: 'Store' }],
}, {
  timestamps: true,
  strict: true,
});


ActivitySchema.methods = {
  addMaterial: function (store, cb) {
    this.materiel.push(store);
    this.save(cb);
  },
  approve: function (cb) {
    this.status = true;
    this.save(cb);
  },
};


ActivitySchema.statics = {
  fetch: function (cb) {
    this
      .find({})
      .exec(cb);
  },
  fetchByStatus: function (status, cb) {
    this
      .find({ status: status })
      .exec(cb);
  },
  fetchBySubmitter: function (id, cb) {
    this
      .find({ submitter: id })
      .exec(cb);
  },
  fetchBySolver: function (id, cb) {
    this
      .find({ solver: id})
      .exec(cb);
  },
  fetchOne: function (id, cb) {
    this
      .findOne({ _id: id })
      .exec(cb);
  },
};
