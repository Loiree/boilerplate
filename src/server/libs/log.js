// Настройки логгера Winston. Запись лога в файлы в папке logs

const  winston = require('winston'),
      ENV = process.env.NODE_ENV || 'development'


function getLogger(module) {

  const path = module.filename.split('\\').slice(-2).join('/')

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
      }),
      new (winston.transports.File)({
        colorize: true,
        name: 'info-file',
        filename: 'src/server/logs/filelog-info.log',
        level: 'info'
      }),
      new (winston.transports.File)({
        name: 'error-file',
        filename: 'src/server/logs/filelog-error.log',
        level: 'error'
      })
    ]
  })
}

module.exports = getLogger