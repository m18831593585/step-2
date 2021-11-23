var gulp = require('gulp');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass')(require('sass'));
var plugins = require('gulp-load-plugins')();

// gulp.task("a", function(){
//     console.log("aaa")
// })

gulp.task("a", function(){
    // gulp.src("./src/**/*.js")
    // gulp.src("./src/js/*.js") // 选择src下js文件夹下的所有js文件
    gulp.src(["./src/js/b.js","./src/js/a.js"]) // 按顺序加载, 需要写为数组
        .pipe(plugins.concat("main.js")) // 合并所有js文件
        .pipe(plugins.uglify()) // 压缩js
        .pipe(plugins.rename(function (file){
            file.basename += ".min"
        })) // 重命名
        .pipe(gulp.dest("./dist/js")) // 把src下的js文件复制到dist下的js文件夹

    gulp.src("./src/css/*.css")
        .pipe(plugins.concat("main.css"))
        .pipe(plugins.minifyCSS({
            keepBreaks: true
        }))
        .pipe(plugins.rename("main.min.css"))
        .pipe(gulp.dest("./dist/css/"))


    gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(plugins.rename("scss.min.css"))
        .pipe(gulp.dest("./dist/css/"))

})



gulp.task("default", function(){
    gulp.watch("./src/scss/*.scss", function (file){
        console.log(file.path)
    })
})