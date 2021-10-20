// function arrayFill(arr, value, start, end) {
//     if (!arr || arr.constructor !== Array) throw new Error(arr + "不是数组")
//     if (isNaN(start)) start = 0
//     if (isNaN(end)) end = arr.length
//     if (start < 0) start = start + arr.length > 0 ? 0 : start + arr.length
//     if (end < 0) end = end + arr.length < 0 ? 0 : end + arr.length
//     if (end > arr.length) end = arr.length
//     for (let i = start; i < end; i++) {
//         arr[i] = value
//     }
//     return arr
// }

let arr = [1, 2, 3, 4]
console.log(arr)
// arrayFill(arr, 1, 2, 5)
// console.log(arr)

function arrayUnshift(arr){
    // 在数组头部添加一个或多个元素 返回新长度
    if(!arr || arr.constructor !== Array) throw new Error(arr+" is not an array")
    
}


