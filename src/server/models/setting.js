const mongoose = require('libs/mongoose'),
      Schema = mongoose.Schema;





let schema = new Schema({
  login: { type: String, trim: true, default: "" },
  pass: {  type: String, default: "" },
  emailLogin: { type: String, trim: true, default: "",
    match: [/@/, 'Поле "e-mail" заполнено неверено'] },
  emailPass: { type: String, default: "" },

  phone:       {type: String, trim: true, default: ""},
  workTime:    {type: String, trim: true, default: ""},
  city:        {type: String, trim: true, default: ""},
  address:     {type: String, trim: true, default: ""},
  emailCommon: {type: String, trim: true, default: ""}
}, {
  timestamps: true
});





let validator = (record) => {
  error = record.validateSync();
  return error;
};





exports.Setting = mongoose.model('Setting', schema);
exports.validator = validator;