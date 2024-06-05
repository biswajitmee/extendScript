var compWidth = 1920;  
var compHeight = 500;  
var compDuration = 10;  
var compFps = 30;  
var compName = "Animation Composition";  

var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);


 



function selectFile() {
    var file = File.openDialog("Select an image file", "*.png;*.jpg", false);
    if (file) {
        var importOptions = new ImportOptions(file);
        var footageItem = app.project.importFile(importOptions);
        var imageLayer = myComp.layers.add(footageItem);  
        imageLayer.property("Position").setValue([compWidth / 2, compHeight / 2]); 
        dialog.close();
    }
}



function addTextLayer() {
    var userInput = textInput.text;
    var textLayer = myComp.layers.addText(userInput);  
    textLayer.property("Position").setValue([compWidth / 2, compHeight / 2]); 
}

var dialog = new Window("dialog", "Image Uploader");

dialog.text = "Adobe Creator Kit"; 


//ADOBE


var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
divider1.alignment = "fill"; 


var textInput = dialog.add("edittext", undefined, "Enter text here");
textInput.characters = 20;

var addTextButton = dialog.add("button", undefined, "Add Text Layer");
addTextButton.onClick = addTextLayer;


var divider2 = dialog.add("panel", undefined, undefined, {name: "divider2"}); 
divider1.alignment = "fill"; 


var selectButton = dialog.add("button", undefined, "Upload Image");
selectButton.onClick = selectFile;


 
var buttonGroup = dialog.add("group");
buttonGroup.orientation = "row";   

 
var closeButton = buttonGroup.add("button", undefined, "Close");
closeButton.onClick = function() {
    dialog.close();
};

 
var okButton = buttonGroup.add("button", undefined, "OK");
okButton.onClick = function() {
    dialog.close();
};



dialog.center();
dialog.show();

var imageFilePath = "/Users/biswajit.halder/Desktop/images/flower.png";  
var imageFile = new File(imageFilePath);

if (imageFile.exists) {
    var imageImportOptions = new ImportOptions(imageFile);
    var imageFootage = app.project.importFile(imageImportOptions);
    var imageLayer = myComp.layers.add(imageFootage);  
    imageLayer.property("Position").setValue([compWidth / 4, compHeight / 4]);  
} else {
    alert("Image file not found!");
}

var wiggleFrequency = 2;  
var wiggleAmplitude = 50;  

var wiggleExpression = "wiggle(" + wiggleFrequency + "," + wiggleAmplitude + ")";
imageLayer.property("Position").expression = wiggleExpression;

var rotationProperty = imageLayer.property("Rotation");
rotationProperty.setValueAtTime(0, 0);  
rotationProperty.setValueAtTime(30, 360);  

myComp.openInViewer();


 
var renderQueue = app.project.renderQueue;
var renderComp = renderQueue.items.add(myComp);
var outputModule = renderComp.outputModule(1);
outputModule.file = new File("/Users/biswajit.halder/Desktop/extained_script/rendered_animation.mp4");

outputModule.fileType = "MP4";

renderQueue.render();

alert("Rendering completed.");

 
