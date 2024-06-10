{
    var compWidth = 300;
    var compHeight = 700;
    var compDuration = 10;
    var compFps = 10;
    var compName = "Animation Composition";
    var defaultFontSize = 20;
    var uploadedImage1, uploadedImage2;  // Variables to store the uploaded images

    var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);

    function uploadLogo() {
        var file = File.openDialog("Select an image file", "*.png;*.jpg", false);
        if (file) {
            var importOptions = new ImportOptions(file);
            var footageItem = app.project.importFile(importOptions);
            var imageLayer = myComp.layers.add(footageItem);
            imageLayer.property("Position").setValue([150, 50]); // Set position to 50px from left and top
        }
    }

    function uploadImage1() {
        var file = File.openDialog("Select an image file for Composition 1", "*.png;*.jpg", false);
        if (file) {
            var importOptions = new ImportOptions(file);
            uploadedImage1 = app.project.importFile(importOptions);
        }
    }

    function uploadImage2() {
        var file = File.openDialog("Select an image file for Composition 2", "*.png;*.jpg", false);
        if (file) {
            var importOptions = new ImportOptions(file);
            uploadedImage2 = app.project.importFile(importOptions);
        }
    }

    var backgroundColor = [1, 0, 0]; // RGB values (1, 0, 0) for red background
    var backgroundLayer = myComp.layers.addSolid(backgroundColor, "Background", compWidth, compHeight, 1);
    backgroundLayer.moveToEnd(); // Ensure the background layer is at the bottom

    function addTextLayer(text, initialPosition, finalPosition, startTime, duration) {
        var textLayer = myComp.layers.addText(text);
        var textProp = textLayer.property("Source Text");
        var textDocument = textProp.value;

        textDocument.fontSize = defaultFontSize; // Set the default font size
        textDocument.fillColor = [0, 0, 0]; // Set the font color to black
        textProp.setValue(textDocument);

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

    function addImageLayer(imageFile, position, startTime, duration) {
        var imageLayer = myComp.layers.add(imageFile);
        var opacity = imageLayer.property("Opacity");

        // Set initial position
        imageLayer.property("Position").setValue(position);

        // Animate opacity from 0 to 1 over 1 second
        opacity.setValueAtTime(startTime, 0);
        opacity.setValueAtTime(startTime + 1, 100); // 1 second to fade in

        // Hold the opacity at 100 for the duration
        opacity.setValueAtTime(startTime + duration - 1, 100);

        // Animate opacity from 1 to 0 over the last second
        opacity.setValueAtTime(startTime + duration - 1, 100);
        opacity.setValueAtTime(startTime + duration, 0);
    }

    var dialog = new Window("dialog", "Adobe Creator Kit");
    dialog.text = "Adobe Creator Kit";

    var divider1 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider1.alignment = "fill";

    var selectButton = dialog.add("button", undefined, "Upload Logo Image");
    selectButton.onClick = uploadLogo;

    var divider2 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider2.alignment = "fill";

    // Composition 1
    var textInput1 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput1.characters = 20;

    var textInput2 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput2.characters = 20;

    var textInput3 = dialog.add("edittext", undefined, "Enter text for layer 3");
    textInput3.characters = 20;

    var uploadImageButton1 = dialog.add("button", undefined, "Upload Image for Composition 1");
    uploadImageButton1.onClick = uploadImage1;

    var divider3 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider3.alignment = "fill";

    // Composition 2
    var textInput11 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput11.characters = 20;

    var textInput22 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput22.characters = 20;

    var textInput33 = dialog.add("edittext", undefined, "Enter text for layer 3");
    textInput33.characters = 20;

    var uploadImageButton2 = dialog.add("button", undefined, "Upload Image for Composition 2");
    uploadImageButton2.onClick = uploadImage2;

    var divider4 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider4.alignment = "fill";

    var addTextButton = dialog.add("button", undefined, "Add Text Layers and Images");
    addTextButton.onClick = function() {
        // Define initial and final positions for each text layer
        var initialPosition1 = [10, 100];
        var finalPosition1 = [10, 80];

        var initialPosition2 = [10, 150];
        var finalPosition2 = [10, 130];

        var initialPosition3 = [10, 200];
        var finalPosition3 = [10, 180];

        // Add text layers for the first composition
        addTextLayer(textInput1.text, initialPosition1, finalPosition1, 0, 5);
        addTextLayer(textInput2.text, initialPosition2, finalPosition2, 0.5, 4.5);
        addTextLayer(textInput3.text, initialPosition3, finalPosition3, 1, 4);

        // Add the uploaded image layer for Composition 1 with fade-in animation if an image was uploaded
        if (uploadedImage1) {
            addImageLayer(uploadedImage1, [100, 250], 1, 4); // Adjust the start time and duration as needed
        }

        // Add text layers for the second composition
        addTextLayer(textInput11.text, initialPosition1, finalPosition1, 5, 5);
        addTextLayer(textInput22.text, initialPosition2, finalPosition2, 5.5, 4.5);
        addTextLayer(textInput33.text, initialPosition3, finalPosition3, 6, 4);

        // Add the uploaded image layer for Composition 2 with fade-in animation if an image was uploaded
        if (uploadedImage2) {
            addImageLayer(uploadedImage2, [100, 250], 6.5, 3.5); // Adjust the start time and duration as needed
        }
    };

    var dividerLast = dialog.add("panel", undefined, undefined, { name: "divider2" });
    dividerLast.alignment = "fill";

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

    myComp.openInViewer();
}
