var obj={
    a:1,
    b:2,
    c:function(){
        console.log(this.a+this.b);
    }
}
module.exports=obj;
// 等同于es6 中 export default