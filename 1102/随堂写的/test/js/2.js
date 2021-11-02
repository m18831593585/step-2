let imgCon, dot, left, right, prev
let pos=0

init()


function init(){
    imgCon=document.querySelector(".img-con")
    dot=document.querySelector(".dot")
    left=document.querySelector(".left")
    right=document.querySelector(".right")
    dot.addEventListener("click", dotClickHandler)
    left.addEventListener("click", bnClickHandler)
    right.addEventListener("click", bnClickHandler)
    window.addEventListener("resize", imgConMove)
    changePrev()
}

function dotClickHandler(e) {
    if (e.target.nodeName!=="LI") return
    pos = Array.from(dot.children).indexOf(e.target)
}

function bnClickHandler(e) {
    if (this===left){
        pos--
        if(pos<0){
            pos=imgCon.children.length-1
        }
    }else {
        pos++
        if (pos>imgCon.children.length-1){
            pos=0
        }
    }
}



function imgConMove() {
    imgCon.style.left=-pos*imgCon.firstElementChild.innerWidth+"px"
}

function changePrev(){
    if (prev){
        prev.style.backgroundColor="rgba(255,0,0,0)"
    }
    prev.dot.children
}
