import Model from "./Model.js";

export default class Ajax{
    constructor(){
        var xhr=new XMLHttpRequest();
        xhr.open("GET","http://localhost:4020");
        xhr.addEventListener("load",e=>this.loadHandler(e));
        xhr.send()
    }
    loadHandler(e){
       var xhr=e.currentTarget;
       var list=JSON.parse(xhr.response);
       Model.getInstance().data=list;
    }
}