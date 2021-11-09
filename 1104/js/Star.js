import Component from "./Component.js";

export default class Star extends Component {
    label = "";
    pos = -1;
    starList;
    score;
    face;

    constructor(label) {
        super();
        this.label = label;
        this.elem.className = "fiveStar clear"
        this.render();
        this.setCss();
        this.starList = this.elem.querySelectorAll(".star");
        console.log(this.starList);
        this.score = this.elem.querySelector(".score");
        this.face = this.elem.querySelector(".face");
        this.elem.addEventListener("mouseover", e => this.mouseHandler(e));
        this.elem.addEventListener("mouseleave", e => this.mouseHandler(e));
        this.elem.addEventListener("click", e => this.clickHandler(e));
    }

    mouseHandler(e) {
        if (e.type === "mouseover") {
            if (e.target.className !== "star") return;
            var index = ~~(e.target.getAttribute("data"));
            this.selectStar(index);
            Object.assign(this.face.style, {
                display: "block",
                left: this.starList[index].offsetLeft + "px",
                backgroundPositionX: -(4 - index) * 20 + "px"
            })
        } else if (e.type === "mouseleave") {
            this.selectStar(-1);
            this.face.style.display = "none";
        }
    }

    selectStar(index) {
        this.starList.forEach((item, i) => {
            if (i <= index || i <= this.pos) item.style.backgroundPositionY = "-16px"
            else item.style.backgroundPositionY = "0px"
        });
        if (index === -1) index = this.pos;
        this.score.textContent = (index + 1) + "分"
    }

    clickHandler(e) {
        if (e.target.className !== "star") return;
        this.pos = ~~(e.target.getAttribute("data"));
        this.selectStar(this.pos);
    }


    render() {
        this.elem.innerHTML = `
            <div class='label'>${this.label}</div>
            <div class='star-con clear'>
                <div class='star' data='0'></div>
                <div class='star' data='1'></div>
                <div class='star' data='2'></div>
                <div class='star' data='3'></div>
                <div class='star' data='4'></div>
                <div class='face'></div>
            </div>
            <div class='score'>0分</div>
         `
    }

    setCss() {
        Star.setCss(`
         .fiveStar {
            margin-right: 20px;
            margin-bottom: 5px;
            font-size: 12px;
            color: #666;
            float:left;
            position: relative;
        }

        .clear::after {
            content: "";
            display: block;
            height: 0;
            clear: both;
            overflow: hidden;

        }
        .fiveStar>.label{
            float: left;
            margin-right: 15px;
            margin-top: 20px;
        }
        .fiveStar>.star-con{
            position: relative;
            margin-top: 20px;
            margin-right: 15px;
            float: left;
        }
        .fiveStar>.star-con>.star{
            float: left;
            width: 16px;
            height: 16px;
            background-image: url(./img/commstar.png);
            background-position-y: 0px;
        }
        .fiveStar>.star-con>.face{
            width: 16px;
            height: 16px;
            position: absolute;
            background-image: url("./img/face-red.png");
            top:-16px;
            display: none;
        }
        .fiveStar>.score{
            float: left;
            margin-top: 20px;
        }
         `);
    }
}