{
    var compWidth = 300;
    var compHeight = 700;
    var compDuration = 5; // Increased duration for the loop
    var compFps = 5;
    var compName = "Animation Composition";

    var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1, compDuration, compFps);

    function uploadLogo() {
        var file = File.openDialog("Select an image file", "*.png;*.jpg", false);
        if (file) {
            var importOptions = new ImportOptions(file);
            var footageItem = app.project.importFile(importOptions);
            var imageLayer = myComp.layers.add(footageItem);
            imageLayer.property("Position").setValue([80, 50]);
            
        }
    }

    var backgroundColor = [1, 0, 0]; // RGB values (1, 0, 0) for red background
    var backgroundLayer = myComp.layers.addSolid(backgroundColor, "Background", compWidth, compHeight, 1);
    backgroundLayer.moveToEnd(); // Ensure the background layer is at the bottom

    function addTextLayer(text, fontSize, initialPosition, finalPosition, startTime, duration) {
        var textLayer = myComp.layers.addText(text);
        var textProp = textLayer.property("Source Text");
        var textDocument = textProp.value;

        textDocument.fontSize = fontSize;
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



    var textInput1 = dialog.add("edittext", undefined, "Enter text for layer 1");
    textInput1.characters = 20;

    var fontSizeInput1 = dialog.add("edittext", undefined, "Font size for layer 1");
    fontSizeInput1.characters = 10;



    var textInput2 = dialog.add("edittext", undefined, "Enter text for layer 2");
    textInput2.characters = 20;

    var fontSizeInput2 = dialog.add("edittext", undefined, "Font size for layer 2");
    fontSizeInput2.characters = 10;



    var textInput3 = dialog.add("edittext", undefined, "Enter text for layer 3");
    textInput3.characters = 20;

    var fontSizeInput3 = dialog.add("edittext", undefined, "Font size for layer 2");
    fontSizeInput3.characters = 10;




    var addTextButton = dialog.add("button", undefined, "Add Text Layers");
    addTextButton.onClick = function() {
        var fontSize1 = parseFloat(fontSizeInput1.text) || 20;  
        var fontSize2 = parseFloat(fontSizeInput2.text) || 20;  
        var fontSize3 = parseFloat(fontSizeInput3.text) || 20;  

        // Define initial and final positions for each text layer
        var initialPosition1 = [10, 100];
        var finalPosition1 = [10, 80];
        var initialPosition2 = [10, 150];
        var finalPosition2 = [10, 130];
        var initialPosition3 = [10, 190];

        var finalPosition3 = [10, 150];


        addTextLayer(textInput1.text, fontSize1, initialPosition1, finalPosition1, 0, 5);
        addTextLayer(textInput2.text, fontSize2, initialPosition2, finalPosition2, 0.5, 4); 
        addTextLayer(textInput3.text, fontSize3, initialPosition3, finalPosition3, 1, 3);  
    };

    var divider3 = dialog.add("panel", undefined, undefined, { name: "divider2" });
    divider3.alignment = "fill";

   

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
