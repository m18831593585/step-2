export default class CheckBox extends EventTarget{
    value
    name
    item
    checked
    static isCssExist = false

    constructor(value, name) {
        super()
        this.value = value
        this.checked = false
        this.name = name
        this.item = document.createElement("div")
        this.item.className = "checkbox_item clear"
        this.item.setAttribute("name", name)
        this.addContent()
        this.item.addEventListener("click", e=>this.clickHandler())
        console.dir(this.item)
        if (CheckBox.isCssExist) return // 如果已经存在css则不添加
        CheckBox.setCss()
        CheckBox.isCssExist = true
    }

    clickHandler(e) {
        this.checked = !this.checked
        this.changeCheck(this.checked)
        let evt = new Event("CHECKED_EVENT")
        evt.checked = this.checked
        evt.name = this.name
        evt.value = this.value
        console.log("click")
        this.dispatchEvent(evt)
        // console.dir(this.item)
    }

    changeCheck(checked) {
        if (checked) this.item.setAttribute("active","")
        else this.item.removeAttribute("active")
    }


    appendTo(target) {
        target.appendChild(this.item)
    }

    addContent() {
        this.item.innerHTML = `
            <div class="checkbox_box"></div>
            <span class="checkbox_text">${this.value}</span>
        `
    }

    static setCss() {
        let str = `
        .checkbox_item{
            padding: 5px 5px;
            float: left;
        }
        .checkbox_item.clear::after{
            content: "";
            display: block;
            visibility: hidden;
            clear: both;
            height: 0;
            overflow: hidden;
        }
        .checkbox_item>.checkbox_box{
            width: 14px;
            height: 14px;
            background-image: url(./img/new_icon.png);
            background-position-x: -238px;
            background-position-y: -37px;
            float: left;
            margin-top: 4px;
        }
        .checkbox_item[active]>.checkbox_box{
            background-position-x: -128px;
            background-position-y: -126px;
        }
        .checkbox_item>.checkbox_label{
            float: left;
            margin-left: 5px;
            user-select: none;
        }
        `

        if (document.styleSheets.length === 0) {
            document.head.appendChild(document.createElement("style"))
        }
        let stylesheet = document.styleSheets[document.styleSheets.length - 1]
        str.replace(/\n/g, "").replace(/(.*?)\{(.*?)\}/g, (t, $1, $2) => {
            stylesheet.addRule($1, $2, stylesheet.cssRules.length)
        })
    }

}