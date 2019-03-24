const gulp      = require('gulp'),
      webpack   = require('webpack-stream'),
      rename    = require('gulp-rename'),
      path      = require('path'),
      stylus    = require('gulp-stylus'),
      nib       = require('nib'),
      nodemon   = require('gulp-nodemon'),
      cleanCss  = require('gulp-clean-css'),
      imagemin  = require('gulp-imagemin'),
      del       = require('del'),
      imageminJpegRecompress  = require('imagemin-jpeg-recompress'),
      imageminPngquant        = require('imagemin-pngquant')

const PATHS = {
  '@src-client': './src/client',
  '@dist-client': './dist/client',
  '@src-hub': './src/hub',
  '@dist-hub': './dist/hub',
  '@src-server': './src/server',
  '@dist': './dist'
}

// сменить на production для сжатия
const webpackConfig = {
  watch: false,
  mode: 'development',
  entry: {
    app: `${PATHS['@src-client']}/index.js`,
    hub: `${PATHS['@src-hub']}/index.js`
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/' },
    ]
  },
  resolve: {},
  plugins: []
}


const imageminConfig = [
  imagemin.gifsicle({interlaced: true}),
  imageminJpegRecompress({
    progressive: true,
    max: 80,
    min: 70
  }),
  imageminPngquant({quality: [0.7, 0.8]}),
  imagemin.svgo({plugins: [{removeViewBox: true}]})
]



// CLIENT
/////////////////////////////////
function html() {
  del([`${PATHS['@dist-client']}/*.html`])
  return gulp.src(`${PATHS['@src-client']}/*.html`)
    .pipe(gulp.dest(`${PATHS['@dist-client']}`))
}

function stylusTask() {
  return gulp.src(`${PATHS['@src-client']}/styl/*.styl`)
    .pipe(stylus({use: [nib()]}))
    .on('error', console.log)
    .pipe(gulp.dest(`${PATHS['@dist-client']}/css`))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min', extname: '.css'}))
    .pipe(gulp.dest(`${PATHS['@dist-client']}/css`))
}

function static() {
  del([`${PATHS['@dist-client']}/static/*`])
  return gulp.src(`${PATHS['@src-client']}/static/*`)
    .pipe(gulp.dest(`${PATHS['@dist-client']}/static`))
}

function image() {
  return gulp.src(`${PATHS['@src-client']}/img/*`)
    .pipe(imagemin(imageminConfig))
    .pipe(gulp.dest(`${PATHS['@dist-client']}/img`))
}



// HUB
/////////////////////////////////
function htmlHub() {
  del([`${PATHS['@dist-hub']}/*.html`])
  return gulp.src(`${PATHS['@src-hub']}/*.html`)
    .pipe(gulp.dest(`${PATHS['@dist-hub']}`))
}

function stylusTaskHub() {
  return gulp.src(`${PATHS['@src-hub']}/styl/*.styl`)
    .pipe(stylus({use: [nib()]}))
    .on('error', console.log)
    .pipe(gulp.dest([`${PATHS['@dist-hub']}/css`]))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min', extname: '.css'}))
    .pipe(gulp.dest(`${PATHS['@dist-hub']}/css`))
}

function staticHub() {
  del([`${PATHS['@dist-hub']}/static/*`])
  return gulp.src(`${PATHS['@src-hub']}/static/*`)
    .pipe(gulp.dest(`${PATHS['@dist-hub']}/static`))
}

function imageHub() {
  return gulp.src(`${PATHS['@src-hub']}/img/*`)
    .pipe(imagemin(imageminConfig))
    .pipe(gulp.dest(`${PATHS['@dist-hub']}/img`))
}



// COMMON
/////////////////////////////////
function jsTask() {
  return webpack(webpackConfig)
    .pipe(gulp.dest(`${PATHS['@dist-client']}/js`))
    .pipe(gulp.dest(`${PATHS['@dist-hub']}/js`))
}



function nodemonTask(done) {
  return nodemon({
    script: `${PATHS['@src-server']}/app.js`,
    watch: `${PATHS['@src-server']}`,
    done
  }).on('start', function() {})
    .on('restart', function() {})
}



function clearDist(done) {
  del([`${PATHS['@dist']}`])
  done()
}



function watch() {
  gulp.watch(`${PATHS['@src-client']}/*.html`,       gulp.parallel(html))
  gulp.watch(`${PATHS['@src-client']}/styl/*.styl`,  gulp.series(stylusTask))
  gulp.watch(`${PATHS['@src-client']}/**/*.js`,      gulp.series(jsTask))
  gulp.watch(`${PATHS['@src-client']}/static/*`,     gulp.series(static))
  gulp.watch(`${PATHS['@src-client']}/img/*`,        gulp.series(image))

  gulp.watch(`${PATHS['@src-hub']}/*.html`,          gulp.series(htmlHub))
  gulp.watch(`${PATHS['@src-hub']}/styl/*.styl`,     gulp.series(stylusTaskHub))
  gulp.watch(`${PATHS['@src-hub']}/**/*.js`,         gulp.series(jsTask))
  gulp.watch(`${PATHS['@src-hub']}/static/*`,        gulp.series(staticHub))
  gulp.watch(`${PATHS['@src-hub']}/img/*`,           gulp.series(imageHub))
}



exports.default = gulp.parallel(html, stylusTask, static, jsTask, htmlHub, stylusTaskHub, staticHub, nodemonTask, watch)

exports.build   = gulp.parallel(html, stylusTask, static, image, jsTask, htmlHub, stylusTaskHub, staticHub, imageHub)

exports.clearDist = gulp.parallel(clearDist)