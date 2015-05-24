var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
// var options = {};
gulp.task('deploy', function() {
  return gulp.src('./preview/**/*')
    .pipe(deploy());
});
gulp.task('default', ['deploy']);