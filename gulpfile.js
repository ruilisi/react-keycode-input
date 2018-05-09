const gulp = require('gulp')
const babel = require('gulp-babel')

function getPresets(env) {
  return [
    [ 'env', {
      loose: true,
      modules: env === 'es' ? false : 'commonjs'
    } ],
    'stage-1',
    'react'
  ]
}

gulp.task('cjs', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: getPresets('cjs')
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('es', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: getPresets('es')
    }))
    .pipe(gulp.dest('es'));
})

gulp.task('default', ['cjs', 'es'])

