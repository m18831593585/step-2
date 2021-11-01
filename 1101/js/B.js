import A from "./A.js";

export default class B extends A{
    constructor(name,age){
        super(name);
        this.age=age;
    }
    run(){
        console.log("run")
    }
}