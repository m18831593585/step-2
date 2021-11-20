let o = {
    _a: 1,
    b: 2,
    c: 3,

    get a() {
        return this._a;
    },

    set a(value) {
        this._a = value;
    }

};

Object.defineProperty(o, "_a", {
    enumerable: false
})

// console.log(o)


let f = function () {
    let pv = 1;
    console.log(this)
    return function () {
        console.log(pv)
    }
}


function currying() {
    let sum = 0
    return function () {
        let args = [].slice.call(arguments);
        if (args.length === 0) console.log(sum);
        else while (args.length) sum += args.shift()
    }
}

currying(1, 2, 3)()

