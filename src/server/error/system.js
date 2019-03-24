// Обработка системной ошибки
const path  = require('path'),
      util  = require('util'),
      http  = require('http'),
      log   = require('libs/log')(module)



function SystemError(message, filename, line) {
  Error.apply(this, arguments)
  Error.captureStackTrace(this, SystemError)


  this.status   = 500
  this.message  = message || http.STATUS_CODES[this.status] || "не указана"
  this.stack    = message.stack || "не обнаружен"


  log.error("\n----------------------------------------\n"
    + "       Type: System error"
    + "\n       Status: " + this.status
    + "\n       Message: " + this.message
    + "\n\n       Stack: " + this.stack
    + "\n----------------------------------------")

}



util.inherits(SystemError, Error)

SystemError.prototype.name = 'SystemError'

exports.SystemError = SystemError