import CheckBox from "./CheckBox.js";

export default class Radio extends CheckBox{
    static radioList={};
    constructor(label,name){
        super(label,name);
        // if(!Radio.radioList[name])Radio.radioList[name]=[];
        // Radio.radioList[name].push(this);

        this.setChecked(false);
    }
    setChecked(checked){
       super.setChecked(checked);
       Object.assign(this.elem.firstElementChild.style,{
           width:"18px",
           height:"18px",
           backgroundPositionX:checked ? "-175px" : "-195px",
           backgroundPositionY:"-104px",
           marginTop:"2px"
       })
    }
    clickHandler(e){
        if(this.checked) return;
        // Radio.radioList[this.name].forEach(item=>{
        //     if(item===this) return;
        //     item.checked=false;
        //     item.setChecked(false);
        // })
        if(Radio.radioList[this.name]){
            Radio.radioList[this.name].checked=false;
            Radio.radioList[this.name].setChecked(false);
        }
        Radio.radioList[this.name]=this;
        this.checked=true;
        this.setChecked(true);
        this.dispatch();
    }
}