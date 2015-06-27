var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var concat = require('gulp-concat')
var exec = require('child_process').exec

gulp.task('default', ['build', 'test'])

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('server.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['build'])
  gulp.watch(['./src/**/*.js', './test/**/*.js'], ['test'])
})

gulp.task('test', function () {
  exec('mocha --compilers js:babel/register', function (err, stdout, stderr) {
    if (err) {return err}
    if (stderr) {console.log(stderr)}
    console.log(stdout)
  })
})
