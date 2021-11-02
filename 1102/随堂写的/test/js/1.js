let iconList,carousel,prevImg,showImg

init()

function init(){
    iconList=document.querySelector(".icon-list")
    carousel=document.querySelector(".carousel")
    resizeHandler()
    window.addEventListener("resize", resizeHandler)
    iconList.addEventListener("click", clickHandler)

}

function clickHandler(e){
    if(e.target.nodeName !=="IMG") return
    console.log(e)
    Array.from(iconList.children).indexOf(e.path[2])
    changePrev(index)
}

function resizeHandler(e){
    iconList.style.top=(carousel.offsetHeight-iconList.offsetHeight)/2+"px"
}

function changePrev(pos){
    if (prevImg){
        prevImg.className=""
    }
    prevImg=showImg.children[pos]
    prevImg.className="show"
}