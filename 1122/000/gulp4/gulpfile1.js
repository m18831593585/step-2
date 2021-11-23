var gulp = require('gulp');

gulp.task("a", function (done) {
    console.log("a");
    done();
});

// gulp.task('default',gulp.parallel(["a"]), function (done) {
//     console.log('default');
//     done();
// });

// gulp.task('default', function (done) {
//     gulp.watch('src/js/*.js', function (finish) {
//         gulp.src('src/js/*.js')
//             .pipe(gulp.dest('dist/js'))
//             .on('end',finish);
//     });
//     done();
// });


// gulp.task("b",function (){
//     return new Promise(function (resolve,reject){
//         console.log("b");
//         resolve();
//     });
// })
//
// gulp.task("default", gulp.series(["b"]), function (done) {
//     console.log("default");
//     done();
// });


function a(done) {
    console.log("aaa")
    done();
}

function b(done){
    console.log("bbb");
    done();
}

exports.default = gulp.series(a,b);