// let TestUtils = (function () {
//     return {
//         loadImage: function (sourceArr, finishHandler, basePath, extension) {
//             if (typeof sourceArr === "string") sourceArr = [sourceArr]
//             if (basePath && typeof basePath === "string") { // basePath不为空 且为String
//                 basePath = basePath.endsWith("/") ? basePath : basePath + "/"
//                 sourceArr = sourceArr.map(function (item) {
//                     return basePath + item
//                 })
//             }
//             if (extension && typeof extension === "string") {
//                 sourceArr = sourceArr.map(function (item) {
//                     // item = String(item);
//                     item = ([item.slice(-4, -3), item.slice(-5, -4)].includes(".")) ? item : item + extension
//                     console.log(item)
//                     return item
//                 })
//             }
//             let img = new Image()
//             img.src = sourceArr[0]
//             img.n = 0
//             img.finishList = []
//             img.sourceArr = sourceArr
//             img.finishHandler = finishHandler
//             img.addEventListener("load", this.loadHandler)
//             img.addEventListener("error", this.errorHandler)
//         },
//
//         loadHandler: function (e) {
//             console.log("111")
//             this.finishList.push(this.cloneNode(false))
//             if (TestUtils.nextImg(this)) return
//         },
//
//         errorHandler: function (e) {
//             console.log(e)
//             this.finishList.push(null)
//             if (TestUtils.nextImg(this)) return
//         },
//
//         nextImg: function (img) {
//             img.n++
//             if (img.n > img.sourceArr.length - 1) {
//                 img.removeEventListener("load", TestUtils.loadHandler)
//                 img.removeEventListener("error", TestUtils.errorHandler)
//                 if (typeof img.finishHandler === "function")
//                     img.finishHandler(img.sourceArr.length === 1 ? img.finishList[0] : img.finishList)
//                 else {
//                     let evt = new Event(TestUtils.IMG_FINISH_EVENT)
//                     evt.finishList = img.sourceArr.length === 1 ? img.finishList[0] : img.finishList
//                     document.dispatchEvent(evt)
//                 }
//                 return true
//             }
//             img.src = img.sourceArr[img.n]
//             return false
//         }
//     }
// })()









let TestUtils=(function (){
    return {
        loadImage: function (imgSrc, finishFunction, base, extension){
            // if (typeof arr==="string") arr=[arr]
            imgSrc = typeof imgSrc==="string" ? [imgSrc] : imgSrc
            // if(base)
            base = base === undefined ? "./" : base.endsWith("/") ? base : base + "/"
            extension = extension.startsWith(".") ? extension : "." + extension
            imgSrc = imgSrc.map(function (item){
                return base + ([item.slice(-4,-3),item.slice(-5,-4)].includes(".") ? item : item + extension)
            })
            // console.log(imgSrc)

            let img = new Image()
            img.imgSrc=imgSrc
            img.finishHandler=finishFunction
            img.i=0
            img.src = img.imgSrc[img.i]
            img.items=[]

            img.addEventListener("load", this.loadHandler)
            img.addEventListener("error", this.errorHandler)

        },

        loadHandler: function (e){
            this.items.push(this.cloneNode(false))
            // console.log(this.items)
            TestUtils.nextImg(this)
        },

        errorHandler: function (e){
            this.items.push(null)
            TestUtils.nextImg(this)
        },

        nextImg: function (img){ // 返回是否加载完毕
            img.i++
            if(!img.imgSrc[img.i]) {
                img.removeEventListener("load", this.loadHandler)
                img.removeEventListener("error", this.errorHandler)
                img.finishHandler(img.items)
            }
            img.src=img.imgSrc[img.i]
        }

    }
})()





