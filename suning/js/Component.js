import Utils from "./Utils.js";

export default class Component extends EventTarget{
    elem;
    static cssBool=false;
    constructor(){
        super();
        this.elem=document.createElement("div");
    }
    appendTo(parent){
        if (typeof parent === "string") parent = document.querySelector(parent);
        if (parent) parent.appendChild(this.elem);
    }
    insertTo(parent,next){
        if (typeof parent === "string") parent = document.querySelector(parent);
        if(typeof next==="string") next=document.querySelector(next);
        if(parent && next) parent.insertBefore(this.elem,next);
    }
    static setCss(css){
        Utils.setCss(css);
    }
}