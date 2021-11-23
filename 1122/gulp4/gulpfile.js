const gulp=require("gulp");
const {src,dest,series,watch}=require("gulp");
const {concat,uglify,rename,babel,minifyCss}=require("gulp-load-plugins")();
const sass=require("gulp-sass")(require("sass"));
const browser=require("browser-sync")

function changeJs(done){
    src(["./src/js/b.js","./src/js/**/*.js"])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(dest("./dist/js"))
    .on("end",browser.reload)
    done();
}

function changeCss(done){
    src(["./src/scss/*.scss","./src/css/*.css"])
    .pipe(sass())
    .pipe(concat("main.css"))
    .pipe(minifyCss())
    .pipe(rename("main.min.css"))
    .pipe(dest("./dist/css"))
    .on("end",browser.reload);
    done();
}

function changeHTML(done){
    browser.reload();
    done();
}

function init(done){
    browser.init({
        "port":"4010",
        "server":"./"
    });
    watch("./src/js/*.js",changeJs);
    watch("./src/css/*.css",changeCss);
    watch("./src/scss/*.scss",changeCss);
    watch("./**/*.html",changeHTML);
    done();
}
exports.default=series([changeJs,changeCss,changeHTML],init);
