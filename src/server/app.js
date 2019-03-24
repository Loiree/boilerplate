console.log('\n\n\n\n\n\n========================')

const express     = require('express'),
      path        = require('path'),
      config      = require('config'),
      log         = require('libs/log')(module),
      session     = require('express-session'),
      favicon     = require('serve-favicon'),
      mongoose    = require('libs/mongoose')


const app       = express()

app.listen(config.get('port'), () => {
  log.info(`Server start on port: ${config.get('port')}`)
})



// ALIASES
config.set('@client', path.join(__dirname, '/../../dist/client/'))
config.set('@hub',    path.join(__dirname, '/../../dist/hub/'))
config.set('@root',   path.join(__dirname, '/../../'))



// STATIC
app.use(express.static(config.get('@client') + 'js'))
app.use(express.static(config.get('@client') + 'css'))
app.use(express.static(config.get('@client') + 'img'))
app.use(express.static(config.get('@client') + 'fonts'))
app.use(express.static(config.get('@hub') + 'js'))
app.use(express.static(config.get('@hub') + 'css'))
app.use(express.static(config.get('@hub') + 'img'))
app.use(express.static(config.get('@hub') + 'fonts'))

app.use(favicon(path.join(config.get('@client'), 'static/favicon.ico' )))
app.use(favicon(path.join(config.get('@hub'), 'static/favicon.ico' )))



// SESSIONS
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: config.get('session:secret'),
  cookie: { maxAge: config.get('session:cookie:maxAge') },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))



// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// ROUTES
require('routes')(app)