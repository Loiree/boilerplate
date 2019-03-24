const multer  = require('multer'),
      fs = require('fs'),
      shell = require('shelljs'),
      SystemError = require('error/system').SystemError



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Папка загрузки. Если есть поле filePath, то папка загрузки назначается в нем
    let filePath = req.body.filePath
    if (filePath) {
      // Если нет папки по filePath - создаем
      fs.stat(filePath, function(err, stat) {
        if (err) {

          // Если папки не существует - создаем
          if (err.code === "ENOENT") {
            shell.mkdir('-p', filePath)
            cb(null, filePath)

          // Иначе какая-то другая ошибка, обрабатываем
          } else {
            return new SystemError(err)
          }

        // Если папка уже есть - используем ее
        } else {
          cb(null, filePath);
        }
      })

    // Задаем стандартную папку под загрузку
    } else {
      cb(null, 'uploads/')
    }
  },
  filename: function (req, file, cb) {
    // Имя файла
    let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })


exports.upload = upload