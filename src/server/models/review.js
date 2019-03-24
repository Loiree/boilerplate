var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;





var schema = new Schema({
  author: {
    type: String,
    trim: true,
    default: ""
  },
  link: {
    type: String,
    trim: true,
    default: ""
  },
  date: {
    type: String,
    trim: true,
    default: ""
  },
  text: {
    type: String,
    trim: true,
    default: ""
  }
}, {
  timestamps: true
});





let validator = (record) => {
  error = record.validateSync();
  return error;
};





exports.Review = mongoose.model('Review', schema);
exports.validator = validator;