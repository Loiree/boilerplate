const config      = require('config'),
      path        = require('path'),
      SystemError = require('error/system').SystemError,
      _db         = require('libs/db')



exports.get = function(req, res, next) {

  (async () => {

    res.sendFile(path.join(config.get('@hub'), 'index.html'))

  })().catch( (err) => { if (err) return new SystemError(err) })

}