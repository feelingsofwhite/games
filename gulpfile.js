var gulp = require('gulp');
//var console = require('console');
//var del = require('del');
var connect = require('gulp-connect');
var open = require('open');
//var less = require('gulp-less');
//var path = require('path');
//var sourcemaps = require('gulp-sourcemaps');
//var jslint = require('gulp-jslint');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish')
var plumber = require('gulp-plumber');
var beep = require('beepbeep');

gulp.task('js', function(){
    return gulp
      .src(['**/*.js', '!bower_components/**', '!node_modules/**'])
      .pipe(plumber({
            errorHandler: function(e){
                  beep();
                  console.log(e);
                  this.emit('end');
              }
          }))
       .pipe(jshint({
                   asi: false
               }))
       .pipe(jshint.reporter(jshintStylish));
});


var port = 2002; 
gulp.task('connect', function() {
  console.log('server started')
  connect.server({
    root: '.',
    livereload: true,
    port: port
  });
});

gulp.task('launch', function(){
  console.log('launching browser');
  open('http://localhost:' + port);
}) 


gulp.task('default', ['js', 'connect', 'launch']);