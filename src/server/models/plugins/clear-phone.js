// Удаляет из поля phone все лишние символы, оставляя только цифры

module.exports = exports = function clearPhone (schema, options) {

  schema.pre('save', function (next) {
    if (this.phone) {
      this.phone = this.phone.replace(/[^0-9]/gim, '');
    }
    next();
  });

}