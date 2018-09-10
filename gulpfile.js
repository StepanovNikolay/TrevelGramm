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
    },
    fonts: {
      src: './src/assets/fonts/*.*',
      dest: './dist/assets/fonts'
    },
    images: {
      src: './src/assets/images/*.*',
      dest: './dist/assets/images'
    },
    icons: {
      src: './src/assets/images/icons/*.*',
      dest: './dist/assets/images/icons'
    }
}



function watch() {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.fonts.src, fonts);

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


function fonts() {
 return gulp.src(paths.fonts.src)
 .pipe(gulp.dest(paths.fonts.dest))
}

function images() {
  return gulp.src(paths.images.src)
  .pipe(gulp.dest(paths.images.dest))
}

function icons() {
  return gulp.src(paths.icons.src)
  .pipe(gulp.dest(paths.icons.dest))
}
 


exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.fonts = fonts;
exports.images = images;
exports.icons = icons;




gulp.task('default',gulp.series(
  clean,
  gulp.parallel(styles, templates, scripts, fonts, images, icons),
  gulp.parallel(watch, server )
));