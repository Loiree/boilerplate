const mongoose = require('libs/mongoose'),
      Schema = mongoose.Schema;


let schema = new Schema({
  title: { type: String, default: "" }
}, {
  timestamps: true
});


exports.Test = mongoose.model('Test', schema);