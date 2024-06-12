{
    var compWidth, compHeight, compDuration, compFps;
    var compName = "Animation Composition";
    var defaultFontSize = 20;
    var uploadedImage1, uploadedImage2;  // Variables to store the uploaded images

    // Dialog for selecting composition settings
    var settingsDialog = new Window("dialog", "Composition Settings");

    // Composition Size Selection
    settingsDialog.add("statictext", undefined, "Choose Size:");
    var sizeGroup = settingsDialog.add("group");
    sizeGroup.orientation = "row";
    var size1 = sizeGroup.add("radiobutton", undefined, "300x700");
    var size2 = sizeGroup.add("radiobutton", undefined, "500x500");
    size1.value = true;  

    // Frame Rate Selection
    settingsDialog.add("statictext", undefined, "Choose Frame Rate:");
    var fpsGroup = settingsDialog.add("group");
    fpsGroup.orientation = "row";
    var fps30 = fpsGroup.add("radiobutton", undefined, "30");
    var fps20 = fpsGroup.add("radiobutton", undefined, "20");
    var fps10 = fpsGroup.add("radiobutton", undefined, "10");
    fps30.value = true;  

    // Duration Selection
    settingsDialog.add("statictext", undefined, "Choose Duration:");
    var durationGroup = settingsDialog.add("group");
    durationGroup.orientation = "row";
    var duration30 = durationGroup.add("radiobutton", undefined, "30");
    var duration20 = durationGroup.add("radiobutton", undefined, "20");
    var duration10 = durationGroup.add("radiobutton", undefined, "10");
    duration30.value = true;  

    var settingsOkButton = settingsDialog.add("button", undefined, "OK");
    settingsOkButton.onClick = function() {
        if (size1.value) {
            compWidth = 300;
            compHeight = 700;
        } else if (size2.value) {
            compWidth = 500;
            compHeight = 500;
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

        settingsDialog.close();
        createComposition();
    };

    settingsDialog.center();
    settingsDialog.show();

    function createComposition() {
        var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);

        var backgroundColor = [1, 0, 0]; // RGB values (1, 0, 0) for red background
        var backgroundLayer = myComp.layers.addSolid(backgroundColor, "Background", compWidth, compHeight, 1);
        backgroundLayer.moveToEnd(); // Ensure the background layer is at the bottom

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

        function addTextLayer(text, initialPosition, finalPosition, startTime, duration) {
            var textLayer = myComp.layers.addText(text);
            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;

            textDocument.fontSize = defaultFontSize; // Set the default font size
            textDocument.fillColor = [0, 0, 0]; // Set the font color to black
            textProp.setValue(textDocument);

            var position = textLayer.property("Position");
            var opacity = textLayer.property("Opacity");

            opacity.setValueAtTime(startTime, 0);
            opacity.setValueAtTime(startTime + 1, 100);

            position.setValueAtTime(startTime, initialPosition);
            position.setValueAtTime(startTime + 1, finalPosition);

            position.setValueAtTime(startTime + duration - 1, finalPosition);
            opacity.setValueAtTime(startTime + duration - 1, 100);

            opacity.setValueAtTime(startTime + duration - 1, 100);
            opacity.setValueAtTime(startTime + duration, 0);
        }

        function addImageLayer(imageFile, position, startTime, duration) {
            var imageLayer = myComp.layers.add(imageFile);
            var opacity = imageLayer.property("Opacity");

            imageLayer.property("Position").setValue(position);

            opacity.setValueAtTime(startTime, 0);
            opacity.setValueAtTime(startTime + 1, 100);

            opacity.setValueAtTime(startTime + duration - 1, 100);

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
            var initialPosition1 = [10, 100];
            var finalPosition1 = [10, 80];

            var initialPosition2 = [10, 150];
            var finalPosition2 = [10, 130];

            var initialPosition3 = [10, 200];
            var finalPosition3 = [10, 180];

            addTextLayer(textInput1.text, initialPosition1, finalPosition1, 0, 5);
            addTextLayer(textInput2.text, initialPosition2, finalPosition2, 0.5, 4.5);
            addTextLayer(textInput3.text, initialPosition3, finalPosition3, 1, 4);

            if (uploadedImage1) {
                addImageLayer(uploadedImage1, [100, 250], 1, 4);
            }

            addTextLayer(textInput11.text, initialPosition1, finalPosition1, 5, 5);
            addTextLayer(textInput22.text, initialPosition2, finalPosition2, 5.5, 4.5);
            addTextLayer(textInput33.text, initialPosition3, finalPosition3, 6, 4);

            if (uploadedImage2) {
                addImageLayer(uploadedImage2, [100, 250], 6.5, 3.5);
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
}
