


img = "";
status = "";
objects = [];

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
  rect(30, 60, 450, 350 );
  r = random(255);
  g = random(255);
  b = random(255);
    if(status != "") {
      objectDetector.detect(video,gotResult);
      for (i = 0; i < objects.lenght; i++) { 
        document.getElementById("status").innerHTML = "status : Detecting Objects";
        document.getElementById("number_of_objects").innerHTML = "Number of objects are" + objects.lenght;
        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].lable + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }

  fill("#FF0000");
  text("Cat", 320, 120);
  noFill();
  stroke("#FF0000");
  rect(300, 90, 270, 320 );
}
