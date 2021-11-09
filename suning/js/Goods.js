import Component from "./Component.js";
import Utils from "./Utils.js";

export default class Goods extends Component {
    data;
    iconList;
    prev;
    mouseBind;

    constructor(data) {
        super();
        this.elem.className = "goods";
        this.mouseBind = e => this.mouseHandler(e);
        if (data) this.setData(data);
        this.setCss();
    }

    setData(data) {
        if (this.iconList) this.iconList.removeEventListener("mouseover", this.mouseBind);
        this.data = data;
        this.render();
        this.iconList = this.elem.querySelector(".iconList");
        this.iconList.addEventListener("mouseover", this.mouseBind);
        var evt = new MouseEvent("mouseover", {bubbles: true});
        this.iconList.firstElementChild.dispatchEvent(evt);
    }

    mouseHandler(e) {
        if (e.target.nodeName !== "IMG") return;
        if (this.prev) {
            this.prev.style.borderColor = "transparent"
        }
        this.prev = e.target;
        this.prev.style.borderColor = "#FA0";
        this.elem.querySelector(".iconImg").firstElementChild.src = e.target.src;
        // this.elem.querySelector(".priceCon").lastElementChild.textContent = this.data.list.find(item => item.id == e.target.id).price;
    }

    render() {
        this.elem.innerHTML = `
            <div class='iconImg'>
                <img src='${this.data.list[0].img}' >
            </div>
            <div class='iconList clear'>
                ${this.data.list.reduce((value, item) => {
            return value + `<img src='${item.img}' id='${item.id}'>`
        }, "")}
            </div>
            <div class='pricecon'><i>¥</i>${this.data.list[0].price}<i>.00<i></i></i></div>
            <div class='titleCon clear'><a href='javascript:void(0)'>${this.data.info}</a></div>
            <div class='info clear'>${this.data.arguments ? this.data.arguments.reduce((value, item) => {
            return value + `<a href='javascript:void(0)' class='infoitem'>${item}</a>`
        }, "") : ""}</div>
            <div class='judgeCon'><span class='judge'>${this.data.judge < 10000 ? this.data.judge : ~~(this.data.judge / 10000) + "万+"}</span>条评价
            <a href='javascript:void(0)' class='tao'>去淘二手</a>
            </div>
            <div class='shoppingCon'><span class='shopping'>${this.data.shop}</span></div>
            <div>${this.data.icons ? Object.keys(this.data.icons).reduce((v, t) => {
            if (this.data.icons[t] && this.data.icons[t].length > 0) {
                v += this.data.icons[t].reduce((value, item) => {
                    return value + `<span class='${t}'>${item}</span>`
                }, "")
            }
            return v;
        }, "") : ""}</div>
            ${this.data.double11 ? "<div class='double11'><img src='./img/d11.png'></div>" : ""}
            <div class='car'><a href='javascript:void(0)'><i></i>对比</a><a href='javascript:void(0)'><i></i>关注</a><a href='javascript:void(0)'><i></i>加入购物车</a></div>
        `
    }

