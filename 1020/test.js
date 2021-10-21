let arr = [4, 5, 6, , 7, 3, 1, 5, 7, 8, 6, 5, 3]

// 重构桶排序
function _sort() {
    function sort1(arr) {
        let o = {}
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            if (!o[arr[i]]) {
                o[arr[i]] = 0
            }
            o[arr[i]]++
        }
        for (let key in arr) {
            newArr = newArr.concat(Array(o[key]).fill(key))
        }
        return newArr
    }

    let sortedArr = sort1(arr)
    console.log(sortedArr)
}

// _sort()


// 重构indexOf
function _indexOf() {
    function arrayIndexOf(arr, item, begin) {
        if (!Array.isArray(arr)) throw new Error(arr + " is not array")
        if (begin === undefined) begin = 0
        begin = ~~begin
        begin = begin < 0 ? (begin + arr.length < 0 ? 0 : begin + arr.length) : begin
        for (let i = begin; i < arr.length - begin; i++) {
            if (arr[i] === item) return i
        }
        return -1

    }


    console.log(arrayIndexOf(arr, 7, 4))
}

// _indexOf()

// 列出每个元素出现次数
function showNum() {
    function calc(arr) {
        let o = {}
        for (let i = 0; i < arr.length; i++) {
            if (!(i in arr)) continue
            if (!o[arr[i]]) o[arr[i]] = 0
            o[arr[i]]++
        }
        return o
    }

    console.log(calc(arr))
}

// showNum()


// 数组去重
