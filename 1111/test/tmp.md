1 2 9 4 10 13 ? 14 15 16 3 5 6 8 7

宏

```js
setTimeout(function () {
    console.log(15);
    Promise.resolve().then(function () {
        console.log(16);
    });
}, 0);


setTimeout(function () {
    console.log(3);
}, 0);


setTimeout(function () {
    console.log(5);
}, 0);

setTimeout(function () {
    (async function () {
        console.log(6);
        return function () {
            console.log(7);
        };
    })().then(function (fn) {
        console.log(8);
        fn();
    });
}, 0);




```

微

```js




```