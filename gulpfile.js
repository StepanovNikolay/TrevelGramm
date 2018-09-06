const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackCongig = require('./webpack.config');
const browserSync = require('browser-sync').create();


const paths = {
    root: './dist',
    templates: {
      pages: './src/views/pages/*.pug',
      src: './src/views/**/*.pug',
      dest: './dist'
    },
    styles : {
      main:'./src/assets/styles/main.scss',
      src: './src/assets/styles/**/*.scss',
      dest: './dist/assets/styles'
    },
    scripts: {
      src: './src/assets/scripts/*.js',
      dest: './dist/assets/scripts'
    }
}

function watch() {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}


function templates() {
  return gulp.src(paths.templates.pages)
     .pipe(pug({pretty: true}))
     .pipe(gulp.dest(paths.root))
}

function clean() {
  return del(paths.root)
}

function styles() {
  return gulp.src(paths.styles.main)
  .pipe(sourcemaps.init())
  .pipe(postcss(require("./postcss.config")))
  .pipe(sourcemaps.write())
  .pipe(rename("main.min.css"))
  .pipe(gulp.dest(paths.styles.dest))

}

function scripts() {
  return gulp.src(paths.scripts.src)
  .pipe(gulpWebpack(webpackCongig, webpack))
  .pipe(gulp.dest(paths.scripts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;

gulp.task('default',gulp.series(
  clean,
  gulp.parallel(styles, templates, scripts),
  gulp.parallel(watch, server)
));