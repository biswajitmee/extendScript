 
var dialog = new Window("dialog", "Create Composition");


 
dialog.add("statictext", undefined, "Choose Size:");
var sizeGroup = dialog.add("group");
sizeGroup.orientation = "row";
var size1 = sizeGroup.add("radiobutton", undefined, "500x200");
var size2 = sizeGroup.add("radiobutton", undefined, "700x300");
size1.value = true;  

 
dialog.add("statictext", undefined, "Choose Frame Rate:");
var fpsGroup = dialog.add("group");
fpsGroup.orientation = "row";
var fps30 = fpsGroup.add("radiobutton", undefined, "30");
var fps20 = fpsGroup.add("radiobutton", undefined, "20");
var fps10 = fpsGroup.add("radiobutton", undefined, "10");
fps30.value = true;  
 
dialog.add("statictext", undefined, "Choose Duration:");
var durationGroup = dialog.add("group");
durationGroup.orientation = "row";
var duration30 = durationGroup.add("radiobutton", undefined, "30");
var duration20 = durationGroup.add("radiobutton", undefined, "20");
var duration10 = durationGroup.add("radiobutton", undefined, "10");
duration30.value = true;  

 
var uploadGroup = dialog.add("group");
uploadGroup.orientation = "row";
uploadGroup.add("statictext", undefined, "Upload Background Video:");
var videoPathText = uploadGroup.add("edittext", undefined, "", { readonly: true });
var uploadButton = uploadGroup.add("button", undefined, "Browse...");

uploadButton.onClick = function () {
    var videoFile = File.openDialog("Select a background video file");
    if (videoFile) {
        videoPathText.text = videoFile.fsName;
    }
};
 
var buttonGroup = dialog.add("group");
buttonGroup.orientation = "row";
var okButton = buttonGroup.add("button", undefined, "OK");
var cancelButton = buttonGroup.add("button", undefined, "Cancel");

cancelButton.onClick = function () {
    dialog.close();
};

okButton.onClick = function () {
    var compWidth, compHeight, compFps, compDuration;

 
    if (size1.value) {
        compWidth = 500;
        compHeight = 200;
    } else if (size2.value) {
        compWidth = 700;
        compHeight = 300;
    }

 
    if (fps30.value) {
        compFps = 30;
    } else if (fps20.value) {
        compFps = 20;
    } else if (fps10.value) {
        compFps = 10;
    }

   
    if (duration30.value) {
        compDuration = 30;
    } else if (duration20.value) {
        compDuration = 20;
    } else if (duration10.value) {
        compDuration = 10;
    }

     
    var compName = "Animation Composition";
    var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);

 
    var videoFilePath = videoPathText.text;
    if (videoFilePath) {
        var videoFile = new File(videoFilePath);
        var importOptions = new ImportOptions(videoFile);
        var videoItem = app.project.importFile(importOptions);
        var videoLayer = myComp.layers.add(videoItem);
        videoLayer.startTime = 0;
        videoLayer.inPoint = 0;
        videoLayer.outPoint = myComp.duration;
    }

 
    myComp.openInViewer();

     
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


};

 
dialog.show();
