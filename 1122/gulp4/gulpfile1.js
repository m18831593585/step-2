var gulp=require("gulp");
// gulp.task("a",function(done){
//     console.log("aaa")
//     done();
// })
// gulp.task("default",["a"],function(done){
//     console.log("default");
//     done();
// })
// 串行执行
// gulp.task("default",gulp.series(["a"],function(done){
//     console.log("default");
//     done();
// }))
// 并行执行
// gulp.task("default",gulp.parallel(["a"],function(done){
//     console.log("default");
//     done();
// }))
// gulp.task("default",function(done){
//     gulp.watch("./src/js/*.js",function(finish){
//         gulp.src("./src/js/*.js")
//         .pipe(gulp.dest("./dist/js/"))
//         .on("end",finish);
//     })
// })



// gulp.task("b",function(){
//     return new Promise(function(resolve,reject){
//         console.log("bbb");
//         resolve();
//     })
// })

// gulp.task("default",gulp.series(["b"],function(done){
//     console.log("default");
//     done()
// }))

// function a(done){
//     console.log("aaa");
//     done();
// }
// function b(done){
//     console.log("bbb");
//     done();
// }

// function c(done){
//     console.log("ccc");
//     done();
// }
// exports.a=a;
// exports.c=c;
// exports.default=gulp.series([a,b],c);