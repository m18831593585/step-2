let arr=[1,2,3,4,8,3,1,2]
// let r=arr.reduce(function fn(result, value, i, arr){
//     return result+=value
// },10)




/*

function arrayReduce(arr, fn, init){
    if(!Array.isArray(arr)) throw new Error("input is not an array")
    let i=0, result=0
    if(init !== undefined) {
        result=init
        i=0
    }else{
        result=arr[0]
        i=1
    }

    for(; i<arr.length; i++){
        result=fn(result, arr[i], i, arr)
    }
    return result
}

function fn(result, value, index, arr){
    return result+=value
}

let r=arrayReduce(arr, fn,10)

console.log(r)

*/


function sort1(arr){
    let min,temp;
    let flag=false
    for(let i=0;i<arr.length;i++){
        min=i
        for(let j=i;j<arr.length;j++){
            if(arr[j]<arr[min]){
                min=j;
                flag=true
            }
        }
        if(flag){
            temp=arr[i]
            arr[i]=arr[min]
            arr[min]=temp;
            flag=!flag
        }
    }
    console.log(arr)
}
// sort1(arr)
// console.log(arr)


// foreach
// function arrayForEach(arr, fn){
//     if(!Array.isArray(arr)) throw new Error("error")
//     for(let i=0;i<arr.length; i++){
//         fn(arr[i], i, arr)
//     }
// }
//
// function fn(value, index, arr){
//     console.log(value, index)
// }
// arrayForEach(arr, fn)


// map
// function arrayMap(arr, fn){
//     if(!Array.isArray(arr)) throw new Error("error")
//     let newArr=[]
//     for (let i=0;i<arr.length;i++){
//         if(!(i in arr)) continue
//         newArr[i] = fn(arr[i], i, arr)
//     }
//     return newArr
// }
//
// function fn(value, index, arr){
//     return String(value)+String(index)
// }
// console.log(arrayMap(arr,fn))


// reduce
// function arrayReduce(arr, fn, init){
//     if(!Array.isArray(arr)) throw new Error("error")
//     let index, result
//     result = init===undefined ? init : arr[0]
//     index = init===undefined ? 0 : 1
//     for(; index<arr.length; index++){
//         result += fn(result, arr[index], index, arr)
//     }
//     return result
// }


// quickSort
function quickSort(arr){
    if(!Array.isArray(arr)) throw new Error("error")
    if(arr.length<=1) return arr
    let left=[], right=[]
    // let pivotIndex = ~~(arr.length / 2)
    let pivot = Number(arr.splice(~~(arr.length / 2), 1))
    for(let i = 0; i < arr.length; i++){
        if(arr[i] < pivot) {
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot, quickSort(right))
}

console.log(quickSort(arr))
