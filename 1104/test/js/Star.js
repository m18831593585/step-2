import Component from "./Component.js"

export default class Star extends Component {

    static cssBool = false // is css loaded
    label
    elem
    starList = []
    face
    pos = 0
    score
    starContainer

    constructor(label) {
        super()
        this.label = label
        this.elem = document.createElement("div")
        this.elem.classList.add("fiveStar")
        this.render()
        Star.setCss()
        this.starContainer = this.elem.querySelector(".star-con")
        this.starList = this.elem.querySelectorAll(".star")
        this.score = this.elem.querySelector(".score")
        this.face = this.elem.querySelector(".face")
        this.starContainer.addEventListener("click", e => this.starClickHandler(e))
        this.starContainer.addEventListener("mouseover", e => this.starOverHandler(e))
        this.starContainer.addEventListener("mouseout", e => this.starOverHandler(e))

    }

    starClickHandler(e) {
        this.pos = Array.from(this.starList).indexOf(e.target) + 1
        this.removeStar()
    }

    starOverHandler(e) {
        let overIndex = Array.from(this.starList).indexOf(e.target)
        if (e.type === "mouseout") {
            this.removeStar()
            this.face.style.display = this.pos === 0 ? "none" : "block"
            this.face.style.left = ((this.pos - 1) * 16) + "px"
        }
        if (e.type === "mouseover") {
            this.addStar(overIndex)
            this.face.style.display = "block"
            this.face.style.left = (overIndex * 16) + "px"
            this.face.style.backgroundPositionX = ((overIndex + 1) * 20) + "px"
        }
    }

    removeStar(){
        for (let i = this.pos; i < this.starList.length; i++) {
            this.starList[i].style.backgroundPositionY = "0px"
        }
        this.score.innerHTML = this.pos + "分"
    }

    addStar(overIndex){
        for (let i = 0; i <= overIndex; i++) {
            this.starList[i].style.backgroundPositionY = "16px"
            this.score.innerHTML = overIndex + 1 + "分"
        }
    }

    render() {
        this.elem.innerHTML = `
            <div class='label'>${this.label}</div>
            <div class='star-con clear'>
                <div class='star'></div>
                <div class='star'></div>
                <div class='star'></div>
                <div class='star'></div>
                <div class='star'></div>
                <div class='face'></div>
            </div>
            <div class='score'>0分</div>
         `
    }

    static setCss() {
        if (Star.cssBool) return
        Component.setCss(`
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
            background-image: url(../img/commstar.png);
            background-position-y: 0px;
        }
        .fiveStar>.star-con>.face{
            width: 16px;
            height: 16px;
            position: absolute;
            background-image: url("../img/face-red.png");
            top:-16px;
            display: none;
        }
        .fiveStar>.score{
            float: left;
            margin-top: 20px;
        }
         `)
        Star.cssBool = true
    }
}