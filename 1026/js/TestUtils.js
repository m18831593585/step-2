let TestUtils = (function(){
    return{
        loadImage: function (arr, finishHandler, baseURL, extension) {
            if (!arr) return
            arr = typeof arr === "string" ? [arr] : arr
            baseURL = baseURL === undefined ? "./" : baseURL.endsWith("/") ? baseURL : baseURL + "/"
            extension = extension === undefined ? ".jpg" : extension.startsWith(".") ? extension : "." + extension
            arr = arr.map(function (value) {
                return baseURL + ([value.slice(-4, -3), value.slice(-5, -4)].includes(".") ? value : value + extension)
            })
            this.arr = arr
            this.list=[]
            this.n = 0
            this.img = new Image()
            this.finishHandler = finishHandler
            this.img.src = this.arr[0]
            this.img.addEventListener("load", e => this.loadHandler())
            this.img.addEventListener("error", e => this.errorHandler())
        },

        loadHandler: function (e) {
            this.list.push(this.img)
            this.nextImg()
        },
        errorHandler: function (e) {
            this.list.push(null)
            this.nextImg()
        },

        nextImg: function () {
            this.n++
            if (!this.arr[this.n]) {
                if(this.finishHandler==="function")this.finishHandler(this.list.length === 1 ? this.list[0] : this.list)
                else {
                    let evt = new Event("IMG_LOAD_FINISH")
                    evt.list = this.list
                    document.dispatchEvent(evt)
                }
                return
            }
            this.img.src = this.arr[this.n]
        }
    }
})()