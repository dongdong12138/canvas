var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 自动设置canvas尺寸
autoSetCanvasSize(canvas);

// 监听鼠标事件
listenToUser(canvas);

// 监听橡皮擦
var eraserEnabled = false;
eraser.onclick = function () {
  // 如果eraser是true，就变成false，反之亦然
  eraserEnabled = true;
  actions.className = 'actions x';
};
brush.onclick = function () {
    eraserEnabled = false;
    actions.className = 'actions';
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
function drawLine(a, b, c, d, width) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = width;
  context.moveTo(a, b);
  context.lineTo(c, d);
  context.stroke();
  context.closePath();
}
