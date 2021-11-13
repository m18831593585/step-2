// export default class AJAX{

//     constructor(url,callback,{method="GET",body=null}={method:"GET",body:null}){
//         var xhr=new XMLHttpRequest();
//         xhr.callback=callback;
//         xhr.addEventListener("load",e=>this.loadHandler(e));
//         xhr.open(method,url);
//         xhr.send(JSON.stringify(body));
//     }
//     loadHandler(e){
//         var data;
//         try{
//             data=JSON.parse(e.currentTarget.response);
//         }catch(e){
//             data=e.currentTarget.response;
//         }
//         e.currentTarget.callback(data);
//     }
// }

export default function (url, {method = "GET", body = null} = {method: "GET", body: null}) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(body);
        xhr.onload = function () {
            var data = xhr.response;
            try {
                data = JSON.parse(data);
            } catch (e) {
            }
            resolve(data);
        }
        xhr.onerror = function (e) {
            reject(e)
        }
    })
}