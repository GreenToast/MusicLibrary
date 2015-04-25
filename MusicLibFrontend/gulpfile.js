var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var recursive = require('recursive-readdir');
var rmdir = require( 'rmdir' );
var fs = require('fs');

var paths = {
  scripts: ['app/js/**/*.js'],
  images: 'app/img/**/*',
  libs: ['app/lib/**/*.min.js','!app/lib/jqueryui/ui/**/*.min.js','app/lib/**/*.map'],
  html: ['app/templates/**/*.*','app/index.html'],
  css: ['app/css/**/*.css']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
    var basedir= 'build';
    var files = fs.readdirSync(basedir);
    files.forEach(function(dir){
        del(basedir+'/'+dir);
    });
    cb();
});

/*gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write('../js'))
    .pipe(gulp.dest('build/js'));
});*/

// Copy all static images
gulp.task('scripts', function() {
  return gulp.src(paths.scripts, { base: './app/' })
    // Pass in options to the task
    .pipe(gulp.dest('build')); 
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images, { base: './app/' })
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build')); 
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('app/**/*.*', ['clean','scripts', 'images', 'move','reload']);
});

gulp.task('reload', function() {
  gulp.src('app/**/*.*').pipe(connect.reload());
});


gulp.task('move',['clean'], function(){
    gulp.src(paths.html.concat(paths.css).concat(paths.libs), { base: './app/' })
        .pipe(gulp.dest('build'));
});

gulp.task('startServer',function(){ 
    connect.server({
        root: ['build'],
        livereload: true,
        port: 9000
    });
});


// The default task (called when you run `gulp` from cli)
gulp.task('run', ['clean','watch', 'scripts', 'images', 'move', 'startServer']);
gulp.task('build', ['clean','scripts', 'images', 'move']);