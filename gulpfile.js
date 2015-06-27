var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var exec = require('child_process').exec

var sourceFiles = 'src/**/*.js'
var testFiles = 'test/**/*.js'
var standardFiles = 'test/* src/* gulpfile.js'

gulp.task('default', ['build', 'test'])

gulp.task('build', function () {
  return gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('serve', function () {
  exec('./node_modules/nodemon/bin/nodemon.js ./dist/server.js')
})

gulp.task('watch', function () {
  gulp.watch([sourceFiles, testFiles], ['build', 'test'])
})

gulp.task('test', function () {
  exec('./node_modules/standard/bin/cmd.js ' + standardFiles + ' && mocha --compilers js:babel/register', function (err, stdout, stderr) {
    console.log(stdout)
    if (err) {console.log(stderr)}
  })
})
