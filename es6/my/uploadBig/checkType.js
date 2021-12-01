/**
 * 原文链接
 * https://juejin.cn/post/6971935704938971173
 */

/**
 * ArrayBuffer对象代表储存二进制数据的一段内存，
 * 它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。
 * 
 * ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。
 * const buf = new ArrayBuffer(32);
 * 上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。
 * 可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。
 */

const buffer = new ArrayBuffer(12);

/**
 * 下面代码对同一段内存，分别建立两种视图：
 * 32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array构造函数）。
 */
const x1 = new Int32Array(buffer);
x1[0] = 1;

const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2

/**
 * ArrayBuffer 方式读取文件内容
 * 
 */

function readBuffer(file, start = 0, end = 2) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    }

    reader.onerror = reject;

    reader.readAsArrayBuffer(file.slice(start, end)); // File file.slice 按照字节获取数据
  })
}

/**
 * 遍历判断是否一致
 * 
 */

function check(headers) {
  return (buffers, options = { offset: 0 }) =>
    headers.every(
      (header, index) => header === buffers[options.offset + index]
    );
}

const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]); // PNG图片对应的魔数

/**
 * <div>
 *  选择文件：<input type="file" id="inputFile" accept="image/*"
 *            onchange="handleChange(event)" />
 *  <p id="realFileType"></p>
 * </div>
 */


const realFileElement = document.querySelector("#realFileType");

/**
 * 获取文件前8个字节数据，取出后和png的前8个字节对比
 * 
 */
//input change
async function handleChange(event) {
  const file = event.target.files[0];
  const buffers = await readBuffer(file, 0, 8);
  // 不带符号整数视图
  const uint8Array = new Uint8Array(buffers);

  realFileElement.innerText = `${file.name}文件的类型是：${
    isPNG(uint8Array) ? "image/png" : file.type
  }`;
}





  