let videoClip;
let detector;
let detectedObjects = [];

let img_ratio;

function preload() {   
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);
  
  videoClip = createVideo('dance.mp4', playVideo);
  videoClip.size(640, 360);
  videoClip.hide();
  detector.detect(videoClip, gotDetections);
}
function playVideo(){
  videoClip.loop();
}
function draw(){
  image(videoClip,0,0);
  
  for (let i = 0; i < detectedObjects.length; i++) {
    let object = detectedObjects[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label+' '+object.id, object.x + 10, object.y + 24);
  }
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  //console.log(results);  
  
  detectedObjects = results;
  detector.detect(videoClip, gotDetections);
}