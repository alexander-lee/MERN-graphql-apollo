import gulp from 'gulp';
import source from 'vinyl-source-stream';
import notify from 'gulp-notify';
import nodemon from 'gulp-nodemon';
import webpack from 'gulp-webpack';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

import config from './webpack.config.js';

gulp.task('build', ['sass', 'images', 'server-run'], function() {
  return gulp.src('client/app.js')
    .pipe(notify('Starting Webpack Build'))
    .pipe(webpack(config))
    .pipe(notify('Build Finished'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('webpack-watch', function() {
  config.watch = true;
  return gulp.src('client/app.js')
    .pipe(notify('Watching Webpack Build'))
    .pipe(webpack(config))
    .pipe(notify('Build Finished'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('assets-watch', ['sass', 'images'], function() {
  gulp.watch('./assets/scss/**/*', ['sass']);
  gulp.watch('./public/images/*', ['images']);
});

gulp.task('server-copy', function() {
  return gulp.src(['server/**/*', '!server/**/*.js'])
    .pipe(gulp.dest('dist'))
});

gulp.task('server-build', ['server-copy'], function() {
  return gulp.src('server/**/*.js')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('images', function() {
  return gulp.src('./assets/images/**/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('dev-env', function() {
  return process.env.NODE_ENV = 'development';
})

gulp.task('prod-env', function() {
  return process.env.NODE_ENV = 'production';
})

gulp.task('run', ['server-build'], function() {
  const forbidden = ['client', 'node_modules', 'public', 'dist'];
  nodemon({
    script: './bin/www',
    ext: 'js',
    ignore: forbidden
  })
  .on('restart', ['server-build']);
});

gulp.task('default', ['dev-env', 'webpack-watch', /* 'assets-watch', */ 'run']);
gulp.task('production', ['prod-env', 'webpack-watch', 'assets-watch', 'run'])
