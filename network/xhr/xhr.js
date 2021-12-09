/**
 * XMLHttpRequest
 * 
 * 手写ajax
 */

/**
 * 简易版
 * @param {*} url 
 * @returns 
 */
const getJson = function ({ url, data, method = 'get' }) {
  return Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let arr = [];
    for (const key in data) {
      if (Object.hasOwnProperty.call(object, key)) {
        const value = data[key];
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    const str = arr.join('&');
    if (method.toLowerCase() == 'get') {
      // XMLHttpRequest.open() 方法初始化一个请求
      xhr.open('get', `${url}?${str}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    } else if (method.toLowerCase() == 'post') {
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(str);
    }
    // XMLHttpRequest.setRequestHeader() 是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send() 之间调用
    // myReq.setRequestHeader(header, value);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      // readyState：请求状态码

      // readyState表示异步对象目前的状态，状态码从0到4：
      // 0: 表示请求未初始化，还没有调用 open()
      // 1: 服务器连接已建立，但是还没有调用 send()
      // 2: 请求已接收，正在处理中（通常现在可以从响应中获取内容头）
      // 3: 请求处理中，通常响应中已有部分数据可用了，没有全部完成
      // 4: 当readyState状态码为4时，表示请求已完成；此阶段确认全部数据都已经解析完毕，可以通过异步对象的属性获取对应数据

      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        // responseText：后台返回的字符串形式的响应数据
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    }
  });
}