    setCss() {
        Goods.setCss(`
        i {
            font-style: normal;
          }
          .container{
          display: flex;
          flex-wrap:wrap;
          // justify-content: space-between;
          }
          .goods {
            width: 240px;
            height: 482px;
            margin: 40px 25px 30px 15px;
            padding: 12px 9px;
            font: 12px/1.5 "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
            color: #333;
            position: relative;
            // float: left;
          }
      
          .goods:hover {
            box-shadow: 0px 0px 4px #CCC;
          }
      
          .goods>.iconImg {
            text-decoration: none;
            width: 240px;
            height: 240px;
            text-align: center;
            display: block;
            position: relative;
          }
      
          .goods>.iconImg>img {
            width: 220px;
            height: 220px;
          }
      
          .goods>.iconImg>.iconPromote {
            width: 220px;
            height: 25px;
            text-align: left;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.6);
          }
      
          .goods>.iconImg>.iconPromote>img {
            margin-left: 10px;
            vertical-align: middle;
          }
      
          .goods>.iconImg .iconPromoteTxt {
            line-height: 25px;
            color: white;
            margin-left: 10px;
          }
      
          .goods>.iconList {
            margin-left: 2px;
          }
      
          .goods>.iconList>img {
            float: left;
            border: 1px solid transparent;
            padding: 1px;
            width: 32px;
            height: 32px;
            margin: 2px;
          }
      
          .clear::after {
            content: "";
            display: block;
            height: 0;
            overflow: hidden;
            clear: both;
            visibility: hidden;
          }
      
          .goods>.pricecon {
            margin: 0;
            padding: 0;
            height: 22px;
            line-height: 20px;
            font-size: 22px;
            font-style: normal;
            color: #F60;
            font-weight: bold;
            font-family: Tahoma;
            margin-top: 10px;
          }
      
          .goods>.pricecon>i {
            font-size: 12px;
            font-family: arial;
            margin-right: 3px;
            font-weight: normal;
          }
      
          .goods>.titleCon {
            white-space: nowrap;
            margin: 0;
            margin-top: 11px;
            padding: 0;
            color: #333;
            font-size: 14px;
            line-height: 14px;
          }
      
          .goods>.titleCon>a {
            display: block;
            text-decoration: none;
            color: #666;
            margin-top: 10px;
          }
      
          .goods>.titleCon>a:hover {
            color: #F60;
          }
      
          .goods>.info {
            margin: 0;
            margin-top: 8px;
          }
      
          .goods>.info>.infoitem {
            float: left;
            height: 15px;
            line-height: 19px;
            padding: 0 5px;
            margin-right: 4px;
            color: #999;
            text-decoration: none;
            border-left: 1px dotted #999;
          }
      
          .goods>.info>.infoitem:first-child{
            border:none;
            padding-left:0;
          }
      
          .goods>.judgeCon {
            margin-top: 8px;
          }
      
          .goods .judgeCon>.judge {
            color: #646fb0;
            font-family: verdana;
            font-weight: 700;
          }
          .goods .judgeCon>a{
            float: right;
            color: #2272C8;
            text-decoration: none;
          }
          .goods .judgeCon>a:hover{
            color: #0284ff;
          }
          .goods>.shoppingCon {
            margin-top: 8px;
            margin-bottom: 5px;
          }
      
          .goods>.shoppingCon>.shopping {
            color: #f60;
            text-decoration: none;
            display: inline-block;
            max-width: 122px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border:1px solid #f60;
            border-radius:2px;
            cursor:default;
            font-size: 12px;
            line-height: 12px;
            padding:2px 4px;
          }
          .icon1,
          .icon2,
          .icon3,
          .icon4 {
            position: relative;
          display: inline-block;
          height: 12px;
          line-height: 12px;
          margin: 0 3px 0 0;
          padding: 3px 4px;
          font-size: 12px;
          color: #FFF;
          border-radius: 2px;
          background: #F60;
          z-index: 35;
          max-width: 210px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          }
      
          .double11>img {
               position: absolute;
               width: 240px;
               height: 240px;
               right: 10px;
               top: 20px;
          }
          .car{
              width: 238px;
              height: 28px;
              text-align: center;
              line-height: 28px;
              margin: 10px 0 0 0;
              border: 1px solid #EEE;
              overflow: hidden;
              border-radius: 2px;
              display: flex;
              position: absolute;
              bottom: 10px;
          }
          .car a{
              text-decoration: none;
              color: #666;
              height: 12px;
              width: 72px;
              line-height: 12px;
              padding: 8px 0;
              text-align: center;
              border-left: 1px solid #EEE;
              margin-left: -1px;
          }
          .car a i{
              display: inline-block;
              margin: 0 2px 0 0;
              vertical-align: top;
              overflow: hidden;
              width: 12px;
              height: 12px;
              line-height: 12px;
              text-align: center;
          }
          .car a:first-child i{
            background-position: -40px -258px;
          }
          .car a:nth-child(2) i{
            background-position: -259px -212px;
          }
          .car a:last-child{
            flex-grow: 1;
          }
          .car a:last-child i{
            background-position: -135px -208px;
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