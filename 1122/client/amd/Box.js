define(function() {
    function Box(){

    }
    Box.prototype.a=1;
    Box.prototype.play=function(){
        console.log("play");
    }
    return Box;
});