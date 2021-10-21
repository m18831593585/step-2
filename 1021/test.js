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
sort1(arr)
// console.log(arr)

