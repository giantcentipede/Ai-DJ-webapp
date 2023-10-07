song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreR=0;
scoreL=0;

function preload() {
    song=loadSound("music.mp3")
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);

}
function modelloaded(){
    console.log("poseNet it is loaded :)");
}
function draw() {
    image(video,0,0,600,500);

    fill(33,54,94);
    stroke(24,87,48);

if (scoreR>0.2) {
circle(rightWristX,rightWristY,20);

if (rightWristY > 0 && rightWristY <= 100) {
    song.rate(0.5);
    document.getElementById("speed").innerHTML="Speed: 0.5x" 
} 

else if (rightWristY > 100 && rightWristY <= 200) {
    song.rate(1);
    document.getElementById("speed").innerHTML="Speed: 1x" 
} 

else if (rightWristY > 200 && rightWristY <= 300) {
    song.rate(1.5);
    document.getElementById("speed").innerHTML="Speed: 1.5x" 
} 

else if (rightWristY > 300 && rightWristY <= 400) {
    song.rate(2);
    document.getElementById("speed").innerHTML="Speed: 2x" 
} 

else if (rightWristY > 400 && rightWristY <= 500) {
    song.rate(2.5);
    document.getElementById("speed").innerHTML="Speed: 2.5x" 
} 
}



    if (scoreL > 0.2) {
circle(leftWristX,leftWristY,20);
numberL= Number(leftWristY);
remove_decimal=floor(numberL);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML="Volume: " +volume;
 song.setVolume(volume);

 
    }
}

function play() {
    song.play()
    console.log("played")
    song.setVolume(1);
    song.rate(1)

    
    
}
function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        scoreL = results[0].pose.keypoints[9].score;
        scoreR = results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX= "+leftWristX+", leftwristY= "+leftWristY);
        console.log("rightWristX= "+rightWristX+", rightwristY= "+rightWristY)
    }
    
}