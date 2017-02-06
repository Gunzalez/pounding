var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');

gulp.task('runSass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(plumber())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});


// Copying and building files for production
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('copyImages', function() {
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('copyCSS', function() {
    return gulp.src('app/css/**/*')
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copyViews', function() {
    return gulp.src('app/views/*')
        .pipe(gulp.dest('dist/views'))
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('launchSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['copyCSS', 'copyImages', 'copyViews', 'useref'], 'launchSync', callback);
});

gulp.task('watch', function (){
    gulp.watch('app/scss/**/*.scss', ['runSass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/views/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/controllers/*.js', browserSync.reload);
    gulp.watch('app/directives/*.js', browserSync.reload);
    gulp.watch('app/data/*.js', browserSync.reload);
    gulp.watch('app/*.js', browserSync.reload);
    // Other watchers
});


//gulp.task('justSass', function (callback) {
//    runSequence(['sass', 'watch'], callback)
//});

gulp.task('default', function (callback) {
    runSequence(['runSass','browserSync', 'watch'], callback)
});




