{
    var compWidth = 1920;
    var compHeight = 500;
    var compDuration = 16; // Increased duration for the loop
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

    function addTextLayer(text, fontSize, startTime, duration) {
        var textLayer = myComp.layers.addText(text);
        var textProp = textLayer.property("Source Text");
        var textDocument = textProp.value;

        textDocument.fontSize = fontSize;
        textProp.setValue(textDocument);

        // Set initial position off-screen (below the screen)
        var initialPosition = [compWidth / 2, compHeight + 1];
        var finalPosition = [compWidth / 2, compHeight / 1.5];

        var position = textLayer.property("Position");
        var opacity = textLayer.property("Opacity");

        // Animate position
        position.setValueAtTime(startTime, initialPosition);
        position.setValueAtTime(startTime + 1, finalPosition); // Move to final position in 1 second

        // Animate opacity
        opacity.setValueAtTime(startTime, 0);
        opacity.setValueAtTime(startTime + 1, 10); // 1 second to fade in
        opacity.setValueAtTime(startTime + duration - 1, 10);
        opacity.setValueAtTime(startTime + duration, 0); // 1 second to fade out

        // Animate position out
        position.setValueAtTime(startTime + duration - 1, finalPosition);
        position.setValueAtTime(startTime + duration, initialPosition); // Move back off-screen in 1 second
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

        addTextLayer(textInput1.text, fontSize1, 0, 4); // First text layer, starts at 0 seconds, duration 4 seconds
        addTextLayer(textInput2.text, fontSize2, 4, 4); // Second text layer, starts at 4 seconds, duration 4 seconds

        addTextLayer(textInput1.text, fontSize1, 8, 4); // Repeat first text layer, starts at 8 seconds, duration 4 seconds
        addTextLayer(textInput2.text, fontSize2, 12, 4); // Repeat second text layer, starts at 12 seconds, duration 4 seconds
    };

    var divider2 = dialog.add("panel", undefined, undefined, { name: "divider2" });
    divider2.alignment = "fill";

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

        var wiggleFrequency = 2;
        var wiggleAmplitude = 50;
        var wiggleExpression = "wiggle(" + wiggleFrequency + "," + wiggleAmplitude + ")";
        imageLayer.property("Position").expression = wiggleExpression;

        var rotationProperty = imageLayer.property("Rotation");
        rotationProperty.setValueAtTime(0, 0);
        rotationProperty.setValueAtTime(30, 360);
    } else {
        alert("Image file not found!");
    }

    myComp.openInViewer();
}
