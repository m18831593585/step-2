import Ajax from "./Ajax.js";
import Box from "./Box.js";
import Model from "./Model.js";

export default class Main{
    constructor(){
        for(var i=0;i<10;i++){
            var box=new Box();
            box.appendTo("body");
            Model.getInstance().add(box)
        }
        new Ajax();
        
    }
}