更安全？更高效？

效率 = 数量/时间
是因为建立在https协议的基础上，高效？是因为通过二进制分帧
（高效这个词还是模糊了，到底是数量多了，还是时间少了，还是都有优化，进一步看）

完全兼容1.x，在1.x基础上进行的升级

https://juejin.cn/post/6844903667569541133
## http1.1存在的问题

对于同一个域名，浏览器最多只能同时创建 6~8 个 TCP 连接 (不同浏览器不一样)。
**为了解决数量限制**，出现了 域名分片 技术，其实就是资源分域，将资源放在不同域名下 (比如二级子域名下)，这样就可以针对不同域名创建连接并请求，以一种讨巧的方式突破限制，
但是滥用此技术也会造成很多**问题**，
1、比如每个 TCP 连接本身需要经过 DNS 查询、三步握手、慢启动等(看图tcp6，在图中可以看到新建了六个 TCP 连接，每次新建连接 DNS 解析需要时间(几 ms 到几百 ms 不等)、TCP 慢启动也需要时间、TLS 握手又要时间，而且后续请求都要等待队列调度)，
2、还占用额外的 CPU 和内存，
3、对于服务器来说过多连接也容易造成网络拥挤、交通阻塞等，
4、放在移动端来说这些问题更加明显

上述利用了管线化这个特性，但是**管线化存在诸多问题**，
比如第一个响应慢还是会阻塞后续响应（线头阻塞）、
服务器为了按序返回相应需要缓存多个响应占用更多资源、
浏览器中途断连重试服务器可能得重新处理多个请求、
还有必须客户端 - 代理 - 服务器都支持管线化

Header 内容多，而且每次请求 Header 不会变化太多，没有相应的压缩传输优化方案

为了尽可能减少不必要的请求数，需要做合并文件、雪碧图、资源内联等优化工作，
但是这无疑造成了单个请求内容变大延迟变高的问题，且内嵌的资源不能有效地使用缓存机制

明文传输不安全

## http2的优势

### 二进制分帧层
帧是数据传输的最小单位，以二进制传输代替原本的明文传输，原本的报文消息被划分为更小的数据帧:

8bit = 1Byte

#### 什么是帧？
帧的英文是frame，这个单词古已有之，当时意指画框，也作动词，指给画装上画框。
后来有了电影和计算机动画，也就沿用了这个意思，把其中的一幅幅画面称为frame。
译作中文时，选了古汉语中字画的量词“帧”。现仍有“装帧”一词。一幅画装上框之后，便是独立的、拥有完整含义的一个整体了。
于是在计算机通信中，把拥有完整含义的一段信息称为frame。
以太网上传输的一段比特序列，开始于01交替的前导码，后接目标机器MAC地址、源地址……终结于校验码FCS，实在是一个完美的整体。因此，称其为Ethernet frame。
翻译时也就沿用了之前的译法，称作“以太网帧”。
综上，“帧”表示了数据的边界，将**相对完整、独立的一段信息**划分为一帧。
因此，帧的长度和结构由具体应用决定，并没有统一的形态。

帧是数据传输的最小单位，以**二进制传输代替原本的明文传输**，原本的报文消息被划分为更小的数据帧
图 binaryFrameLayer.png

图 http1.1headers.png

图 http2headers.png（对比看下字段变化，跟http1.1大体还是挺像）
图中 h2 的报文是重组解析过后的，可以发现一些头字段发生了变化，而且所有头字段均小写

### 帧的结构
所有帧都是一个固定的 9 字节头部 (payload 之前) 跟一个指定长度的负载 (payload):

+-----------------------------------------------+
|                 Length (24)                   |
+---------------+---------------+---------------+
|   Type (8)    |   Flags (8)   |
+-+-------------+---------------+-------------------------------+
|R|                 Stream Identifier (31)                      |
+=+=============================================================+
|                   Frame Payload (0...)                      ...
+---------------------------------------------------------------+

Frame Payload 是主体内容，由帧类型决定

Length 代表整个 frame 的长度，用一个 24 位无符号整数表示。
除非接收者在 SETTINGS_MAX_FRAME_SIZE 设置了更大的值 (大小可以是 2^14(16384) 字节到 2^24-1(16777215) 字节之间的任意值)，否则数据长度不应超过 2^14(16384) 字节。
头部的 9 字节不算在这个长度里

Type 定义 frame 的类型，用 8 bits 表示。
帧类型**决定了帧主体**的**格式**和**语义**，如果 type 为 unknown 应该忽略或抛弃。

Flags 是**为帧类型相关而预留**的布尔标识。
标识对于不同的帧类型赋予了不同的语义。
如果该标识对于某种帧类型没有定义语义，则它必须被忽略且发送的时候应该赋值为 (0x0)

R 是一个保留的比特位（1 bit）。这个比特的语义没有定义，发送时它必须被设置为 (0x0), 接收时需要忽略。

Stream Identifier 用作流控制，用 31 位无符号整数表示。
客户端建立的 sid 必须为奇数，服务端建立的 sid 必须为偶数，值 (0x0) 保留给与整个连接相关联的帧 (连接控制消息)，而不是单个流


### 共分为十种类型的帧:
HEADERS: 报头帧 (type=0x1)，用来打开一个流或者携带一个首部块片段

DATA: 数据帧 (type=0x0)，装填主体信息，可以用一个或多个 DATA 帧来返回一个请求的**响应主体**

PRIORITY: 优先级帧 (type=0x2)，指定发送者建议的流优先级，可以在任何流状态下发送 PRIORITY 帧，包括空闲 (idle) 和关闭 (closed) 的流

RST_STREAM: 流终止帧 (type=0x3)，用来请求取消一个流，或者表示发生了一个错误，payload 带有一个 32 位无符号整数的错误码 (Error Codes)，不能在处于空闲 (idle) 状态的流上发送 RST_STREAM 帧

SETTINGS: 设置帧 (type=0x4)，设置**此连接的参数**，作用于整个连接

PUSH_PROMISE: 推送帧 (type=0x5)，服务端推送，客户端可以返回一个 RST_STREAM 帧来选择拒绝推送的流

PING: PING 帧 (type=0x6)，判断一个空闲的连接是否仍然可用，也可以测量最小往返时间 (RTT)

GOAWAY: GOWAY 帧 (type=0x7)，用于**发起关闭连接的请求**，或者警示严重错误。GOAWAY 会停止接收新流，并且关闭连接前会处理完先前建立的流

WINDOW_UPDATE: 窗口更新帧 (type=0x8)，用于**执行流量控制**功能，可以作用在单独某个流上 (指定具体 Stream Identifier) 也可以作用整个连接 (Stream Identifier 为 0x0)，只有 DATA 帧受流量控制影响。**初始化流量窗口后，发送多少负载，流量窗口就减少多少，**如果流量窗口不足就无法发送，WINDOW_UPDATE 帧**可以增加流量窗口大小**

CONTINUATION: 延续帧 (type=0x9)，用于继续传送首部块片段序列，见 首部的压缩与解压缩





