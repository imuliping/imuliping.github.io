// https://www.w3schools.com/js/js_object_prototypes.asp
//////////////////////////////////////
// define class Drawing
//////////////////////////////////////

// Constructor
Drawing = function( config ) {

        $.extend(
                this, 
                {
                        // define properties
                        canvas: null,
                        context: null,
                        canvasWidth: 490,
                        canvasHeight: 220,
                        colorPurple: "#cb3594",
                        colorGreen: "#659b41",
                        colorYellow: "#ffcf33",
                        colorBrown: "#986928",
                        outlineImage: new Image(),
                        crayonImage: new Image(),
                        markerImage: new Image(),
                        eraserImage: new Image(),
                        crayonBackgroundImage: new Image(),
                        markerBackgroundImage: new Image(),
                        eraserBackgroundImage: new Image(),
                        crayonTextureImage: new Image(),
                        clickX: [],
                        clickY: [],
                        clickColor: [],
                        clickTool: [],
                        clickSize: [],
                        clickDrag: [],
                        paint: false,
                        curColor: "#cb3594",
                        curTool: "crayon",
                        curSize: "normal",
                        mediumStartX: 18,
                        mediumStartY: 19,
                        mediumImageWidth: 93,
                        mediumImageHeight: 46,
                        drawingAreaX: 111,
                        drawingAreaY: 11,
                        drawingAreaWidth: 267,
                        drawingAreaHeight: 200,
                        toolHotspotStartY: 23,
                        toolHotspotHeight: 38,
                        sizeHotspotStartY: 157,
                        sizeHotspotHeight: 36,
                        totalLoadResources: 8,
                        curLoadResNum: 0
                },
                config
        );
};

