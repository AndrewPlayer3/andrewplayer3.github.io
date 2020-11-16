function setup() {
    var canvas = createCanvas(2*windowHeight/3, 2*windowHeight/3);
    canvas.parent('sketch');
    background(100);
}

var x = 20;
var y = 20;

function draw() {
    circle(x, y, 20);
    x = x + 0.1;
    y = y + 0.1;
}
