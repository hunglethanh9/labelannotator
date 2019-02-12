var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify-es').default;
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssnano');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');


var jsFiles = ['*.js'];

// Gulp task to copy vendor folder contents
gulp.task('copy-vendor', function () {
  return gulp.src(['./public/assets/**/*.*', '!./public/assets/**/js/*.*'])
    .pipe(gulp.dest('./dist/assets'))
});

// Gulp task to copy templates folder contents
gulp.task('copy-templates', function () {
  return gulp.src('./public/templates/**/*.*')
    .pipe(gulp.dest('./dist/templates'))
});

// Gulp task to clean dist folder
gulp.task('clean', () => del(['dist']));

// Gulp task to minify JavaScript files

// create a list of files in the order required to concatenate
var tdFiles = [
  './public/assets/js/config.js',
  './public/assets/js/allscripts.js'
];
gulp.task('allscripts', function () {
  return gulp.src(tdFiles)
    // generate one script file
    .pipe(concat('allscripts.js'))
    .pipe(gulp.dest('./dist/assets/js'))
    // Minify the file
    .pipe(uglify({
      mangle: {
        toplevel: false
      }
    }))
    // Output
    .pipe(gulp.dest('./dist/assets/js'))
});

// Gulp task to minify HTML files
gulp.task('pages', function () {
  return gulp.src(['./public/**/*.html'])
    .pipe(htmlreplace({
      'js': '<script src="assets/js/allscripts.js"></script>'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Gulp task to watch folders
gulp.task('server', function () {
  var options = {
    script: './server.js',
    delayTime: 1,
    watch: jsFiles,
    ignore: ['node_modules/**', 'test/**', 'build/**']
  };

  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting Server...');
    });
});

// Gulp task to compile sass
gulp.task('sass', function () {
  return gulp.src('./public/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/assets/css'));
});

// Gulp task to build dist folder
gulp.task('build:production', gulp.series('clean', 'copy-vendor', 'copy-templates', 'allscripts', 'pages'));
gulp.task('start:dev', gulp.series('sass', 'server'));
