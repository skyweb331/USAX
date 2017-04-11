var autoprefixer     = require('gulp-autoprefixer');
var browserSync      = require('browser-sync').create();
var changed          = require('gulp-changed');
var concat           = require('gulp-concat');
var connect          = require('gulp-connect');
var es               = require('event-stream');
var env              = require('node-env-file');
var gulp             = require('gulp');
var gulpif           = require('gulp-if');
var imagemin         = require('gulp-imagemin');
var pug              = require('gulp-pug');
var jshint           = require('gulp-jshint');
var lib              = require('./app/assets');
var cssnano          = require('gulp-cssnano');
var ngAnnotate       = require('gulp-ng-annotate');
var notify           = require('gulp-notify');
var plumber          = require('gulp-plumber');
var reload           = browserSync.reload;
var rename           = require('gulp-rename');
var runSequence      = require('run-sequence');
var sass             = require('gulp-sass');
var size             = require('gulp-size');
var sourcemaps       = require('gulp-sourcemaps');
var uglify           = require('gulp-uglify');

/* jshint ignore:start */
var uglifyConfig = {
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
};
/* jshint ignore:end */

env(__dirname + '/.env');
var development = process.env.NODE_ENV === 'development';
var production = process.env.NODE_ENV === 'production';

function buildDev(callback) {
  runSequence('html',
              'pug',
              'styles',
              'scripts',
              'styles-bundle',
              'scripts-bundle',
              'fonts',
              'images',
              callback);
}

function buildProd(callback) {
  runSequence('html',
              'pug',
              'styles',
              'scripts',
              'styles-bundle',
              'scripts-bundle',
              'fonts',
              'images-min',
              callback);
}

// Styles
gulp.task('styles', function() {

    var dest = './dist/css/';

    return gulp.src( 'app/scss/**/*.scss' )
      .pipe( changed( dest ) )
      .pipe( plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }) )
      .pipe( gulpif( development, sourcemaps.init() ))
      .pipe( sass().on('error', sass.logError) )
      .pipe( concat('main.css') )
      .pipe(autoprefixer({
        browsers: [
          'last 2 versions',
          'ie 9',
          'ie 8',
          'android 2.3',
          'android 4',
          'opera 12'
        ]
      }))
      .pipe( gulpif( production, cssnano() ) )
      .pipe( gulpif( development, sourcemaps.write() ) )
      .pipe( plumber.stop() )
      .pipe( size() )
      .pipe( gulp.dest( dest ) )
      .pipe( browserSync.stream() );
});

gulp.task('styles-bundle', function() {
    return gulp.src( lib.styles.files )
      .pipe(plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }))
      .pipe( concat('lib.css') )
      .pipe(autoprefixer({
        browsers: [
          'last 2 versions',
          'ie 9',
          'android 2.3',
          'android 4',
          'opera 12'
        ]
      }))
      .pipe( gulpif( production, cssnano() ))
      .pipe(plumber.stop())
      .pipe( size() )
      .pipe( gulp.dest('./dist/css/') );
});

// Concatenate & Minify JS
gulp.task('scripts', function() {

  var dest = './dist/js/';

  return gulp.src([
          '**/*.module.js',
          'app.module.js',
          '**/*.routes.js',
          '!app/tests/**/*.js',
          'app/js/**/*.js'
        ])
        .pipe( changed( dest ) )
        .pipe( plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }))
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish'))
        .pipe( jshint.reporter('fail'))
        .pipe( gulpif( development, sourcemaps.init() ))
        .pipe( concat('main.js') )
        .pipe( ngAnnotate() )
        .pipe( gulpif( production, uglify() ))
        .pipe( size() )
        .pipe( gulpif( development, sourcemaps.write() ))
        .pipe( plumber.stop() )
        .pipe( gulp.dest( dest ))
        .pipe( browserSync.stream() );
});

gulp.task('scripts-bundle', function() {
    return gulp.src( lib.scripts.files )
      .pipe(plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }))
      .pipe( gulpif( production, uglify() ))
      .pipe( plumber.stop() )
      .pipe( size() )
      .pipe( gulp.dest('./dist/js/plugins') );
});


// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function() {
  return gulp.src([
    'gulpfile.js',
    'app/js/**/*.js'
  ]).pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Images
gulp.task('images', function() {

    var dest = './dist/img/';

    return gulp.src('app/img/**/*')
        .pipe( changed( dest ) )
        .pipe( size() )
        .pipe( gulp.dest( dest ) );
});
gulp.task('images-min', function() {

    var dest = './dist/img/';

    return gulp.src('app/img/**/*')
        .pipe( changed( dest ) )
        .pipe( plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }))
        .pipe( imagemin({
          progressive: true,
          interlaced: true,
          svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
        }))
        .pipe(plumber.stop())
        .pipe( size() )
        .pipe( gulp.dest( dest ) );
});

// Fonts
gulp.task('fonts', function() {

    var dest = './dist/fonts/';

    return gulp.src( lib.fonts.files )
        .pipe( size() )
        .pipe( gulp.dest( dest ) );
});

// Static Templates
gulp.task('html', function() {

  var dest = './dist/';

  return gulp.src('app/views/*.html')
    .pipe( gulp.dest( dest ) );
});

// pug
gulp.task('pug', function() {

  var dest = './dist/';

  return gulp.src(['app/views/**/*.pug', 'app/views/**/*.jade'])
    .pipe( changed( dest ) )
    .pipe( plumber({errorHandler: notify.onError({Error: '<%= error.message %>', sound : 'Bottle'}) }) )
    .pipe(pug())
    .pipe( plumber.stop() )
    .pipe( gulp.dest( dest ) );
});

gulp.task('pug-watch', ['pug'], function () {
  browserSync.reload();
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:8000'
    });
});

// Connect Server
gulp.task('connect', function() {
  connect.server({
    root: ['app', 'dist'],
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000
  });
});


// Clean
// `gulp clean` - Deletes the build folder
gulp.task('clean', function () {
    require('del').sync([
      './dist/css/*',
      './dist/js/*',
      './dist/*.html']
    );
});

gulp.task('build', ['clean'], function(callback) {
  if (production) {
    buildDev(callback);
  } else {
    buildProd(callback);
  }
});

gulp.task('heroku:production', function(callback) {
  runSequence('build-prod', 'heroku:remove-images');
});

gulp.task('heroku:remove-images', function(callback) {
  require('del').sync(['.app/img']);
});

gulp.task('watch', function(callback) {
  runSequence('default', callback);
});

// Default Task
//
gulp.task('default',  ['build'], function(){
    gulp.start('connect');
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/views/**/*.html', ['html']);
    gulp.watch('app/views/**/*.pug', ['pug-watch']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/img/**/*', ['images']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.start('browser-sync');
});
