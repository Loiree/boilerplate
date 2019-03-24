// Обработка ошибки базы данных
const path  = require('path'),
      util  = require('util'),
      http  = require('http'),
      log   = require('libs/log')(module)



function DBError(err) {
  Error.captureStackTrace(this, DBError)


  if (err.name === "ValidationError") {
    err.mess = err.toString().replace(/ValidationError: /g, '') || http.STATUS_CODES[500] || "не указано"

    // CastError — ошибка типа полей, вместо Number - String и т.д.
    if ( /CastError/.test(err.mess) ) {
      err.mess = "Неправильно заполнены некоторые поля!"
    }
  } else if (err.name === "MongoError" && err.code === 11000) {
    err.mess = "Одно из полей не является уникальным и уже есть в базе"
  } else {
    err.mess = "Произошла непредвиденная ошибка при работе с базой данных."
  }


  log.error("\n----------------------------------------\n"
    + "       Type: " + err.name
    + "\n       Status: " + err.status
    + "\n       Message: " + err.mess
    + "\n\n       Stack: " + err.stack
    + "\n----------------------------------------")
}



util.inherits(DBError, Error)

DBError.prototype.name = 'DBError'

exports.DBError = DBError