var gulp=require("gulp");
var plugin=require("gulp-load-plugins")();
// var concat=require("gulp-concat");
// var uglify=require("gulp-uglify");
// var rename=require("gulp-rename");
// var minifyCss=require("gulp-minify-css");
var sass=require("gulp-sass")(require('sass'));

// gulp.task("b",function(){
//     console.log("bbb")
// })
// gulp.task("a",["b"],function(){
//     console.log("abc");
// })

// gulp.task("default",function(){
//     console.log("aaa")
// })

gulp.task("a",function(){
    // gulp.src("./src/**/*.js")
    // gulp.src("./src/**/*.*")
    // gulp.src("./src/js/*.js")
    gulp.src(["./src/js/b.js","./src/js/a.min.js"])
    // .pipe(concat("main.js"))
    .pipe(plugin.uglify())
    .pipe(plugin.rename(function(file){
        if(file.basename.includes(".min")) return file;
        file.basename+=".min";
        return file;
    }))
    .pipe(gulp.dest("./dist/js"));

    // gulp.src("./src/css/*.css")
    // .pipe(concat("main.css"))
    // .pipe(minifyCss({
    //     keepBreaks:true,//是否添加换行
    //     // advanced:false//是否合并相同选择器，默认true
    // }))
    // .pipe(rename("main.min.css"))
    // .pipe(gulp.dest("./dist/css/"))

    gulp.src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(plugin.concat("main.css"))
    .pipe(plugin.minifyCss({
        keepBreaks:true,//是否添加换行
        // advanced:false//是否合并相同选择器，默认true
    }))
    .pipe(plugin.rename("main.min.css"))
    .pipe(gulp.dest("./dist/css/"))
})


gulp.task("default",function(){
    gulp.watch("./src/scss/*.scss",function(){
        gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(plugin.concat("main.css"))
        .pipe(plugin.minifyCss({
            keepBreaks:true,//是否添加换行
            // advanced:false//是否合并相同选择器，默认true
        }))
        .pipe(plugin.rename("main.min.css"))
        .pipe(gulp.dest("./dist/css/"))
    })
})