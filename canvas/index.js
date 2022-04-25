function draw(params) {
  let canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 600;
  let context = canvas.getContext('2d');

  context.beginPath();
  context.moveTo(100, 100);
  context.lineTo(300,300);
  context.lineTo(100,500);
  context.lineWidth = 5;
  context.strokeStyle = 'red';
  context.stroke();

  context.beginPath();
  // 先规划然后绘制
  context.moveTo(300, 100);
  context.lineTo(500,300);
  context.lineTo(300,500);
  context.lineWidth = 5;
  context.strokeStyle = 'blue';
  context.stroke();

  context.beginPath();
  context.moveTo(500, 100);
  context.lineTo(700,300);
  context.lineTo(500,500);
  context.lineWidth = 5;
  context.strokeStyle = 'black';

  context.stroke(); // 会重新绘制三条黑色的折线

  // context.beginPath();
  // context.moveTo(150,50);
  // context.lineTo(650,50);
  // context.lineTo(650,550);
  // context.lineTo(150,550);
  // context.lineTo(150,50);     //绘制最后一笔使图像闭合
  // context.closePath();        //使用closePath()闭合图形
  // context.fillStyle = 'yellow';
  // context.lineWidth = 5;
  // context.strokeStyle = "black";
  // context.fill();
  // context.stroke();
  // drawRect(context, 150, 50, 50, 50, "red", 5, "blue");
  context.beginPath();
  context.rect(150, 50,  50, 50); // cxt.rect(x, y, width, height);
  context.lineWidth = 5;
  context.fillStyle = 'red';
  context.strokeStyle = 'blue';
  context.fill();
  context.stroke();
}

function drawRect(cxt, x, y, width, height, fillColor, borderWidth, borderColor){
  cxt.beginPath();
  cxt.moveTo(x, y);
  cxt.lineTo(x + width, y);
  cxt.lineTo(x + width, y + height);
  cxt.lineTo(x, y + height);
  cxt.lineTo(x, y);
  cxt.closePath();

  cxt.lineWidth = borderWidth;
  cxt.strokeStyle = borderColor;
  cxt.fillStyle = fillColor;

  cxt.fill();
  cxt.stroke();
}

// draw();

/**
 * Canvas API的图像裁剪功能是指，在画布内使用路径，只绘制该路径内所包含区域的图像，不绘制路径外的图像。这有点像Flash中的图层遮罩。
 */
function clip() {
  let canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 600;
  let context = canvas.getContext('2d');
  context.fillStyle = "#FFF";
  context.fillRect(0,0,800,600);
  //在屏幕上绘制一个大方块
  context.fillStyle = "black";
  context.fillRect(10,10,200,200);
  context.save();
  context.beginPath();
  //裁剪画布从(0，0)点至(50，50)的正方形
  context.rect(0,0,50,50);
  context.clip();
  //
  context.beginPath();
  context.strokeStyle = "red";
  context.lineWidth = 5;
  context.arc(100,100,100,0,Math.PI * 2,false);
  context.stroke();
  context.closePath();
  context.restore();
  //再次裁切整个画布
  context.beginPath();
  context.rect(0,0,500,500);
  context.clip();
  //绘制一个没有裁切的蓝线
  context.beginPath();
  context.strokeStyle = "blue";
  context.lineWidth = 5;
  context.arc(100,100,50,0,Math.PI * 2,false);
  //整圆
  context.stroke();
  context.closePath();
}

clip();