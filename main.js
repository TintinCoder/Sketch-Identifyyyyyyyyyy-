let canvas;
let synth;
let classifier;
function setup() {
    canvas = createCanvas(400, 280);
    canvas.center();
    background("white")
    canvas.mouseReleased(canvasClassifier)
    synth = window.speechSynthesis;
}
function preload() {
    console.log(`Preload is working fine`);
    classifier = ml5.imageClassifier('DoodleNet');
}
function canvasClassifier(){
    classifier.classify(canvas, gotResults);
}
function draw() {
    strokeWeight(13)
    stroke(r, g, b);
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function clearCanvas(){
    background('white')
}
function gotResults(error, result){
    if(error){
        console.error(error);
    }
    else {
        console.log(result)
        let object = result[0].label;
        let accuracy = result[0].confidence;

        let objectHTML = document.getElementById("object");
        let accuracyHTML = document.getElementById("confidence");

        objectHTML.innerHTML = object;
        accuracyHTML.innerHTML = Math.round(accuracy * 100) + '%';

        let utterThis = new SpeechSynthesisUtterance(object);
        synth.speak(utterThis)
    }
}
// Code for genarating random rgb values
let r;
let g;
let b;
r = (Math.random() * 255).toFixed(0)
g = (Math.random() * 255).toFixed(0)
b = (Math.random() * 255).toFixed(0)