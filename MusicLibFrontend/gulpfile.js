var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

var paths = {
  scripts: ['app/js/**/*.js'],
  images: 'app/img/**/*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
  .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      //.pipe(sourcemaps.write())
    .pipe(sourcemaps.write('../js'))
    .pipe(gulp.dest('build/js'));
});

/*gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('../js'))
    .pipe(gulp.dest('build/js'));
});*/

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img')); 
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

var filesToMove = [
        'app/templates/**/*.*',
        'app/index.html',
        'app/css/**/*.*',
        
        //'!app/css/ext/*.*'
    ];

var angularlibsToMove = [
        'node_modules/angular/**/*.min.js',
        'node_modules/angular/**/*.map',
        'node_modules/angular-route/**/*.min.js',
        'node_modules/angular-route/**/*.map',
        'node_modules/angular-route/**/*.min.js',
        'node_modules/angular-route/**/*.map'
    ];

var bootstraplibsToMove = [
        'node_modules/bootstrap/dist/**/*.min.js',
    ];

var jQuerylibsToMove = [
        'node_modules/jquery/dist/**/*.min.js',
        'node_modules/jquery/dist/**/*.map'
    ];

var jQueryUilibsToMove = [
        'app/lib/**/*.min.js',
    ];

gulp.task('move',['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
    gulp.src(filesToMove, { base: './app/' })
        .pipe(gulp.dest('build'));
    gulp.src(angularlibsToMove, { base: './node_modules/' })
        .pipe(gulp.dest('build/lib'));
    gulp.src(bootstraplibsToMove, { base: './node_modules/bootstrap/dist/js' })
        .pipe(gulp.dest('build/lib/bootstrap'));    
    gulp.src(jQuerylibsToMove, { base: './node_modules/jquery/dist/' })
        .pipe(gulp.dest('build/lib/jquery'));
    gulp.src(jQueryUilibsToMove, { base: './app/' })
        .pipe(gulp.dest('build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'move']);