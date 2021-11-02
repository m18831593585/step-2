import Utils from "./Utils.js";
export default class Ball {
    x = 1;
    y = 1;
    w = 50;
    speedX = 2;
    speedY = 2;
    rect;
    static list=[];
    constructor() {
        this.elem = document.createElement("div");
        this.elem.className = "ball";

    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        if (parent) parent.appendChild(this.elem);
        this.randomProperty();
        Ball.list.push(this);
    }
    randomProperty() {
        this.rect = this.elem.parentElement.getBoundingClientRect();
        console.log(this.rect)
        this.w = Utils.random(40, 80);
        this.x = Utils.random(1, this.rect.width - this.w);
        this.y = Utils.random(1, this.rect.height - this.w);
        this.speedX = Utils.random(-6, 6)
        this.speedY = Utils.random(-6, 6)
        Object.assign(this.elem.style, {
            width: this.w + "px",
            height: this.w + "px",
            borderRadius: this.w + "px",
            backgroundColor: Utils.randomColor(),
            left: this.x + "px",
            top: this.y + "px"
        })
    }
    update() {
        if (!this.rect) return;
        if (this.y >= this.rect.height - this.w || this.y <= 0) this.speedY = -this.speedY;
        if (this.x >= this.rect.width - this.w || this.x <= 0) this.speedX = -this.speedX;
        this.x += this.speedX;
        this.y += this.speedY;
        this.elem.style.left = this.x + "px";
        this.elem.style.top = this.y + "px";
    }
    static update(){
        Ball.list.forEach(item=>item.update());
    }
}