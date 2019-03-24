// Обертка для работы с Mongoose
// ---------------------------------------

const DBError     = require('error/db').DBError,
      mongoose    = require('libs/mongoose'),
      log         = require('libs/log')(module),
      SystemError = require('error/system').SystemError





// Достаем массив документов
let find = (db, query, sort, limit, skip) => {
  return new Promise( (resolve, reject) => {

    db = require( 'models/' + db.toLowerCase() )[db]
    db.find( query, (err, data) => {
      if (err) return new DBError(err)
      resolve(data)
    }).sort(sort).limit(limit).skip(skip)

  }).catch( (err) => { return new SystemError(err) })
}





// Достаем один документ
let findOne = (db, query, sort, skip) => {
  return new Promise( (resolve, reject) => {

    db = require( 'models/' + db.toLowerCase() )[db]
    db.findOne( query, (err, data) => {
      if (err) return new DBError(err)
      resolve(data)
    }).sort(sort).skip(skip)

  }).catch( (err) => { return new SystemError(err) })
}





// Достаем один документ, если его нет - создаем
let findOneOrCreate = (dbName, query, sort) => {
  return new Promise( (resolve, reject) => {

    (async () => {
      let data = await findOne(dbName, query, sort)

      if (!data) {
        data = {}
        data.db = dbName
        await create(data)

        data = await findOne(dbName, query, sort)
      }
      resolve(data)
    })().catch( (err) => { return new SystemError(err) })

  }).catch( (err) => { return new SystemError(err) })
}





// Сохранение измененного документа
let save = (record, isLog) => {
  return new Promise( (resolve, reject) => {

    if (record) {
      // Проверяем правильность заполненных полей
      validator = require('models/' + record.db.toLowerCase()).validator
      err = validator(record)

      // Если ошибок нет - сохраняем
      if (!err) {
        record.save( (err) => {
          if (err) return new DBError(err)

          if (isLog) log.info("Сохранение в базу: " + record.db)
          resolve(true)
        })

      } else {
        return new DBError(err)
      }

    } else {
      resolve(false)
    }

  }).catch( (err) => { return new SystemError(err) })
}





// Сохранение массива документов по очереди
// arr - массив документов
let saveMultiple = (arr, db) => {
  return new Promise( (resolve, reject) => {

    if (arr) {
      (async () => {
        let i
        for (i=0; i < arr.length; i++) {
          arr[i].db = db
          await save(arr[i])
        }
        resolve(true)
      })().catch( (err) => { return new SystemError(err) })

    } else {
      resolve(false)
    }

  }).catch( (err) => { return new SystemError(err) })
}





// Создание документа
let create = (data) => {
  return new Promise( (resolve, reject) => {

    if (data) {
      // Достаем и создаем базу
      let db = require('models/' + data.db.toLowerCase())[data.db]
      let record = new db(data)

      // Проверяем правильность заполненных полей
      validator = require('models/' + data.db.toLowerCase()).validator
      err = validator(record)

      // Если ошибок нет - сохраняем
      if (!err) {
        record.save( (err) => {
          if (err) return new DBError(err)

          log.info("Запись добавлена в базу: " + data.db)
          resolve(true)
        });
      } else {
        return new DBError(err)
      }

    } else {
      resolve(false)
    }

  }).catch( (err) => { return new SystemError(err) })
}





// Удаление документа
let remove = (record) => {
  return new Promise( (resolve, reject) => {

    if (record) {
      record.remove( (err) => {
        if (err) return new DBError(err)

        log.info("Запись удалена из базы: " + record.db)
        resolve(true)
      });
    } else {
      resolve(false)
    }

  }).catch( (err) => { return new SystemError(err) })
}





// Удаляем все записи в коллекции
let dropCollection = (base) => {
  return new Promise( (resolve, reject) => {
    let db = require('models/' + base.toLowerCase())[base]
    if (db) {
      db.remove({}, function(err) {
        if (err) return new DBError(err)
        resolve(true)
      });
    } else {
      resolve(false)
    }

  }).catch( (err) => { return new SystemError(err) })
}





// Достаем массив документов
let count = (db, query, sort, limit, skip) => {
  return new Promise( (resolve, reject) => {

    db = require( 'models/' + db.toLowerCase() )[db]
    db.count( query, (err, count) => {
      if (err) return new DBError(err)
      resolve(count)
    }).sort(sort).limit(limit).skip(skip)

  }).catch( (err) => { return new SystemError(err) })
}





exports.find = find
exports.findOne = findOne
exports.findOneOrCreate = findOneOrCreate
exports.save = save
exports.create = create
exports.remove = remove
exports.dropCollection = dropCollection
exports.saveMultiple = saveMultiple
exports.count = count