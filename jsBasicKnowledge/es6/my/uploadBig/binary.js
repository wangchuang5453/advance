/**
 * 玩转前端二进制
 * https://mp.weixin.qq.com/s/QHi6BVM5Jt8XwZ_FKcRYsg
 * 
 */

/**
 * 本文阿宝哥将按照以下的流程来介绍前端如何进行图片处理，
 * 然后穿插介绍二进制、Blob、Blob URL、Base64、Data URL、ArrayBuffer、TypedArray、DataView 和图片压缩相关的知识点。
 */

/**
 * 讲的很细致 Blob URL、Base64、Data URL这几个理解的很清楚
 */


// Data URL
/**
 * <input type="file" accept="image/*" onchange="loadFile(event)" />
 * <img id="previewContainer" />
 */

function loadFile(e) {
  const reader = new FileReader();
  
  reader.onload = () => {
    const output = document.querySelector('#previewContainer');
    // 把获取 Data URL 数据赋给 img 元素的 src 属性，从而实现图片本地预览
    output.src = reader.result;
  }

  reader.readAsDataURL(e.target.files[0]);
}

/**
 * Data URL:
 * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAAIwCAYAAADXrFK...
 * 
 * 这串奇怪的字符串被称为 Data URL，它由四个部分组成
 * data:[<mediatype>][;base64],<data>
 * 前缀（data:）
 * 指示数据类型的 MIME 类型
 * 如果非文本则为可选的 base64 标记
 * 数据本身
 * 
 * mediatype 是个 MIME 类型的字符串，比如 "image/png" 表示 PNG 图像文件。
 * 如果被省略，则默认值为 text/plain;charset=US-ASCII。
 * 如果数据是文本类型，你可以直接将文本嵌入（根据文档类型，使用合适的实体字符或转义字符）。
 * 如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。
 * 
 * 在 Web 项目开发过程中，为了减少 HTTP 请求的数量，对应一些较小的图标，我们通常会考虑使用 Data URL 的形式内嵌到 HTML 或 CSS 文件中。
 * 「但需要注意的是：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。」
 * 
 * 在 Data URL 中，数据是很重要的一部分，它使用 base64 编码的字符串来表示。因此要掌握  Data URL，我们还得了解一下 Base64。
 * 
 * 
 */

// Base64 ... 直接阅读原文，理解起来需要看图








// Object URL

/**
 * Object URL 是一种伪协议，也被称为 Blob URL。它允许 Blob 或 File 对象用作图像，下载二进制数据链接等的 URL 源。
 * 
 * 在浏览器中，我们使用 URL.createObjectURL 方法来创建 Blob URL，该方法接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 blob:<origin>/<uuid>
 * 对应的示例如下：
 * blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
 * 
 * 浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 「URL → Blob」 映射。因此，此类 URL 较短，但可以访问 Blob
 * 生成的 URL 仅在当前文档打开的状态下才有效。但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。
 * 
 * 上述的 Blob URL 看似很不错，但实际上它也有副作用。
 * 虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。
 * 映射在文档卸载时自动清除，因此 Blob 对象随后被释放。但是，如果应用程序寿命很长，那不会很快发生。
 * 因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。
 * 
 * 针对这个问题，我们可以调用 URL.revokeObjectURL(url) 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。
 */

const image = document.querySelector("#previewContainer");
fetch("https://avatars3.githubusercontent.com/u/4220799")
  .then((response) => response.blob())
  .then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
    URL.revokeObjectURL(objectURL)
  });
