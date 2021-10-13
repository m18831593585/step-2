/*
var a = 1;
// function q()
{
    a = 4;
    function a() {

    }
    a = 7;
    console.log(a) // 7
}
// q()
console.log(a) // 6
*/

let x = 0

function fn() {
    x++
    console.log(x)
}

while(1) {
    setInterval(fn, 1000)

}