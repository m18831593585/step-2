import Component from "./Component.js";
import Utils from "./Utils.js";
export default class Goods extends Component{
    data;
    iconList;
    prev;
    mouseBind;
  
    constructor(data) {
       super();
        this.elem.className = "goods";
        this.mouseBind=e=>this.mouseHandler(e);
        if (data) this.setData(data);
        this.setCss();
    }
   
    setData(data) {
        if(this.iconList) this.iconList.removeEventListener("mouseover",this.mouseBind);
        this.data = data;
        this.render();
        this.iconList=this.elem.querySelector(".iconList");
        this.iconList.addEventListener("mouseover",this.mouseBind);
        var evt=new MouseEvent("mouseover",{bubbles:true});
        this.iconList.firstElementChild.dispatchEvent(evt);
    }
    mouseHandler(e){
        if(e.target.nodeName!=="IMG") return;
        if(this.prev){
            this.prev.style.borderColor="#ddd"
        }
        this.prev=e.target;
        this.prev.style.borderColor="#e4393c";
        this.elem.querySelector(".iconImg").firstElementChild.src=e.target.src;
        this.elem.querySelector(".priceCon").lastElementChild.textContent=this.data.list.find(item=>item.id==e.target.id).price;
    }
    render() {
        this.elem.innerHTML = `
            <div class='iconImg'>
                <img src='${this.data.list[0].img}' >
                ${!this.data.schedule ? "" : `
                    <div class='iconPromote'>
                        ${this.data.schedule.img ? `<img src='${this.data.schedule.img}'>` : ""}
                        <span class='iconPromoteTxt'>${this.data.schedule.info || ""}</span> 
                    </div>
                `}
            </div>
            <div class='iconList clear'>
                ${this.data.list.reduce((value,item)=>{
                    return value+`<img src='${item.img}' id='${item.id}'>`
                },"")}
            </div>
            <div class='priceCon'><span>￥</span><i>${this.data.list[0].price}</i></div>
            <div class='titleCon'>${!this.data.icon ? "" : '<span class="titleIcon">京品手机</span>'}<a href='javascript:void(0)'>${this.data.info}</a></div>
            <div class='info clear'>${this.data.arguments ? this.data.arguments.reduce((value,item)=>{
                return value+`<a href='javascript:void(0)' class='infoitem'>${item}</a>`
            },"") : ""}</div>
            <div class='judgeCon'><span class='judge'>${this.data.judge<10000 ? this.data.judge : ~~(this.data.judge/10000)+"万+"}</span>条评价</div>
            <div class='shoppingCon'><span class='shopping'>${this.data.shop}</span><img src='./img/chat.png'></div>
            <div>${this.data.icons ? Object.keys(this.data.icons).reduce((v,t)=>{
                if(this.data.icons[t] && this.data.icons[t].length>0){
                    v+=this.data.icons[t].reduce((value,item)=>{
                        return value+`<span class='${t}'>${item}</span>`
                    },"")
                }
                return v;
            },"") : ""}</div>
            ${this.data.double11 ? "<div class='double11'><img src='./img/double11.png'></div>" : ""}
        `
    }
    setCss(){
        Goods.setCss(`.goods{
            width: 240px;
            height: 444px;
            padding: 12px 9px;
            font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
            color: #666;
            position: relative;
            float: left;
        }
        .goods:hover{
            box-shadow: 0px 0px 4px #CCC;
        }
        .goods>.iconImg{
            text-decoration: none;
            width: 100%;
            height: 220px;
            text-align: center;
            display: block;
            position: relative;
        }
        .goods>.iconImg>img{
            width: 220px;
            height: 220px;
        }
        .goods>.iconImg>.iconPromote{
            width: 220px;
            height: 25px;
            text-align: left;
            position: absolute;
            bottom: 0;
            left:0;
            background-color: rgba(0,0,0,0.6);
        }
        .goods>.iconImg>.iconPromote>img{
            margin-left: 10px;
            vertical-align: middle;
        }
        .goods>.iconImg .iconPromoteTxt{
            line-height: 25px;
            color: white;
            margin-left: 10px;
        }
        .goods>.iconList{
            margin-left: 2px;
        }
        .goods>.iconList>img{
            float:left;
            /* #e4393c */
            border: 1px solid #ddd;
            padding: 1px;
            width:25px;
            height: 25px;
            margin: 2px;
        }
        
        .clear::after
        {
            content: "";
            display: block;
            height: 0;
            overflow: hidden;
            clear: both;
            visibility: hidden;
        }
        .goods>.priceCon{
            font-size: 16px;
            color: #e4393c;
            margin: 0;
            margin-top: 8px;
        }
        .goods>.priceCon>i{
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            font-family: Verdana;
        }
        .goods>.titleCon{
            width: 220px;
            overflow: hidden;
            white-space: nowrap;
            margin: 0;
            margin-top: 8px;
            padding: 0;
        }
        .goods>.titleCon>.titleIcon{
            float: left;
            height: 16px;
            padding: 0 3px;
            margin-top: 2px;
            margin-right: 3px;
            overflow: hidden;
            color: #fff;
            font: 12px/16px "Helvetica Neue","Hiragino Sans GB",SimSun,serif;
            background: #c81623;
            border-radius: 2px;
           
        }
        .goods>.titleCon>a{
            text-decoration: none;
            color: #666;
        }
        .goods>.titleCon>a:hover{
            color: #c81623;
        }
        .goods>.info{
            margin: 0;
            margin-top: 8px;
        }
        .goods>.info>.infoitem{
            float: left;
            height: 19px;
            line-height: 19px;
            padding: 0 6px;
            margin-right: 7px;
            color: #999;
            background: #f4f4f4;
            text-decoration: none;
        }
        .goods>.info>.infoitem:hover{
            color: #c81623;
        }
        .goods>.judgeCon{
            margin-top: 8px;
        }
        .goods>.judgeCon>.judge
        {
            color: #646fb0;
            font-family: verdana;
            font-weight: 700;
        }
        .goods>.shoppingCon{
           margin-top: 8px;
           margin-bottom: 10px;
        }
        .goods>.shoppingCon>.shopping{
            color: #999;
            text-decoration: none;
            display: inline-block;
            max-width: 122px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .goods>.shoppingCon>.shopping:hover{
            color: #c81623;
        }
        
        .icon1,.icon3,.icon2{
            float: left;
            height: 16px;
            line-height: 16px;
            padding: 0 3px;
            margin-right: 3px;
            overflow: hidden;
            text-align: center;
            font-style: normal;
            font-size: 12px;
            font-family: "Helvetica Neue","Hiragino Sans GB",SimSun,serif;
            background: #e23a3a;
            color: #FFF;
            cursor: default;
            border-radius: 2px;
        }
        .icon4{
            float: left;
            height: 14px;
            line-height: 14px;
            padding: 0 3px;
            border: 1px solid #e23a3a;
            margin-right: 3px;
            overflow: hidden;
            text-align: center;
            font-style: normal;
            font-size: 12px;
            font-family: "Helvetica Neue","Hiragino Sans GB",SimSun,serif;
            border-radius: 2px;
            color: #e23a3a;
        }
        .icon3{
            background: #31c19e;
        }
        .icon2{
            float: left;
            height: 14px;
            line-height: 14px;
            line-height: 16px\0;
            padding: 0 3px;
            margin-right: 3px;
            overflow: hidden;
            text-align: center;
            font-style: normal;
            font-size: 12px;
            font-family: "Helvetica Neue","Hiragino Sans GB",SimSun,serif;
            border-radius: 2px;
            border:1px solid #4d88ff;
            color: #4d88ff;
            background-color: white;
        }
        .double11{
            position: absolute;
            right: 10px;
            top:20px;
        }`)
    }
}


//<div>${(function(){
// var str="";
// for(var key in this.data.icons){
//     if(this.data.icons[key] && this.data.icons[key].length>0){
//         str+=this.data.icons[key].reduce((value,item)=>{
//             return value+`<span class='${key}'>${item}</span>`
//         },"");
//     }
// }
// return str;
//  })()}</div>