// https://www.w3schools.com/js/js_object_prototypes.asp
//////////////////////////////////////
// define class Drawing
//////////////////////////////////////

// Constructor
function Drawing() {
        // define properties
	this.canvas = null;
	this.context = null;
	this.canvasWidth = 490;
	this.canvasHeight = 220;
	this.colorPurple = "#cb3594";
	this.colorGreen = "#659b41";
	this.colorYellow = "#ffcf33";
	this.colorBrown = "#986928";
	this.outlineImage = new Image();
	this.crayonImage = new Image();
	this.markerImage = new Image();
	this.eraserImage = new Image();
	this.crayonBackgroundImage = new Image();
	this.markerBackgroundImage = new Image();
	this.eraserBackgroundImage = new Image();
	this.crayonTextureImage = new Image();
	this.clickX = [];
	this.clickY = [];
	this.clickColor = [];
	this.clickTool = [];
	this.clickSize = [];
	this.clickDrag = [];
	this.paint = false;
	this.curColor = colorPurple;
	this.curTool = "crayon";
	this.curSize = "normal";
	this.mediumStartX = 18;
	this.mediumStartY = 19;
	this.mediumImageWidth = 93;
	this.mediumImageHeight = 46;
	this.drawingAreaX = 111;
	this.drawingAreaY = 11;
	this.drawingAreaWidth = 267;
	this.drawingAreaHeight = 200;
	this.toolHotspotStartY = 23;
	this.toolHotspotHeight = 38;
	this.sizeHotspotStartY = 157;
	this.sizeHotspotHeight = 36;
	this.totalLoadResources = 8;
	this.curLoadResNum = 0;
};

// define methods
Drawing.init = function( obj ) {
        console.debug( "Drawing.init=>");

        canvas = document.createElement('canvas');
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.setAttribute('id', 'canvas');
        document.getElementById('canvasDiv').appendChild(canvas);
        context = canvas.getContext("2d"); // Grab the 2d canvas context
        // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
        //     context = document.getElementById('canvas').getContext("2d");

        // Load images
        crayonImage.onload = resourceLoaded;
        crayonImage.src = "images/crayon-outline.png";

        markerImage.onload = resourceLoaded;
        markerImage.src = "images/marker-outline.png";

        eraserImage.onload = resourceLoaded;
        eraserImage.src = "images/eraser-outline.png";

        crayonBackgroundImage.onload = resourceLoaded;
        crayonBackgroundImage.src = "images/crayon-background.png";

        markerBackgroundImage.onload = resourceLoaded;
        markerBackgroundImage.src = "images/marker-background.png";

        eraserBackgroundImage.onload = resourceLoaded;
        eraserBackgroundImage.src = "images/eraser-background.png";

        crayonTextureImage.onload = resourceLoaded;
        crayonTextureImage.src = "images/crayon-texture.png";

        outlineImage.onload = resourceLoaded;
        outlineImage.src = "images/watermelon-duck-outline.png";
};

// Clears the canvas.
Drawing.clearCanvas = function () {
        if( context ) {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
        }
};

// Calls the redraw function after all neccessary resources are loaded.
Drawing.resourceLoaded = function () {

        curLoadResNum += 1;
        if (curLoadResNum === totalLoadResources) {
                redraw();
                createUserEvents();
        }
};

// Add mouse and touch event listeners to the canvas
Drawing.createUserEvents = function () {

        var press = function (e) {
                // Mouse down location
                var sizeHotspotStartX;
                var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
                var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

                if (mouseX < drawingAreaX) { // Left of the drawing area
                        if (mouseX > mediumStartX) {
                                if (mouseY > mediumStartY && mouseY < mediumStartY + mediumImageHeight) {
                                        curColor = colorPurple;
                                } else if (mouseY > mediumStartY + mediumImageHeight && mouseY < mediumStartY + mediumImageHeight * 2) {
                                        curColor = colorGreen;
                                } else if (mouseY > mediumStartY + mediumImageHeight * 2 && mouseY < mediumStartY + mediumImageHeight * 3) {
                                        curColor = colorYellow;
                                } else if (mouseY > mediumStartY + mediumImageHeight * 3 && mouseY < mediumStartY + mediumImageHeight * 4) {
                                        curColor = colorBrown;
                                }
                        }
                } else if (mouseX > drawingAreaX + drawingAreaWidth) { // Right of the drawing area

                        if (mouseY > toolHotspotStartY) {
                                if (mouseY > sizeHotspotStartY) {
                                        sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
                                        if (mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX) {
                                                if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
                                                        curSize = "huge";
                                                } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                        curSize = "large";
                                                } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                        curSize = "normal";
                                                } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                        curSize = "small";
                                                }
                                        }
                                } else {
                                        if (mouseY < toolHotspotStartY + toolHotspotHeight) {
                                                curTool = "crayon";
                                        } else if (mouseY < toolHotspotStartY + toolHotspotHeight * 2) {
                                                curTool = "marker";
                                        } else if (mouseY < toolHotspotStartY + toolHotspotHeight * 3) {
                                                curTool = "eraser";
                                        }
                                }
                        }
                }
                paint = true;
                addClick(mouseX, mouseY, false);
                redraw();
        };

        var drag = function (e) {
                
                var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
                        mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
                
                if (paint) {
                        addClick(mouseX, mouseY, true);
                        redraw();
                }
                // Prevent the whole page from dragging if on mobile
                e.preventDefault();
        };

        var release = function () {
                paint = false;
                redraw();
        };

        var cancel = function () {
                paint = false;
        };

        // Add mouse event listeners to canvas element
        canvas.addEventListener("mousedown", press, false);
        canvas.addEventListener("mousemove", drag, false);
        canvas.addEventListener("mouseup", release);
        canvas.addEventListener("mouseout", cancel, false);

        // Add touch event listeners to canvas element
        canvas.addEventListener("touchstart", press, false);
        canvas.addEventListener("touchmove", drag, false);
        canvas.addEventListener("touchend", release, false);
        canvas.addEventListener("touchcancel", cancel, false);
};

