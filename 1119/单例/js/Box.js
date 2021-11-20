export default class Box{
    constructor(){
        this.elem=document.createElement("ul");
    }
    appendTo(parent){
        if(typeof parent==="string") parent=document.querySelector(parent);
        parent.appendChild(this.elem);
    }
    update(list){
        this.elem.innerHTML=list.reduce((v,t)=>{
            return v+`<li>${t}</li>`;
        },"")
    }
}