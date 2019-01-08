var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var spritesmith = require('gulp-spritesmith');
var del = require('del');
var rename = require("gulp-rename");

/*---------------- browserSync-------------------- */
gulp.task('server', function () {

    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });

    gulp.watch("build/**/*").on("change", browserSync.reload);
});

/*---------------- gulp-pug-------------------- */
gulp.task('pug', function buildHTML() {
    return gulp.src('sourse/template/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
  });

/*----------------gulp-sass-------------------- */
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('sourse/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

/*----------------spritesmith-------------------- */
gulp.task('sprite', function () {
    var spriteData = gulp.src('sourse/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/images/')); 
    spriteData.css.pipe(gulp.dest('sourse/styles/'));
  });

/*----------------del-------------------- */
gulp.task('clean', function() {
    return del('build');
  }); 


/*----------------copy images-------------------- */
gulp.task('copy-images', function () {
    return gulp.src('./sourse/images/**/*.*')
      .pipe(gulp.dest('build/images'));
  });
/*----------------copy fonts-------------------- */
gulp.task('copy-fonts', function () {
    return gulp.src('./sourse/fonts/**/*.*')
      .pipe(gulp.dest('build/fonts'));
  });

/*----------------copy-------------------- */
gulp.task('copy', gulp.parallel('copy-images', 'copy-fonts'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch('source/template/**/*.pug', gulp.series('pug'));
    gulp.watch('source/style/**/*.scss', gulp.series('sass'));
    
  });
  
  gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('pug', 'sass', 'copy'),
    gulp.parallel('watch', 'server')
    )
  );