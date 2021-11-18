import Utils from "./Utils.js";
export default class CheckBox extends EventTarget{
    elem;
    name;
    _checked=false;
    label;
    static cssBool = false;
    static CHECKED_CHANGE_EVENT="checked_change_event";
    constructor(label, name) {
        super();
        this.label=label;
        this.name = name;
        this.elem = document.createElement("div");
        this.elem.className = "checkbox_css clear";
        this.elem.setAttribute("name",name);
        this.render(label);
        this.elem.addEventListener("click",e=>this.clickHandler(e));
        if (CheckBox.cssBool) return;
        CheckBox.setCss();
        CheckBox.cssBool = true;
    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        if (parent) parent.appendChild(this.elem);
    }
    render(label) {
        this.elem.innerHTML = `
            <div class='checkbox_box' ></div>
            <span class='checkbox_label'>${label}</span>
        `;
    }
    clickHandler(e){
        this.checked=!this.checked;
        this.dispatch();
    }
    dispatch(){
        var evt=new Event(CheckBox.CHECKED_CHANGE_EVENT);
        evt.checked=this.checked;
        evt.name=this.name;
        evt.label=this.label;
        this.dispatchEvent(evt);
    }
    set checked(value){
        this._checked=value;
        if(value){
            this.elem.setAttribute("active","");
        }else{
            this.elem.removeAttribute("active");
        }
    }
    get checked(){
        return this._checked;
    }
    static setCss() {
        Utils.setCss(`
        .checkbox_css{
            padding: 5px 5px;
            float: left;
        }
        .checkbox_css.clear::after{
            content: "";
            display: block;
            visibility: hidden;
            clear: both;
            height: 0;
            overflow: hidden;
        }
        .checkbox_css>.checkbox_box{
            width: 14px;
            height: 14px;
            background-image: url(./img/new_icon.png);
            background-position-x: -238px;
            background-position-y: -37px;
            float: left;
            margin-top: 4px;
        }
        .checkbox_css[active]>.checkbox_box{
            background-position-x: -128px;
            background-position-y: -126px;
        }
        .checkbox_css>.checkbox_label{
            float: left;
            margin-left: 5px;
            user-select: none;
        }
        `)
    }

}