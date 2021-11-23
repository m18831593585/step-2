const gulp = require('gulp');
const plugin = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
const browser = require('browser-sync').create();
const babel = require('gulp-babel');

function changeJs(done) {
    gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(plugin.concat("main.js"))
        .pipe(plugin.uglify())
        .pipe(plugin.rename("main.min.js"))
        .pipe(gulp.dest("./dist/js"))
        .on("end", browser.reload)
    done();
}

function changeCss(done) {
    done();

}

function changeHTML(done) {
    browser.reload();
    done();

}

function init() {
    browser.init({
        "port": "4010",
        "server": "./"
    });
    gulp.watch("./src/js/*.js", changeJs);
    gulp.watch("./src/css/*.css", changeCss);
    gulp.watch("./src/scss/*.scss", changeCss);
    gulp.watch("./**/*.html", changeHTML);
}

exports.default = gulp.series([changeJs,changeCss,changeHTML],init);