// define methods
Drawing.prototype = {

        /**
         * init
         */
        init: function( obj ) {
                console.debug( "Drawing.init=>");

                this.canvas = document.getElementById("myCanvasId");
                this.context = this.canvas.getContext("2d");

                // Load images
                this.crayonImage.onload = this.resourceLoaded();
                this.crayonImage.src = "images/crayon-outline.png";

                this.markerImage.onload = this.resourceLoaded();
                this.markerImage.src = "images/marker-outline.png";

                this.eraserImage.onload = this.resourceLoaded();
                this.eraserImage.src = "images/eraser-outline.png";

                this.crayonBackgroundImage.onload = this.resourceLoaded();
                this.crayonBackgroundImage.src = "images/crayon-background.png";

                this.markerBackgroundImage.onload = this.resourceLoaded();
                this.markerBackgroundImage.src = "images/marker-background.png";

                this.eraserBackgroundImage.onload = this.resourceLoaded();
                this.eraserBackgroundImage.src = "images/eraser-background.png";

                this.crayonTextureImage.onload = this.resourceLoaded();
                this.crayonTextureImage.src = "images/crayon-texture.png";

                this.outlineImage.onload = this.resourceLoaded();
                this.outlineImage.src = "images/watermelon-duck-outline.png";
        },

        /**
         *  Clears the this.canvas.
         */
        clearCanvas: function () {
                console.debug( "Drawing.clearCanvas=>");

                if( this.context ) {
                        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                }
        },

        /**
         *  Calls the redraw function after all neccessary resources are loaded.
         */
        resourceLoaded: function () {
                console.debug( "Drawing.resourceLoaded=>");

                this.curLoadResNum += 1;
                if (this.curLoadResNum === this.totalLoadResources) {
                        this.redraw();
                        this.createUserEvents();
                }
        },

        /**
         *  Add mouse and touch event listeners to the this.canvas
         * 
         */
        createUserEvents: function () {
                console.debug( "Drawing.createUserEvents=>");

                var press = function (e) {
                        // Mouse down location
                        var sizeHotspotStartX;
                        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
                        var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

                        if (mouseX < this.drawingAreaX) { // Left of the drawing area
                                if (mouseX > this.mediumStartX) {
                                        if (mouseY > this.mediumStartY && mouseY < this.mediumStartY + this.mediumImageHeight) {
                                                this.curColor = this.colorPurple;
                                        } else if (mouseY > this.mediumStartY + this.mediumImageHeight && mouseY < this.mediumStartY + this.mediumImageHeight * 2) {
                                                this.curColor = this.colorGreen;
                                        } else if (mouseY > this.mediumStartY + this.mediumImageHeight * 2 && mouseY < this.mediumStartY + this.mediumImageHeight * 3) {
                                                this.curColor = this.colorYellow;
                                        } else if (mouseY > this.mediumStartY + this.mediumImageHeight * 3 && mouseY < this.mediumStartY + this.mediumImageHeight * 4) {
                                                this.curColor = this.colorBrown;
                                        }
                                }
                        } else if (mouseX > this.drawingAreaX + this.drawingAreaWidth) { // Right of the drawing area

                                if (mouseY > this.toolHotspotStartY) {
                                        if (mouseY > this.sizeHotspotStartY) {
                                                sizeHotspotStartX = this.drawingAreaX + this.drawingAreaWidth;
                                                if (mouseY < this.sizeHotspotStartY + this.sizeHotspotHeight && mouseX > sizeHotspotStartX) {
                                                        if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge) {
                                                                this.curSize = "huge";
                                                        } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                                this.curSize = "large";
                                                        } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                                this.curSize = "normal";
                                                        } else if (mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge) {
                                                                this.curSize = "small";
                                                        }
                                                }
                                        } else {
                                                if (mouseY < this.toolHotspotStartY + this.toolHotspotHeight) {
                                                        this.curTool = "crayon";
                                                } else if (mouseY < this.toolHotspotStartY + this.toolHotspotHeight * 2) {
                                                        this.curTool = "marker";
                                                } else if (mouseY < this.toolHotspotStartY + this.toolHotspotHeight * 3) {
                                                        this.curTool = "eraser";
                                                }
                                        }
                                }
                        }
                        this.paint = true;
                        addClick(mouseX, mouseY, false);
                        redraw();
                };

                var drag = function (e) {
                        
                        var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
                                mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
                        
                        if (this.paint) {
                                addClick(mouseX, mouseY, true);
                                redraw();
                        }
                        // Prevent the whole page from dragging if on mobile
                        e.preventDefault();
                };

                var release = function () {
                        this.paint = false;
                        redraw();
                };

                var cancel = function () {
                        this.paint = false;
                };

                // Add mouse event listeners to this.canvas element
                this.canvas.addEventListener("mousedown", press, false);
                this.canvas.addEventListener("mousemove", drag, false);
                this.canvas.addEventListener("mouseup", release);
                this.canvas.addEventListener("mouseout", cancel, false);

                // Add touch event listeners to this.canvas element
                this.canvas.addEventListener("touchstart", press, false);
                this.canvas.addEventListener("touchmove", drag, false);
                this.canvas.addEventListener("touchend", release, false);
                this.canvas.addEventListener("touchcancel", cancel, false);
        },

        /** 
        * Adds a point to the drawing array.
        * @param x
        * @param y
        * @param dragging
        */
        addClick: function (x, y, dragging) {
                console.debug( "Drawing.createUserEvents=>");

                this.clickX.push(x);
                this.clickY.push(y);
                this.clickTool.push(this.curTool);
                this.clickColor.push(this.curColor);
                this.clickSize.push(this.curSize);
                this.clickDrag.push(this.dragging);
        },

        /**
         * Redraws the this.canvas.
         * 
         */
        redraw: function (context) {
                console.debug( "Drawing.createUserEvents=>");

                var locX;
                var locY;
                var radius;
                var i;
                var selected;

                var drawCrayon = function (x, y, color, selected, parent) {

                                parent.context.beginPath();
                                parent.context.moveTo(x + 41, y + 11);
                                parent.context.lineTo(x + 41, y + 35);
                                parent.context.lineTo(x + 29, y + 35);
                                parent.context.lineTo(x + 29, y + 33);
                                parent.context.lineTo(x + 11, y + 27);
                                parent.context.lineTo(x + 11, y + 19);
                                parent.context.lineTo(x + 29, y + 13);
                                parent.context.lineTo(x + 29, y + 11);
                                parent.context.lineTo(x + 41, y + 11);
                                parent.context.closePath();
                                parent.context.fillStyle = color;
                                parent.context.fill();

                                if (selected) {
                                        parent.context.drawImage(parent.crayonImage, x, y, parent.mediumImageWidth, parent.mediumImageHeight);
                                } else {
                                        parent.context.drawImage(parent.crayonImage, 0, 0, 59, parent.mediumImageHeight, x, y, 59, parent.mediumImageHeight);
                                }
                        };

                var drawMarker = function (x, y, color, selected, parent) {

                                parent.context.beginPath();
                                parent.context.moveTo(x + 10, y + 24);
                                parent.context.lineTo(x + 10, y + 24);
                                parent.context.lineTo(x + 22, y + 16);
                                parent.context.lineTo(x + 22, y + 31);
                                parent.context.closePath();
                                parent.context.fillStyle = color;
                                parent.context.fill();

                                if (selected) {
                                        parent.context.drawImage(parent.markerImage, x, y, parent.mediumImageWidth, parent.mediumImageHeight);
                                } else {
                                        parent.context.drawImage(parent.markerImage, 0, 0, 59, parent.mediumImageHeight, x, y, 59, parent.mediumImageHeight);
                                }
                };

                // Make sure required resources are loaded before redrawing
                if (this.curLoadResNum < this.totalLoadResources) {
                        return;
                }

                this.clearCanvas();

                if (this.curTool === "crayon") {

                        // Draw the crayon tool background
                        this.context.drawImage(this.crayonBackgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);

                        // Draw purple crayon
                        selected = (this.curColor === this.colorPurple);
                        locX = selected ? 18 : 52;
                        locY = 19;
                        drawCrayon(locX, locY, this.colorPurple, selected, this);

                        // Draw green crayon
                        selected = (this.curColor === this.colorGreen);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawCrayon(locX, locY, this.colorGreen, selected, this);

                        // Draw yellow crayon
                        selected = (this.curColor === this.colorYellow);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawCrayon(locX, locY, this.colorYellow, selected, this);

                        // Draw brown crayon
                        selected = (this.curColor === this.colorBrown);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawCrayon(locX, locY, this.colorBrown, selected, this);

                } else if (this.curTool === "marker") {

                        // Draw the marker tool background
                        this.context.drawImage(this.markerBackgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);

                        // Draw purple marker
                        selected = (this.curColor === this.colorPurple);
                        locX = selected ? 18 : 52;
                        locY = 19;
                        drawMarker(locX, locY, this.colorPurple, selected, this);

                        // Draw green marker
                        selected = (this.curColor === this.colorGreen);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawMarker(locX, locY, this.colorGreen, selected, this);

                        // Draw yellow marker
                        selected = (this.curColor === this.colorYellow);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawMarker(locX, locY, this.colorYellow, selected, this);

                        // Draw brown marker
                        selected = (this.curColor === this.colorBrown);
                        locX = selected ? 18 : 52;
                        locY += 46;
                        drawMarker(locX, locY, this.colorBrown, selected, this);

                } else if (this.curTool === "eraser") {

                        this.context.drawImage(this.eraserBackgroundImage, 0, 0, this.canvasWidth, this.canvasHeight);
                        this.context.drawImage(this.eraserImage, 18, 19, this.mediumImageWidth, this.mediumImageHeight);
                }

                // Draw line on ruler to indicate size
                switch (this.curSize) {
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
                this.context.beginPath();
                this.context.rect(locX, locY, 2, 12);
                this.context.closePath();
                this.context.fillStyle = '#333333';
                this.context.fill();

                // Keep the drawing in the drawing area
                this.context.save();
                this.context.beginPath();
                this.context.rect(this.drawingAreaX, this.drawingAreaY, this.drawingAreaWidth, this.drawingAreaHeight);
                this.context.clip();

                // For each point drawn
                for (i = 0; i < this.clickX.length; i += 1) {

                        // Set the drawing radius
                        switch (this.clickSize[i]) {
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
                        this.context.beginPath();
                        // If dragging then draw a line between the two points
                        if (this.clickDrag[i] && i) {
                                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
                        } else {
                                // The x position is moved over one pixel so a circle even if not dragging
                                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
                        }
                        this.context.lineTo(this.clickX[i], this.clickY[i]);
                        
                        // Set the drawing color
                        if (this.clickTool[i] === "eraser") {
                                //this.context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
                                this.context.strokeStyle = 'white';
                        } else {
                                //this.context.globalCompositeOperation = "source-over";     // To erase instead of draw over with white
                                this.context.strokeStyle = this.clickColor[i];
                        }
                        this.context.lineCap = "round";
                        this.context.lineJoin = "round";
                        this.context.lineWidth = radius;
                        this.context.stroke();
                }
                this.context.closePath();
                //this.context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
                this.context.restore();

                // Overlay a crayon texture (if the current tool is crayon)
                if (this.curTool === "crayon") {
                        this.context.globalAlpha = 0.4; // No IE support
                        this.context.drawImage(this.crayonTextureImage, 0, 0, this.canvasWidth, this.canvasHeight);
                }
                this.context.globalAlpha = 1; // No IE support

                // Draw the outline image
                this.context.drawImage(this.outlineImage, this.drawingAreaX, this.drawingAreaY, this.drawingAreaWidth, this.drawingAreaHeight);
        }
};