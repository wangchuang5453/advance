/**
 * 模板字符串简单实现，不能模拟换行情况
 * 正则：https://juejin.cn/post/6844903487155732494
 * 
 */
function strModel(str) {
    /**
     * [^abc]，表示是一个除"a"、"b"、"c"之外的任意一个字符
     */
    let reg = /\$\{([^\}]*)\}/g;
    str = str.replace(reg, function (x,y) { // 如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用
        console.log(arguments)
        return eval(y)
    })
    return str;
}

const a = 1;
const str = strModel('hshs${a}')
console.log(str);


// function strTemplate(str) {
//   let reg = /\$\{([^\}]*)\}/g;
//   str = str.replace(reg, function (x, y) {
//     return eval(y);
//   })
//   return str;
// }

