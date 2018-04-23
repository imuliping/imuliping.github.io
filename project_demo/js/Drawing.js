//////////////////////////////////////
// define class Drawing
//////////////////////////////////////

// Constructor
Drawing = function() {
        
        // define properties
        var numCircles = 3666;
        var maxRadius = 20;
        var minRadius = 3;
        var colors = [];
        var canvas = document.getElementById("myCanvasId");
        var context = canvas.getContext("2d");

        /**
         * init
         * with this, it is a public method, can be called from outside
         */
        this.init = function() {
                console.debug( "Drawing.init=>");
                
                // set init values
                colors = ["aqua",  "black", "blue",  "fuchsia",
                               "green", "cyan",  "lime",  "maroon",
                               "navy",  "olive", "purple","red",
                               "silver","teal",  "yellow","azure",
                               "gold",  "bisque","pink",  "orange"]

                // call method
                drawCircles();
                
        };
        

        /**
         * draw many circles
         * 
         * with var, it is a private method
         */
        var drawCircles = function() {
                for( var n = 0; n < numCircles; n++ ) {
                        var xPos       =  Math.random() * canvas.width;
                        var yPos       =  Math.random() * canvas.height;
                        var radius     =  minRadius + ( Math.random() * ( maxRadius - minRadius ) );
                        var colorIndex =  Math.random() * ( colors.length - 1 );
                        colorIndex     =  Math.round( colorIndex );
                        var color      =  colors[ colorIndex ];

                        // draw one circle.
                        drawCircle(context, xPos, yPos, radius, color);
                }

        };
        

        /**
         * draw one circle
         * 
         * with var, it is a private method
         */
        var drawCircle = function( ctx, xPos, yPos, radius, color ) {
                //B1. PARAMETERS for shadow and angles.
                var startAngle        = (Math.PI/180)*0;
                var endAngle          = (Math.PI/180)*360;
                ctx.shadowColor   = "gray";
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.shadowBlur    = 5;

                //B2. DRAW CIRCLE
                ctx.beginPath();
                ctx.arc(xPos, yPos, radius, startAngle, endAngle, false);
                ctx.fillStyle = color;
                ctx.fill();           
        };

};