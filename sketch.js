let video;
let poses = [];
function setup() {
  createCanvas(406, 720);
  video = createVideo(["nancy.mp4"], () => {
    video.loop();
    video.volume(0);
  });
  poseNet = ml5.poseNet(video, () => {
    console.log("Model is ready");
  });
  // Listen to new 'pose' events
  poseNet.on("pose", function(results) {
    poses = results;
  });
  video.size(width, height);
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);
  drawSkeleton();
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      strokeWeight(4);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
