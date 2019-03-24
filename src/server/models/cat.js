const mongoose = require('libs/mongoose'),
      Schema = mongoose.Schema;



let schema = new Schema({
  title: {
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



exports.Cat = mongoose.model('Cat', schema);
exports.validator = validator;