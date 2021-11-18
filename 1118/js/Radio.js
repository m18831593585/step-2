import CheckBox from "./CheckBox.js";

export default class Radio extends CheckBox{
    static radioList={};
    constructor(label,name){
        super(label,name);
        this.checked=false;
    }
    set checked(value){
        super.checked=value;
       Object.assign(this.elem.firstElementChild.style,{
           width:"18px",
           height:"18px",
           backgroundPositionX:value ? "-175px" : "-195px",
           backgroundPositionY:"-104px",
           marginTop:"2px"
       })
    }
    get checked(){
        return this._checked;
    }
    clickHandler(e){
        if(this.checked) return;
        if(Radio.radioList[this.name]){
            Radio.radioList[this.name].checked=false;
        }
        Radio.radioList[this.name]=this;
        this.checked=true;
        this.dispatch();
    }
}