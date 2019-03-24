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
  size: {
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





exports.Drink = mongoose.model('Drink', schema);
exports.validator = validator;