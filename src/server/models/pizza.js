const mongoose = require('libs/mongoose'),
      Schema = mongoose.Schema;





let schema = new Schema({
  title: {
    type: String,
    trim: true,
    default: ""
  },
  pos: {
    type: Number,
    default: 9999
  },
  cond: {
    type: String,
    trim: true,
    default: ""
  },
  img: {
    type: String,
    trim: true,
    default: ""
  },
  size: {
    type: Array,
    default: []
  },
  cat: {
    type: Array,
    default: []
  },
  price: {
    type: Array,
    default: []
  },
  placed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});





let validator = (record) => {
  error = record.validateSync();
  return error;
};





exports.Pizza = mongoose.model('Pizza', schema);
exports.validator = validator;