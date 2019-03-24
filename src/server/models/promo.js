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
  img: {
    type: String,
    trim: true,
    default: ""
  },
  text: {
    type: String,
    trim: true,
    default: ""
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





exports.Promo = mongoose.model('Promo', schema);
exports.validator = validator;