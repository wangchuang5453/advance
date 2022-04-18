const shell = require('gulp-shell');
const gulp = require('gulp');

const { src, dest } = gulp;

gulp.task('compile', () => {
  return src('*.js').pipe(dest('output/'));
})
