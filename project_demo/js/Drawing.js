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
                        numCircles: 3666,
                        maxRadius: 20,
                        minRadius: 3,
                        colors: ["aqua",  "black", "blue",  "fuchsia",
                                          "green", "cyan",  "lime",  "maroon",
                                          "navy",  "olive", "purple","red",
                                          "silver","teal",  "yellow","azure",
                                          "gold",  "bisque","pink",  "orange"]
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

                this.drawCircles();
        },

        /**
         * draw circles
         */
        drawCircles: function() {
                for(var n = 0; n < this.numCircles; n++) {
                        // RANDOM values for circle characteristics.
                        var xPos       =  Math.random() * this.canvas.width;
                        var yPos       =  Math.random() * this.canvas.height;
                        var radius     =  this.minRadius + ( Math.random() * ( this.maxRadius - this.minRadius ) );
                        var colorIndex =  Math.random() * ( this.colors.length - 1 );
                        colorIndex     =  Math.round( colorIndex );
                        var color      =  this.colors[ colorIndex ];

                        // A5. DRAW circle.
                        this.drawCircle(this.context, xPos, yPos, radius, color);
                }

        },

        drawCircle: function( context, xPos, yPos, radius, color ) {
                //B1. PARAMETERS for shadow and angles.
                var startAngle        = (Math.PI/180)*0;
                var endAngle          = (Math.PI/180)*360;
                this.context.shadowColor   = "gray";
                this.context.shadowOffsetX = 1;
                this.context.shadowOffsetY = 1;
                this.context.shadowBlur    = 5;

                //B2. DRAW CIRCLE
                this.context.beginPath();
                this.context.arc(xPos, yPos, radius, startAngle, endAngle, false);
                this.context.fillStyle = color;
                this.context.fill();           
        }

};