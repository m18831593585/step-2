var Utils = (function () {
    return {
        IMG_FINISH_EVENT: "img_finish_event",
        /* 
            预加载图片
            1、可以加载一张图，也可以加载多张图片
            2、如果需要设定全部基础路径，可以设置参数basePath
            3、如果需要设定将缺省扩展名图片补足，可以设置suffix参数
            4、可以传入完成调用的回调函数，当不传入这个回调函数时，可以侦听IMG_FINISH_EVENT事件
             获取事件抛发出去finishList，
            5、如果传入是一张图地址，返回就是这一张，如果传入是数组地址，就会返回多个图片的数组
            6、当图片地址错误时，插入对应的null

            参数：
            sourceArr  Array或者String   加载的图片地址列表或者一张图片地址
                       Array 加载多张图片地址  
                       String 加载一张图片，为了后续使用，我们统一使用数组，所以如果这个是String，
                       将设置sourceArr是空数组，并且这个字符串放在这个数组中，成为数组的唯一元素
            finishHandler  Function 或者 undefined  完成执行回调函数
                       Function  当图片预加载完成，通过回调该函数，将加载完成的图片传回给这个数组参数中
                       undefined 在后面将会通过事件抛发机制将数据传回
            basePath  string 基础路径
                    为了将传入地址中路径补齐基础路径
            suffix   string   扩展名
                    为了将传入地址中补齐扩展名
            1、判断sourceArr是否是字符串，如果是字符串，则让它变为数组，并且让这个字符串作为唯一元素，目的是
            统一所有的给入地址都是数组，方便调用
            2、判断basePath是否是字符串，判断当前这个basePath尾部是不是/结束，如果不是/结束，增加/
                然后遍历地址数组，将basePath添加在地址数组的前面,如果传入的地址前面有/，就将原来的/去掉
            3、判断suffix是否是字符串，然后判断suffix的第一位是否是.，如果不是.，在前面增加.
                然后遍历地址数组，判断地址数组中每个地址是否在倒数第4位或者倒数5是否是.如果是，就不需要加
                suffix，如果不是在地址后增加suffix
            4、创建一个新图片元素，并且设置这个图片元素的地址为sourceArr的第0项开始加载，并且侦听事件load和error
            如果加载完成执行loadHandler，加载失败执行errorHandler。因为我们在后面是以当前这个图片为中心载体
            不断更改其地址，使其不断加载新的图片，去激活load事件执行对应的方法，因此，这个图片载体上存储一些数据
            这些数据包括当前加载图片的为n，当前加载完图片存储的数组finishList，当前需要加载图片地址数组，加载完成
            后需要执行的回调函数finishHandler，全部存储在这个图片对象中
                        
        */
        loadImage: function (sourceArr, finishHandler, basePath, suffix) {
            if (typeof sourceArr === "string") sourceArr = [sourceArr];
            if (basePath && typeof basePath === "string") {
                basePath = basePath.endsWith("/") ? basePath : basePath + "/";
                sourceArr = sourceArr.map(function (item) {
                    item = String(item);
                    return basePath + (item.startsWith("/") ? item.slice(1) : item);
                })
            }

            if (suffix && typeof suffix === "string") {
                suffix = suffix.startsWith(".") ? suffix : "." + suffix;
                sourceArr = sourceArr.map(function (item) {
                    item = String(item);
                    // if(item.endsWith(".",item.length-3) || item.endsWith(".",item.length-4))
                    if (![item.slice(-5, -4), item.slice(-4, -3)].includes(".")) item += suffix;
                    return item;
                })
            }

            var img = new Image();
            img.src = sourceArr[0];
            img.n = 0;
            img.finishList = [];
            img.sourceArr = sourceArr;
            img.finishHandler = finishHandler;
            img.addEventListener("load", this.loadHandler);
            img.addEventListener("error", this.errorHandler);
        },
        /* 
            加载完成执行的函数
            参数
               e 加载完成的事件对象event load
               这个函数中的this是加载图片的侦听对象，就是上一个函数中img
             1、当加载完成后，将当前图片克隆复制的新图片放入到当前图片的载体属性finishList（完成后图片数组）中
             2、判断加载下一张图片是否完成，如果完成了，返回true就直接跳出
        
        */
        loadHandler: function (e) {
            this.finishList.push(this.cloneNode(false));
            if (Utils.nextImg(this)) return;
        },
        /*
          加载失败执行的函数
          参数
             e 加载完成的事件对象event error
             这个函数中的this是加载图片的侦听对象，就是上一个函数中img
           1、先判断加载下一张图片是否完成，如果加载完成直接跳出
           2、如果没有完成，把null添加在图片数组中

      */
        errorHandler: function (e) {
            this.finishList.push(null);
            if (Utils.nextImg(this)) return;

        },
        /* 
            加载下一张图片，传入参数当前图片
            img  就是loadImage函数中img，这个加载完成和失败事件函数中this
            1、增加img的需要加载第几张图片n
            2、如果当前需要加载的图片的下标超过了数组的长度
                删除当前图片的加载和失败事件
                判断当前图片属性finishHandler这个回调函数是否是函数，如果是函数，执行这个函数并且将
                当前加载完成的图片数组当参数传入
                如果这个finishHandler不是函数，我们通过事件的抛发，发出Utils.IMG_FINISH_EVENT这个
                字符串的事件，并且在这个事件对象中带入属性finishList数据结果
                如果当前这个数组，仅有一个元素，我们直接返回这个元素，如果有多个元素时，才返回数组
                抛发事件的对象是针对document，因为在页面中document用存在并且唯一
                如果全部加载完成返回true，以方便判断是否继续加载下一张图
            如果没有加载完成，重新设置这个图片的地址为下一个地址，并且返回false
        
        
        */
        nextImg: function (img) {
            img.n++;
            if (img.n > img.sourceArr.length - 1) {
                img.removeEventListener("load", Utils.loadHandler)
                img.removeEventListener("error", Utils.errorHandler)
                if (typeof img.finishHandler === "function") img.finishHandler(img.sourceArr.length === 1 ? img.finishList[0] : img.finishList);
                else {
                    var evt = new Event(Utils.IMG_FINISH_EVENT);
                    evt.finishList = img.sourceArr.length === 1 ? img.finishList[0] : img.finishList;
                    document.dispatchEvent(evt);
                }
                return true;
            }
            img.src = img.sourceArr[img.n];
            return false;
        },
        dragOn: function (elem, rect) {
            elem.addEventListener("mousedown", this.mouseHandler);
            elem.self = this;
            elem.rect = rect;
        },
        dragOff: function (elem) {
            elem.removeEventListener("mousedown", this.mouseHandler);
        },
        mouseHandler: function (e) {
            if (e.type === "mousedown") {
                // this div
                e.preventDefault();
                document.offsetX = e.offsetX;
                document.offsetY = e.offsetY;
                document.div = this;
                document.addEventListener("mousemove", this.self.mouseHandler);
                document.addEventListener("mouseup", this.self.mouseHandler);
            } else if (e.type === "mousemove") {
                // console.log(this)document
                var bool = true;
                if (this.div.rect) {
                    rect = this.div.rect;
                    if (!rect.width) rect.width = 0;
                    if (!rect.height) rect.height = 0;
                    if (!rect.x) rect.x = 0;
                    if (!rect.y) rect.y = 0;
                    if (this.div.parentElement) {
                        rect.x = this.div.parentElement.getBoundingClientRect().x;
                        rect.y = this.div.parentElement.getBoundingClientRect().y;
                    }
                    bool = !(!rect.width && !rect.height)
                } else {
                    rect = this.div.parentElement.getBoundingClientRect();
                    if (this.div.parentElement === document.body) {
                        bool = false;
                    }
                    if (this.div.parentElement.clientLeft) rect.width -= this.div.parentElement.clientLeft * 2;
                    if (this.div.parentElement.clientTop) rect.height -= this.div.parentElement.clientTop * 2;
                }
                var x = e.clientX - this.offsetX - rect.x;
                var y = e.clientY - this.offsetY - rect.y;
                if (bool) {
                    if (x <= 0) x = 0;
                    if (y <= 0) y = 0;
                    var w = (!rect.width) ? 0 : (rect.width - this.div.offsetWidth);
                    var h = (!rect.height) ? 0 : (rect.height - this.div.offsetHeight);
                    if (x >= w) x = w;
                    if (y >= h) y = h;
                }
                this.div.style.left = x + "px";
                this.div.style.top = y + "px";
            } else if (e.type === "mouseup") {
                // this document
                this.removeEventListener("mousemove", this.div.self.mouseHandler);
                this.removeEventListener("mouseup", this.div.self.mouseHandler);
            }
        },
        randomColor: function (a, r, g, b) {
            if (a === undefined) a = 1;
            var color = "rgba(";
            for (var i = 0; i < 3; i++) {
                color += (arguments[i + 1] === undefined ? ~~(Math.random() * 256) : arguments[i + 1]) + ",";
            }
            color += (a < 0 ? Math.random().toFixed(2) : a) + ")";
            return color;
        }
    }
})();