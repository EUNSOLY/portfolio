// https://gist.github.com/Yaffle/1145197
/*
  convertPointFromPageToNode(element, event.pageX, event.pageY) -> {x, y}
  returns coordinate in element's local coordinate system (works properly with css transforms without perspective projection)
  convertPointFromNodeToPage(element, offsetX, offsetY) -> {x, y}
  returns coordinate in window's coordinate system (works properly with css transforms without perspective projection)
*/

(function () {
  "use strict";

  let I = new WebKitCSSMatrix();

  function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Point.prototype.transformBy = function (matrix) {
    let tmp = matrix.multiply(I.translate(this.x, this.y, this.z));
    return new Point(tmp.m41, tmp.m42, tmp.m43);
  };

  // new WebKitCSSMatrix(), new WebKitCSSMatrix(string)
  // WebKitCSSMatrix#m41, WebKitCSSMatrix#m42, WebKitCSSMatrix#m43
  // WebKitCSSMatrix#multiply, WebKitCSSMatrix#translate, WebKitCSSMatrix#inverse

  function getTransformationMatrix(element) {
    let transformationMatrix = I;
    let x = element;

    while (x != undefined && x !== x.ownerDocument.documentElement) {
      let computedStyle = window.getComputedStyle(x, undefined);
      let transform = computedStyle.transform || "none";
      let c = transform === "none" ? I : new WebKitCSSMatrix(transform);
      transformationMatrix = c.multiply(transformationMatrix);
      x = x.parentNode;
    }

    let w = element.offsetWidth;
    let h = element.offsetHeight;
    let i = 4;
    let left = +Infinity;
    let top = +Infinity;
    while (--i >= 0) {
      let p = new Point(
        i === 0 || i === 1 ? 0 : w,
        i === 0 || i === 3 ? 0 : h,
        0
      ).transformBy(transformationMatrix);
      if (p.x < left) {
        left = p.x;
      }
      if (p.y < top) {
        top = p.y;
      }
    }
    let rect = element.getBoundingClientRect();
    transformationMatrix = I.translate(
      window.pageXOffset + rect.left - left,
      window.pageYOffset + rect.top - top,
      0
    ).multiply(transformationMatrix);

    return transformationMatrix;
  }

  window.convertPointFromPageToNode = function (element, pageX, pageY) {
    return new Point(pageX, pageY, 0).transformBy(
      getTransformationMatrix(element).inverse()
    );
  };

  window.convertPointFromNodeToPage = function (element, offsetX, offsetY) {
    return new Point(offsetX, offsetY, 0).transformBy(
      getTransformationMatrix(element)
    );
  };
})();

