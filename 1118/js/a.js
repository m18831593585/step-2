var f=(function (){
    var a=1;
    var s=2;
    console.log(a+s);
    return function(){
        a++;
        console.log(a+s);
    }
})();


