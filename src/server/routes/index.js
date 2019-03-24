const errorhandler  = require('errorhandler'),
      upload        = require('libs/multer').upload





module.exports = function(app) {


  // CLIENT
  ////////////////////////////////
  app.get('/', require('./client/home').get)





  // HUB
  ////////////////////////////////
  // app.get('/hub/auth', function(req, res, next) { res.render('hub/auth'); } );

  // app.route('/hub/auth')
  //   .get(  require('./hub/auth').get )
  //   .post( require('./hub/auth').login )
  // app.get('/hub/logout',        require('./hub/auth').logout )


  app.get('/hub', require('./hub/home').get)

  // app.get('/hub/pizza-add', require('./hub/pizza').add);
  // app.get('/hub/pizza-upd', require('./hub/pizza').upd);

  // app.get('/hub/drink', require('./hub/drink').get);
  // app.get('/hub/drink-add', (req, res, next) => {res.render('hub/drink-add');} );
  // app.get('/hub/drink-upd', require('./hub/drink').upd);

  // app.get('/hub/cat', require('./hub/cat').get);
  // app.get('/hub/cat-add', (req, res, next) => {res.render('hub/cat-add');} );
  // app.get('/hub/cat-upd', require('./hub/cat').upd);

  // app.get('/hub/promo', require('./hub/promo').get);
  // app.get('/hub/promo-add', (req, res, next) => {res.render('hub/promo-add');} );
  // app.get('/hub/promo-upd', require('./hub/promo').upd);

  // app.get('/hub/settings', require('./common').getOneOrCreate);

  // app.post('/hub/dnd-save', upload.any(), require('./hub/dnd').save );

  // app.post('/hub/add', upload.any(), require('./crud').add );
  // app.post('/hub/upd', upload.any(), require('./crud').upd );
  // app.post('/hub/del', require('./crud').del);





  // // Страница 404
  // app.use( (req, res) => {
  //   res.status(404).render('pages/404');
  // });

  // // При передаче в next() err — выводим ошибку
  // app.use( (err, req, res, next) => {
  //   if (app.get('env') == 'development') {
  //     app.use(errorhandler());
  //     let errorHandler = errorhandler();
  //     errorHandler(err,req,res,next);
  //   } else {
  //     log.error(err);
  //     res.end(err);
  //   }
  // });

}





// ПЕРЕДАТЬ ПЕРЕМЕННУЮ
// СПОСОБ 1
// app.get('/some', require('./home').some("data string"));

// СПОСОБ 2
// let home = require('./home');
// app.get('/some', home.some.bind(home, {myParam: "Hello"}));
// ==============================