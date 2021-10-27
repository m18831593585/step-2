let TestUtils = (function () {
    return {
        loadImage: function (sourceArr, finishHandler, basePath, extension) {
            if (typeof sourceArr === "string") sourceArr = [sourceArr]
            if (basePath && typeof basePath === "string") { // basePath不为空 且为String
                basePath = basePath.endsWith("/") ? basePath : basePath + "/"
                sourceArr = sourceArr.map(function (item) {
                    return basePath + item
                })
            }
            if (extension && typeof extension === "string") {
                item=String(item);
                sourceArr = sourceArr.map(function (item) {
                    item = (item.slice(-4, -3) || item.slice(-5, -4) === ".") ? item : item + extension
                    return item
                })
            }
            let img = new Image()
            img.src = sourceArr[0]
            img.n = 0
            img.finishList = []
            img.sourceArr = sourceArr
            img.finishHandler = finishHandler
            img.addEventListener("load", this.loadHandler)
            img.addEventListener("error", this.errorHandler)
        },

        loadHandler: function (e) {
            this.finishList.push(this.cloneNode(false))
            if (TestUtils.nextImg(this)) return
        },

        errorHandler: function (e) {
            this.finishList.push(null)
            if (TestUtils.nextImg(this)) return
        },

        nextImg: function (img) {
            img.n++
            if (img.n > img.sourceArr.length-1) {
                img.removeEventListener("load", TestUtils.loadHandler)
                img.removeEventListener("error", TestUtils.errorHandler)
                if (typeof img.finishHandler === "function")
                    img.finishHandler(img.sourceArr.length === 1 ? img.finishList[0] : img.finishList)
                else {
                    let evt = new Event(TestUtils.IMG_FINISH_EVENT)
                    evt.finishList = img.sourceArr.length === 1 ? img.finishList[0] : img.finishList
                    document.dispatchEvent(evt)
                }
                return true
            }
            img.src = img.sourceArr[img.n]
            return false
        }
    }
})()