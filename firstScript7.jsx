{
    var compWidth = 300;
    var compHeight = 700;
    var compDuration = 10;
    var compFps = 10;
    var compName = "Animation Composition";
    var defaultFontSize = 20;

    var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);

    function uploadLogo() {
        var file = File.openDialog("Select an image file", "*.png;*.jpg", false);
        if (file) {
            var importOptions = new ImportOptions(file);
            var footageItem = app.project.importFile(importOptions);
            var imageLayer = myComp.layers.add(footageItem);
            imageLayer.property("Position").setValue([50, 50]); // Set position to 10px from left and 50px from top
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

    var dialog = new Window("dialog", "Adobe Creator Kit");
    dialog.text = "Adobe Creator Kit";

    var divider1 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider1.alignment = "fill";

    var selectButton = dialog.add("button", undefined, "Upload Image");
    selectButton.onClick = uploadLogo;

    var divider2 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider2.alignment = "fill";


    // composition 1
    var textInput1 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput1.characters = 20;

    var textInput2 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput2.characters = 20;

    var textInput3 = dialog.add("edittext", undefined, "Enter text for layer 3");
    textInput3.characters = 20;

// want to add aimage upload from dilogbox and include here with fadein animation

    var divider3 = dialog.add("panel", undefined, undefined, { name: "divider1" });
    divider3.alignment = "fill";


 // composition 2
    var textInput11 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput1.characters = 20;

    var textInput22 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput2.characters = 20;

    var textInput33 = dialog.add("edittext", undefined, "Enter text for layer 3");
    textInput3.characters = 20;

    // want to add aimage upload from dilogbox and include here with fadein animation






    var addTextButton = dialog.add("button", undefined, "Add Text Layers");
    addTextButton.onClick = function() {
        // Define initial and final positions for each text layer
        var initialPosition1 = [10, 100];
        var finalPosition1 = [10, 80];

        var initialPosition2 = [10, 150];
        var finalPosition2 = [10, 130];

        var initialPosition3 = [10, 200];
        var finalPosition3 = [10, 180];



        addTextLayer(textInput1.text, initialPosition1, finalPosition1, 0, 5);
        addTextLayer(textInput2.text, initialPosition2, finalPosition2, 0.5, 4.5);
        addTextLayer(textInput3.text, initialPosition3, finalPosition3, 1, 4);



        addTextLayer(textInput11.text, initialPosition1, finalPosition1, 5, 10);
        addTextLayer(textInput22.text, initialPosition2, finalPosition2, 5.5, 4.5);
        addTextLayer(textInput33.text, initialPosition3, finalPosition3, 6, 4);



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
