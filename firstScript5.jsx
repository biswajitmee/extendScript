{
    var compWidth = 300;
    var compHeight = 700;
    var compDuration = 16; // Increased duration for the loop
    var compFps = 10;
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


    var backgroundColor = [1, 0, 0]; // RGB values (1, 1, 1) for white background
    var backgroundLayer = myComp.layers.addSolid(backgroundColor, "Background", compWidth, compHeight, 1);
    backgroundLayer.moveToEnd(); // Ensure the background layer is at the bottom


    function addTextLayer(text, fontSize, startTime, duration) {
        var textLayer = myComp.layers.addText(text);
        var textProp = textLayer.property("Source Text");
        var textDocument = textProp.value;

        textDocument.fontSize = fontSize;
        textDocument.fillColor = [0, 0, 0];
        textProp.setValue(textDocument);

        // Initial position and final position with y offset of 10 units
        var initialPosition = [100, 100];
        var finalPosition = [100, 80];

        var position = textLayer.property("Position");
        var opacity = textLayer.property("Opacity");

        // Animate opacity from 0 to 1 over 1 second
        opacity.setValueAtTime(startTime, 0);
        opacity.setValueAtTime(startTime + 1, 100); // 1 second to fade in

        // Animate position from initial to final over 1 second
        position.setValueAtTime(startTime, initialPosition);
        position.setValueAtTime(startTime + 1, finalPosition);

        // Hold the final state for the rest of the duration
        position.setValueAtTime(startTime + duration - 1, finalPosition);
        opacity.setValueAtTime(startTime + duration - 1, 100);

        // Animate opacity from 1 to 0 over the last second
        opacity.setValueAtTime(startTime + duration - 1, 100);
        opacity.setValueAtTime(startTime + duration, 0);
    }
 

    var dialog = new Window("dialog", "Adobe Creator Kit");
    dialog.text = "Adobe Creator Kit";

    var divider1 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider1.alignment = "fill";

    var textInput1 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput1.characters = 20;

    var fontSizeInput1 = dialog.add("edittext", undefined, "Font size for layer 1");
    fontSizeInput1.characters = 10;

    var textInput2 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput2.characters = 20;

    var fontSizeInput2 = dialog.add("edittext", undefined, "Font size for layer 2");
    fontSizeInput2.characters = 10;

    var addTextButton = dialog.add("button", undefined, "Add Text Layers");
    addTextButton.onClick = function() {
        var fontSize1 = parseFloat(fontSizeInput1.text) || 50; // Default to 50 if input is invalid
        var fontSize2 = parseFloat(fontSizeInput2.text) || 50; // Default to 50 if input is invalid

        addTextLayer(textInput1.text, fontSize1, 0, 10); // First text layer, starts at 0 seconds, duration 4 seconds
        addTextLayer(textInput2.text, fontSize2, 4, 10); // Second text layer, starts at 4 seconds, duration 4 seconds
 
    };

    var divider2 = dialog.add("panel", undefined, undefined, { name: "divider2" });
    divider2.alignment = "fill";

    var selectButton = dialog.add("button", undefined, " logo  image Upload");
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

    var imageFilePath = "C:/Users/Admin/Desktop/extendScript-main/img/leaf2.png";
    var imageFile = new File(imageFilePath);

    if (imageFile.exists) {
        var imageImportOptions = new ImportOptions(imageFile);
        var imageFootage = app.project.importFile(imageImportOptions);
        var imageLayer = myComp.layers.add(imageFootage);
        imageLayer.property("Position").setValue([compWidth / 4, compHeight / 4]);
 
    } else {
        alert("Image file not found!");
    }

    myComp.openInViewer();
}
