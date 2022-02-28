# 状态码

## 作用
告知从服务端返回的请求结果

## 数字中的第一位指定了响应类别
1xx: Informational 信息性状态码
2xx: Success 成功状态码
3xx: Redirection 重定向状态码
4xx: Client Error 客户端错误状态码
5xx: Server Error 服务端错误状态码

# 2xx
200 OK 表示从客户端发来的请求在服务端被正常处理了

204 No Content 
代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分，也不允许返回任何实体的主体。

206 Partial Content
客户端进行了范围请求，而服务端成功的执行了这部分的get请求
响应报文中包含由Content-Range指定范围的实体内容

# 3xx
301 Moved Permanently [permanently 永久地]
永久性重定向 
表示请求的资源已被分配了新的URI，以后请使用资源现在所指的URI

302 Found
临时性重定向
与301类似，但是只是临时性质的

HTTP 302 重定向状态码表明申请的资源被临时的挪动到了由Location头部指定的 URL 上。浏览器会重定向到这个URL
其实就是叫浏览器去访问location中的网址
重定向一下

303 See Other
与302有着相同的功能，但303明确表示客户端应当采用get方法获取资源

304 Not Modified
服务器资源未改变，可直接使用缓存

307 Temporary Redirect
临时重定向
与302有相同含义，302标准禁止POST变成GET，但实际大家并不遵守
307会遵照浏览器标准，不会从POST变成GET

# 4xx
400 Bad Request
表示请求报文中存在语法错误

401 Unauthorized
需要通过认证

403 Forbidden
表明对请求资源的访问被服务器拒绝了
比如公司同事访问服务器报403 '非法服务器' 原因是本地时间和系统时间对不上造成的，传给服务器发现对不上，本地时间比网络时间慢


404 Not Found
服务器上无法找到请求的资源

## 5xx
500 Internal Server Error
服务端执行请求时报错

503 Service Unavailable
服务器暂时处于超负载或者正在进行停机维护















