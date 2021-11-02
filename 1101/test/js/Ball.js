export default class Ball {
    x
    y
    speedX
    speedY
    balls = []

    constructor() {
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
    }



    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent)
        parent.appendChild(this.element)

    }




}
