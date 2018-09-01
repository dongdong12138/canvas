var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 2;

// 自动设置canvas尺寸
autoSetCanvasSize(canvas);

// 监听鼠标事件
listenToUser(canvas);

// 监听橡皮擦
var eraserEnabled = false;
eraser.onclick = function () {
  // 如果eraser是true，就变成false，反之亦然
  eraserEnabled = true;
  // actions.className = 'actions x';
  this.classList.add('active');
  pen.classList.remove('active');
};
pen.onclick = function () {
    eraserEnabled = false;
    // actions.className = 'actions';
    this.classList.add('active');
    eraser.classList.remove('active');
};

// 设置画笔颜色
black.onclick = function () {
  context.fillStyle = 'black';
  context.strokeStyle = 'black';
  this.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
};
red.onclick = function () {
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  this.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  black.classList.remove('active');
};
green.onclick = function () {
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
  this.classList.add('active');
  red.classList.remove('active');
  blue.classList.remove('active');
  black.classList.remove('active');
};
blue.onclick = function () {
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
  this.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  black.classList.remove('active');
};

// 设置画笔粗细
thin.onclick = function () {
  lineWidth = 2;
};
middle.onclick = function () {
  lineWidth = 4;
};
thick.onclick = function () {
  lineWidth = 6;
};

// 清空画布
clear.onclick = function () {
  context.clearRect(0,0,canvas.width,canvas.height);  
};

// 保存画布
save.onclick = function () {
  var url = canvas.toDataURL('image/png');
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '我的画';
  a.target = '_blank';
  a.click();
  context.fillStyle = 'red';
  context.fillRect(0, 0, canvas.width, canvas.height);
};




/********************* 工 具 函 数 **********************/

// 自动设置canvas尺寸
function autoSetCanvasSize(canvas) {
  setCanvasSize();
  window.onresize = function () {
    setCanvasSize();
  };
  // 设置canvas尺寸
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

// 监听鼠标事件
function listenToUser(canvas) {
  var using = false;
  var lastPoint = {x: undefined, y: undefined};

  if (document.body.ontouchstart !== undefined ) {    // 触屏设备
    canvas.ontouchstart = function (event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      using = true;
      if  (eraserEnabled) {
        context.clearRect(x-5, y-5, 10, 10);
      } else {
        lastPoint = {x: x, y: y};
      }
    };
  
    canvas.ontouchmove = function (event) {
      var x = event.touches[0].clientX;
      var y = event.touches[0].clientY;
      
      if (!using) { return; }
  
        if (eraserEnabled) {
          context.clearRect(x-5, y-5, 10, 10);
        } else {
          var newPoint = {x: x, y: y};
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 5);
          lastPoint = newPoint;
        }
    };
  
    canvas.ontouchend = function () {
      using = false;
    };
  } else {                                            // 非触屏设备                                   
    canvas.onmousedown = function (event) {
      var x = event.clientX;
      var y = event.clientY;
      using = true;
      if  (eraserEnabled) {
        context.clearRect(x-5, y-5, 10, 10);
      } else {
        lastPoint = {x: x, y: y};
      }
    //   drawCircle(x, y, 3);
    };
  
    canvas.onmousemove = function (event) {
      var x = event.clientX;
      var y = event.clientY;
      
      if (!using) { return; }
  
        if (eraserEnabled) {
          context.clearRect(x-5, y-5, 10, 10);
        } else {
          var newPoint = {x: x, y: y};
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, 5);
          lastPoint = newPoint;
        }
    };
  
    canvas.onmouseup = function () {
      using = false;
    };
  }
}

// 画圆
function drawCircle(x, y, r) {
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI*2);
  context.fill();  
}

// 画线
function drawLine(a, b, c, d) {
  context.beginPath();
  context.moveTo(a, b);
  context.lineWidth = lineWidth;
  context.lineTo(c, d);
  context.stroke();
  context.closePath();
}
