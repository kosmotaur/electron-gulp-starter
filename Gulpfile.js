/*eslint-disable no-console*/
'use strict';

var gulp = require('gulp');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = bs.reload;
var shell = require('shelljs');
var path = require('path');

gulp.task('scss', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', function(err) {
      console.log('Error : ' + err.message);
    }))
    .pipe(gulp.dest('dist'));
});
gulp.task('clean', function() {
  shell.rm('-rf', 'dist');
  shell.mkdir('dist');
});
gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});
gulp.task('launch', ['clean', 'scss', 'html'], function() {
  bs.init({
    port: 9000,
    server: {
      baseDir: 'dist'
    },
    open: false,
    notify: false
  });
  gulp.watch('scss/main.scss', ['scss']);
  gulp.watch('index.html', ['html']);
  gulp.watch(
    [
      'dist/**/*.css',
      'dist/**/*.html'
    ]
  ).on('change', function(e) {
      reload(path.basename(e.path));
    });
  shell.exec('./node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron .', {async: true}, function(code, output) {
    console.log('Exit with code: ' + code);
    console.log(output);
  });
});
gulp.task('default', ['launch']);
