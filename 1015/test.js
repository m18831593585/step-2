// 随机生成min ~ max的整数
// 如 50 ~ 75, 随机生成0 ~ 25, 然后结果加50

function random(min, max) {
    return ~~(min + Math.random() * (max - min))
}