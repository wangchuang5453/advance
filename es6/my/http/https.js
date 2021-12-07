/**
 * https 是基于http的扩展，用于计算机网络的安全通信
 * 在https中，原有的http协议会得到TLS（安全传输层协议）或其前辈SSL（安全套接层）的加密
 * 因此，https也常指http over tls或者 http over ssl
 * 
 * https原理
 * 
 * https是在http的基础上，做了进一步的安全处理。
 * http是通过对传输内容进行 对称加密 的方式进行交互的，对称加密这种方式，加密和解密都使用同一个密钥。
 * 
 * 客户端和服务端要维护同样一份密钥，在数据加密前，首先要双方同步密钥，这就要进行一次密钥的传输，
 * 这个过程中如果密钥被截获，那么客户端和服务端之间传输的内容就会被解密，造成安全问题。
 * 同时，维护密钥的负担也很重。就像谍战片中的密码本。
 * 上述过程我们可以发现，密钥在传输过程中会被截获是http传输的主要安全问题。
 * 
 * https通过 非对称加密 的方式解决了这个问题。
 * 非对称加密这种方式需要使用两个不同的密钥，公钥和私钥。
 * 公钥和私钥是一对儿。如果使用公钥加密，就要用私钥解密。如果使用私钥加密就要用公钥解密。
 * 
 * 客户端在服务端获取到公钥，使用公钥对 用于对称加密的密钥 进行加密，然后将加密后的密钥传送给
 * 服务器，即使公钥被截获，也因为不知道私钥是什么而无法解密。这样使用公钥加密的密钥就会被安全的传送到
 * 服务端，服务端使用私钥解密，拿到密钥。双方则可以进行更加安全的数据交互。
 * 
 * 非对称加密相比于对称加密：计算量较大，加密和解密都比较慢
 */


/**
 * https实际的实现过程
 * 
 * 客户端请求 HTTPS 网址，然后连接到 server 的 443 端口 (HTTPS 默认端口，类似于 HTTP 的80端口)
 * 
 * 采用 HTTPS 协议的服务器必须要有一套数字 CA (Certification Authority)证书，
 * 证书是需要申请的，并由专门的数字证书认证机构(CA)通过非常严格的审核之后颁发的电子证书 (当然了是要钱的，安全级别越高价格越贵)。
 * 颁发证书的同时会产生一个私钥和公钥。私钥由服务端自己保存，不可泄漏。公钥则是附带在证书的信息中，可以公开的。
 * 证书本身也附带一个证书电子签名，这个签名用来验证证书的完整性和真实性，可以防止证书被篡改
 * 
 * 服务器响应客户端请求，将证书传递给客户端，证书包含公钥和大量其他信息，比如证书颁发机构信息，公司信息和证书有效期等。
 * 
 * 客户端解析证书并对其进行验证。如果证书不是可信机构颁布，或者证书中的域名与实际域名不一致，或者证书已经过期，就会向访问者显示一个警告，由其选择是否还要继续通信。
 * 
 * 如果证书没有问题，客户端就会从服务器证书中取出服务器的公钥A。然后客户端还会生成一个随机码 KEY，并使用公钥A将其加密。
 * 
 * 客户端把加密后的随机码 KEY 发送给服务器，作为后面对称加密的密钥
 * 
 * 服务器在收到随机码 KEY 之后会使用私钥B将其解密。
 * 经过以上这些步骤，客户端和服务器终于建立了安全连接，完美解决了对称加密的密钥泄露问题，接下来就可以用对称加密愉快地进行通信了
 * 
 * 服务器使用密钥 (随机码 KEY)对数据进行对称加密并发送给客户端，客户端使用相同的密钥 (随机码 KEY)解密数据。
 * 
 * 双方使用对称加密愉快地传输所有数据
 */


/**
 * https相比http加了一层安全层，建立连接的过程更复杂
 * 
 * TLS 握手
 * SSL （安全套接字层）是为 HTTP 开发的原始加密协议。
 * 不久前，SSL 被 TLS （传输层安全性）所取代。SSL 握手现在称为 TLS 握手，尽管“SSL”这个名称仍在广泛使用。
 * 
 * 通过 TCP 握手打开 TCP 连接后，将发生 TLS 握手。
 * 
 * 
 * TCP三次握手
 * 
 * 企业微信打电话信号不好
 * 1：喂，听得到吗
 * 2：听到了，你听到吗？
 * 1：听到了听到了
 * 121212blabla...
 * 
 * 彼此都发出了自己的消息，又都收到了对方的消息
 * 
 * 
 * 
 */