// Adds a point to the drawing array.
// @param x
// @param y
// @param dragging
Drawing.addClick = function (x, y, dragging) {

        clickX.push(x);
        clickY.push(y);
        clickTool.push(curTool);
        clickColor.push(curColor);
        clickSize.push(curSize);
        clickDrag.push(dragging);
};

// Redraws the canvas.
Drawing.redraw = function () {

        var locX;
        var locY;
        var radius;
        var i;
        var selected;

        var drawCrayon = function (x, y, color, selected) {

                        context.beginPath();
                        context.moveTo(x + 41, y + 11);
                        context.lineTo(x + 41, y + 35);
                        context.lineTo(x + 29, y + 35);
                        context.lineTo(x + 29, y + 33);
                        context.lineTo(x + 11, y + 27);
                        context.lineTo(x + 11, y + 19);
                        context.lineTo(x + 29, y + 13);
                        context.lineTo(x + 29, y + 11);
                        context.lineTo(x + 41, y + 11);
                        context.closePath();
                        context.fillStyle = color;
                        context.fill();

                        if (selected) {
                                context.drawImage(crayonImage, x, y, mediumImageWidth, mediumImageHeight);
                        } else {
                                context.drawImage(crayonImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
                        }
                };

        var drawMarker = function (x, y, color, selected) {

                        context.beginPath();
                        context.moveTo(x + 10, y + 24);
                        context.lineTo(x + 10, y + 24);
                        context.lineTo(x + 22, y + 16);
                        context.lineTo(x + 22, y + 31);
                        context.closePath();
                        context.fillStyle = color;
                        context.fill();

                        if (selected) {
                                context.drawImage(markerImage, x, y, mediumImageWidth, mediumImageHeight);
                        } else {
                                context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
                        }
        };

        // Make sure required resources are loaded before redrawing
        if (curLoadResNum < totalLoadResources) {
                return;
        }

        clearCanvas();

        if (curTool === "crayon") {

                // Draw the crayon tool background
                context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

                // Draw purple crayon
                selected = (curColor === colorPurple);
                locX = selected ? 18 : 52;
                locY = 19;
                drawCrayon(locX, locY, colorPurple, selected);

                // Draw green crayon
                selected = (curColor === colorGreen);
                locX = selected ? 18 : 52;
                locY += 46;
                drawCrayon(locX, locY, colorGreen, selected);

                // Draw yellow crayon
                selected = (curColor === colorYellow);
                locX = selected ? 18 : 52;
                locY += 46;
                drawCrayon(locX, locY, colorYellow, selected);

                // Draw brown crayon
                selected = (curColor === colorBrown);
                locX = selected ? 18 : 52;
                locY += 46;
                drawCrayon(locX, locY, colorBrown, selected);

        } else if (curTool === "marker") {

                // Draw the marker tool background
                context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

                // Draw purple marker
                selected = (curColor === colorPurple);
                locX = selected ? 18 : 52;
                locY = 19;
                drawMarker(locX, locY, colorPurple, selected);

                // Draw green marker
                selected = (curColor === colorGreen);
                locX = selected ? 18 : 52;
                locY += 46;
                drawMarker(locX, locY, colorGreen, selected);

                // Draw yellow marker
                selected = (curColor === colorYellow);
                locX = selected ? 18 : 52;
                locY += 46;
                drawMarker(locX, locY, colorYellow, selected);

                // Draw brown marker
                selected = (curColor === colorBrown);
                locX = selected ? 18 : 52;
                locY += 46;
                drawMarker(locX, locY, colorBrown, selected);

        } else if (curTool === "eraser") {

                context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
                context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);
        }

        // Draw line on ruler to indicate size
        switch (curSize) {
        case "small":
                locX = 467;
                break;
        case "normal":
                locX = 450;
                break;
        case "large":
                locX = 428;
                break;
        case "huge":
                locX = 399;
                break;
        default:
                break;
        }
        locY = 189;
        context.beginPath();
        context.rect(locX, locY, 2, 12);
        context.closePath();
        context.fillStyle = '#333333';
        context.fill();

        // Keep the drawing in the drawing area
        context.save();
        context.beginPath();
        context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
        context.clip();

        // For each point drawn
        for (i = 0; i < clickX.length; i += 1) {

                // Set the drawing radius
                switch (clickSize[i]) {
                case "small":
                        radius = 2;
                        break;
                case "normal":
                        radius = 5;
                        break;
                case "large":
                        radius = 10;
                        break;
                case "huge":
                        radius = 20;
                        break;
                default:
                        break;
                }

                // Set the drawing path
                context.beginPath();
                // If dragging then draw a line between the two points
                if (clickDrag[i] && i) {
                        context.moveTo(clickX[i - 1], clickY[i - 1]);
                } else {
                        // The x position is moved over one pixel so a circle even if not dragging
                        context.moveTo(clickX[i] - 1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                
                // Set the drawing color
                if (clickTool[i] === "eraser") {
                        //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
                        context.strokeStyle = 'white';
                } else {
                        //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
                        context.strokeStyle = clickColor[i];
                }
                context.lineCap = "round";
                context.lineJoin = "round";
                context.lineWidth = radius;
                context.stroke();
        }
        context.closePath();
        //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
        context.restore();

        // Overlay a crayon texture (if the current tool is crayon)
        if (curTool === "crayon") {
                context.globalAlpha = 0.4; // No IE support
                context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
        }
        context.globalAlpha = 1; // No IE support

        // Draw the outline image
        context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
};