// **********************************************************
// **********************************************************
// ** Author: Bradley Dowling
// ** Date: 11/11/2021
// ** Name: Line Segments
// ** Description: Finding the intersection of 20 randomly
// **              drawn lines...

// **********************************************************
// **********************************************************
// ** Point is an object that represents a point on an
// ** x, y plane.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// **********************************************************
// **********************************************************
// ** Line is an object that represents a line between
// ** two points on an x, y plane.

class Line {
  constructor(x1, y1, x2, y2) {
    this.start = new Point(x1, y1);
    this.end = new Point(x2, y2);
  }

  getLength() {
    // return the length of this line...
    return Math.sqrt((this.end.x - this.start.x)**2 + (this.end.y - this.start.y)**2);
  }

  getIntersection(line2) {
    // find the intersection between this line and another (if it exists)...

    // first, find the coefficients of the standard form of both lines
    // Ax + By = C ...
    let a1 = this.end.y - this.start.y;
    let b1 = this.start.x - this.end.x;
    let c1 = (a1 * this.start.x) + (b1 * this.start.y);
    let a2 = line2.end.y - line2.start.y;
    let b2 = line2.start.x - line2.end.x;
    let c2 = (a2 * line2.start.x) + (b2 * line2.start.y);

    // if the determinant() of the two equations is 0, then the lines are
    // parallel...
    let det = (a1 * b2) - (b1 * a2)
    if (det != 0) {
      // there may be an intersection point between these 2 finite lines...
      let x = ((b2 * c1) - (b1 * c2)) / det;
      let y = ((a1 * c2) - (a2 * c1)) / det;
      let point = new Point(x, y);

      // check if the point is within the x and y ranges of the two lines...
      if (point.x >= Math.min(this.start.x, this.end.x) && point.x <= Math.max(this.start.x, this.end.x)) {
        // within x range of line 1...
        if (point.y >= Math.min(this.start.y, this.end.y) && point.y <= Math.max(this.start.y, this.end.y)) {
          // within y range of line 1...
          if (point.x >= Math.min(line2.start.x, line2.end.x) && point.x <= Math.max(line2.start.x, line2.end.x)) {
            // within x range of line 2...
            if (point.y >= Math.min(line2.start.y, line2.end.y) && point.y <= Math.max(line2.start.y, line2.end.y)) {
              // within y range of line 2...
              // this is a valid point!
              return point;
            }
          }
        }
      }
    }

    // not a valid intersection...
    return null;
  }
}

// **********************************************************
// **********************************************************
// ** Draw 20 random lines on the canvas and get their
// ** intersections...

function draw() {
  // first, set up the canvas and associated styling...
  let lineCanvas = document.getElementById('lineCanvas');
  lineCanvas.width = window.innerWidth * 0.95;
  lineCanvas.height = window.innerHeight * 0.95;
  let w = lineCanvas.width;
  let h = lineCanvas.height;
  let ctx = lineCanvas.getContext('2d');
  ctx.fillStyle = 'crimson';
  ctx.lineWidth = 2;

  // set up the random lines...
  lineArray = [];
  let i;
  let j;
  for (i = 0; i < 20; i++) {
    lineArray.push(new Line(Math.random() * w, Math.random() * h, Math.random() * w, Math.random() * h));
  }

  // draw the random lines and the intersections...
  let intersection;
  for (i = 0; i < 20; i++) {
    // first, draw the line first
    ctx.beginPath();
    ctx.moveTo(lineArray[i].start.x, lineArray[i].start.y);
    ctx.lineTo(lineArray[i].end.x, lineArray[i].end.y);
    ctx.stroke();

    // now draw the intersections with the previous lines in lineArray...
    for (j = 0; j < i; j++) {
      intersection = lineArray[j].getIntersection(lineArray[i]);
      if (intersection != null) {
        // valid intersection...
        ctx.beginPath();
        ctx.moveTo(intersection.x, intersection.y);
        ctx.arc(intersection.x, intersection.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}
