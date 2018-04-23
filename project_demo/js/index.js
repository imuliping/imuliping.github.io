/////////////////////////////////////////////////////////////////
// starting point, it is fired when the entire pages loads     //
// including its contentes, such as images, css, scripts, etc. //
/////////////////////////////////////////////////////////////////
window.load = main();

/**
 * main method
 */
function main() {
    var draw = new Drawing();
    draw.init();
}