var gulp = require('gulp')

gulp.task('json', () => {//将json和jsonc文件复制到dist目录下
  return gulp.src(['src/**/*.jsonc', 'src/**/*.json', '!*.ts'])
    .pipe(gulp.dest('dist'))
})
gulp.task('copy',
  gulp.series('json')
)
