import Component from "./Component.js";

export default class Form extends Component {

    static cssBool = false
    elem
    formEle = {}
    form
    currentSex
    showTable
    alertMsg
    timeoutID
    maleList = []
    femaleList = []
    bnList = []

    constructor() {
        super();
        this.createElem()
        Form.setCss()
        this.form = this.elem.querySelector('form')
        this.formEle.user = this.form.querySelector('input[name=user]')
        this.formEle.sex = this.form.querySelectorAll('input[name=sex]')
        this.formEle.age = this.form.querySelector('input[name=age]')
        this.formEle.hobby = this.form.querySelectorAll('input[name=hobby]')
        this.formEle.tel = this.form.querySelector('input[name=tel]')
        this.bnList = this.elem.querySelector('ul')
        this.showTable = this.elem.querySelector('table>tbody')
        this.alertMsg = this.elem.querySelector('#alert-msg')
        this.form.addEventListener('input', e => this.inputHandler(e))
        this.form.addEventListener('submit', e => this.submitHandler(e))
        this.form.addEventListener('reset', e => this.resetHandler(e))
        this.bnList.addEventListener('click', e => this.bnClickHandler(e))
    }

    inputHandler(e) {
        if (this.timeoutID || e.target.type !== "text") return
        this.timeoutID = setTimeout(() => {
            this.verify(e.target.name)
            clearTimeout(this.timeoutID)
            this.timeoutID = undefined
        }, 500)
    }

    bnClickHandler(e) {
        this.currentSex = Array.from(this.bnList.children).indexOf(e.target) ? 0 : 1
        this.render()
    }

    resetHandler(e) {
        e.preventDefault()
        this.form.querySelectorAll('input[type=text]').forEach(item => item.value = '')
        this.formEle.sex.forEach(item => item.checked = false)
        this.formEle.hobby.forEach(item => item.checked = false)
        this.formEle.sex[0].checked = true
    }


    submitHandler(e) {
        e.preventDefault()
        if (!this.verify()) return
        this.generatePerson()
        this.render()
        this.form.dispatchEvent(new Event('reset'))
    }

    verify(item) {
        let flag = true
        this.alertMsg.innerHTML = ""
        switch (item) {
            case 'user':
                return this.verifyUser()
            case 'age':
                return this.verifyAge()
            case 'tel':
                return this.verifyTel()
            case undefined:
                flag &= this.verifyUser()
                flag &= this.verifyAge()
                flag &= this.verifyTel()
                flag &= this.verifyHobby()
                return flag
        }
    }

    verifyUser() {
        if (!(/^[a-zA-Z0-9_-]{4,16}$/.test(this.formEle.user.value))) {
            this.alertMsg.innerHTML += "用户名需满足4到16位（字母，数字，下划线，减号）<br>"
            return false
        }
        return true
    }

    verifyAge() {
        if (!(/^[1-9]\d{0,3}$/.test(this.formEle.age.value))) {
            this.alertMsg.innerHTML += "年龄需满足1到3位数字<br>"
            return false
        }
        return true
    }

    verifyTel() {
        if (!(/^1[345789]\d{9}$/.test(this.formEle.tel.value))) {
            this.alertMsg.innerHTML += "电话号码不正确<br>"
            return false
        }
        return true
    }

    verifyHobby() {
        let hobbyFlag = false
        this.formEle.hobby.forEach(item => {
            if (item.checked) hobbyFlag = true
        })
        if (!hobbyFlag) {
            this.alertMsg.innerHTML += "请选择爱好<br>"
            return false
        }
        return true
    }

    generatePerson() {
        let fd = new FormData(this.form)
        let data = fd.entries()
        let person = {}
        for (let item of data) {
            if (item[0] === 'hobby') {
                if (!person[item[0]]) person[item[0]] = []
                person[item[0]].push(item[1])
                continue
            }
            person[item[0]] = item[1]
        }
        this.currentSex = person.sex === "男" ? 1 : 0
        this.pushPersonInfo(person)
    }

    pushPersonInfo(person) {
        let _person = {}
        Object.assign(_person, person)
        this.currentSex ? this.maleList.push(_person) : this.femaleList.push(_person)
    }

    render() {
        let _list = this.currentSex ? this.maleList : this.femaleList
        this.showTable.innerHTML = _list.reduce((value, item) => {
            return value + `
                <tr>
                    <td>${item.user}</td>
                    <td>${item.sex}</td>
                    <td>${item.age}</td>
                    <td>${item.hobby}</td>
                    <td>${item.tel}</td>
                </tr>
            `
        }, '')
    }


    createElem() {
        this.elem = document.createElement("div")
        this.elem.classList.add("formElem")
        this.elem.innerHTML = `
            <form action="#">
                <label>用户名:</label><input type="text" name="user"><span></span><br>
                <label>性别:</label>
                <label for="male">男</label><input type="radio" value="男" name="sex" id="male" checked>
                <label for="female">女</label><input type="radio" value="女" id="female" name="sex"><br>
                <label>年龄:</label><input type="text" name="age"><span></span><br>
                <label>爱好:</label>
                <label>游泳</label><input type="checkbox" value="游泳" name="hobby">
                <label>看书</label><input type="checkbox" value="看书" name="hobby">
                <label>游戏</label><input type="checkbox" value="游戏" name="hobby">
                <label>唱歌</label><input type="checkbox" value="唱歌" name="hobby"><br>
                <label>电话:</label><input type="text" name="tel"><span></span><br>
                <button>添加</button>
                <div id="alert-msg"></div>
            </form>
            <ul>
                <li>男</li>
                <li>女</li>
            </ul>
            <table>
                <thead>
                <tr>
                    <th>用户名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                    <th>电话</th>
                </tr>
                </thead>
                <tbody>
            
                </tbody>
            </table>
        `
    }


    static setCss() {
        if (Form.cssBool) return
        Form.cssBool = true
        super.setCss(`
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            height: 30px;
            margin-top: 20px;
        }

        li {
            float: left;
            padding: 0 40px;
            background-color: skyblue;
            border: 1px solid #000;
        }

        table {
            width: 600px;

            border: 1px solid #000;
            border-collapse: collapse;
            overflow: auto;
        }

        thead th, tbody td {
            border: 1px solid #000;

        }

        thead > tr {
            height: 30px;
        }

        tbody td {
            text-align: center;
        }

        #alert-msg {
            color: red;
        }
        `)
        Form.cssBool = true
    }
}