let Scratch = (function () {
  let BRUSH_B64 =
    "data:image/png;base64,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";
  let distanceBetween = function (point1, point2) {
    let a = point2.x - point1.x;
    let b = point2.y - point1.y;
    return Math.sqrt(a * a + b * b);
  };
  let angleBetween = function (point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  };

  let AUTO_DRAW_POSITION = [
    { x: 253, y: 103.5 },
    { x: 249, y: 111.5 },
    { x: 248, y: 117.5 },
    { x: 247, y: 122.5 },
    { x: 251, y: 125.5 },
    { x: 258, y: 128.5 },
    { x: 263, y: 131.5 },
    { x: 264, y: 133.5 },
    { x: 264, y: 136.5 },
    { x: 263, y: 140.5 },
    { x: 260, y: 145.5 },
    { x: 257, y: 150.5 },
    { x: 254, y: 153.5 },
    { x: 251, y: 156.5 },
    { x: 251, y: 157.5 },
    { x: 250, y: 157.5 },
    { x: 250, y: 158.5 },
    { x: 249, y: 158.5 },
  ];

  function Scratch(
    canvas /*HTMLCanvasElement*/,
    coverImgURL /*string*/,
    completeCallback /*Function*/
  ) {
    let self = this;
    this.canvas = canvas;
    this.autoDrawing = false;
    this.completeCallback = completeCallback;
    this.supportTouch = "ontouchstart" in window;
    this.isDrawing = false;
    this.lastPoint = { x: 0, y: 0 };
    this.context = canvas.getContext("2d");
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.brushImg = new Image();
    this.brushImg.src = BRUSH_B64;
    // width 80, height 50
    /* this.brushImg.onload = ()=>{
      console.log(this.brushImg.width);
      console.log(this.brushImg.height);
    } */

    let element = document.querySelector(".scratch");
    let img = new Image();
    this.img = img;
    img.src = coverImgURL;
    img.onload = function () {
      element.classList.add("animate");
      document.querySelector(".scratch__result").style.visibility = "visible";
      let ctx = self.context;
      let w = img.width;
      let h = img.height;

      self.canvas.width = w;
      self.canvas.height = h;
      ctx.drawImage(img, 0, 0);

      element.addEventListener("touchstart", self.handleMouseDown);
      window.addEventListener("touchmove", self.handleMouseMove);
      window.addEventListener("touchend", self.handleMouseUp);
      element.addEventListener("mousedown", self.handleMouseDown);
      window.addEventListener("mousemove", self.handleMouseMove);
      window.addEventListener("mouseup", self.handleMouseUp);

      self.autoDraw(AUTO_DRAW_POSITION);
    };
  }
  Scratch.prototype.getMousePosition = function (event) {
    const pageScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const pageScrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    const evt = this.supportTouch ? event.touches[0] : event;
    const rect = this.canvas.getBoundingClientRect();
    if (window.convertPointFromPageToNode) {
      return window.convertPointFromPageToNode(
        document.querySelector(".scratch"),
        evt.pageX,
        evt.pageY
      );
    }
    return {
      x: evt.pageX - rect.left - pageScrollLeft,
      y: evt.pageY - rect.top - pageScrollTop,
    };
  };
  Scratch.prototype.handleMouseDown = function (event) {
    event.preventDefault();
    this.lastPoint = this.getMousePosition(event);
    this.isDrawing = true;
  };
  Scratch.prototype.handleMouseMove = function (event) {
    if (!this.isDrawing || this.autoDrawing) {
      return;
    }
    let position = this.getMousePosition(event);
    this.draw(position);
    let progress = this.getFilledInPixels(32);
    if (progress > 0.5 && this.completeCallback) {
      this.completeCallback.call(this);
    }
  };
  Scratch.prototype.autoDraw = function (positoins) {
    this.autoDrawing = true;
    this.lastPoint = positoins[0];
    let self = this;
    let index = 0;
    let fps = 40;
    let now;
    let then = Date.now();
    let interval = 1000 / fps;
    let delta;
    let animationFrameID = -1;
    let d = function () {
      animationFrameID = requestAnimationFrame(d);
      now = Date.now();
      delta = now - then;
      if (delta > interval) {
        then = now - (delta % interval);
        self.draw(positoins[index]);
        index++;
        if (index >= positoins.length - 1) {
          self.autoDrawing = false;
          cancelAnimationFrame(animationFrameID);
        }
      }
    };
    setTimeout(d, 500);
  };
  Scratch.prototype.draw = function (position) {
    let dist = distanceBetween(this.lastPoint, position);
    let angle = angleBetween(this.lastPoint, position);
    let ctx = this.context;
    let x, y;
    for (let i = 0; i < dist; i += 1) {
      x = this.lastPoint.x + Math.sin(angle) * i;
      y = this.lastPoint.y + Math.cos(angle) * i;
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(this.brushImg, x - 40, y - 25);
    }
    this.lastPoint = position;
  };
  Scratch.prototype.handleMouseUp = function (event) {
    this.isDrawing = false;
  };
  Scratch.prototype.getFilledInPixels = function (stride /*number*/) {
    if (!stride || stride < 1) {
      stride = 1;
    }
    let pixels = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    let data = pixels.data;
    let length = data.length;
    let total = length / stride;
    let count = 0;
    for (let i = (count = 0); i < length; i += stride) {
      if (parseInt(data[i]) === 0) {
        count++;
      }
    }

    return count / total;
  };
  Scratch.prototype.destory = function () {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("touchstart", this.handleMouseDown);
    this.canvas.removeEventListener("touchmove", this.handleMouseMove);
    this.canvas.removeEventListener("touchend", this.handleMouseUp);
    this.canvas.parentNode.removeChild(this.canvas);
  };
  return Scratch;
})();

let app = new Scratch(
  document.querySelector(".scratch__canvas"),
  "https://fakeimg.pl/500x266/000000/?text=scratch",
  function () {
    console.log("scratch complete");
  }
);
