import Box from "./a.mjs";

export var obj={a:1,b:2};
export function fn(){
    console.log("bbb");
}
export var c=10;
export default class Ball extends Box{
    run(){
        console.log("run");
    }
}