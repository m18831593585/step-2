// console.log("aaa");
// 执行ES6模块化nodejs，需要增加扩展名  node ./index.mjs

// 导入时必须使用扩展名
import Box from "./a.mjs";
import Ball,{fn,obj,c} from "./b.mjs";

let b=new Box();
b.play();
console.log(obj)
fn();
console.log(c)

let ball=new Ball();
ball.run();