"use strict";

var gl;

var pointsArray = []; //Stores the vertices of each line.

//Note that in this implementation, one color is used to draw all the lines so it is handled at the time of drawing

var turtle = [vec4(0, -1, 0, 1.0)]; //The turtle starts at the origin, always
var turtle2 = [vec4(1, -1, 0, 1.0)]; // The turtle for the second tree
var turtle3 = [vec4(-1, -1, 0, 1.0)]; // The turtle for the third tree
var len = 0.1; //Magnitude of vectors drawn
var direction = 90; //Rotation about the z-axis (i.e. 2D rotation) In this case, the initial direction of the tree should be growing upwards

var fColor;

var near = -10;
var far = 10;
var radius = 6.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

const black = vec4(0.0, 0.0, 0.0, 1.0);
const red = vec4(1.0, 0.0, 0.0, 1.0);

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

let grammar = genGrammar();
let grammar2 = genGrammar();
let grammar3 = genGrammar();

//document.getElementById("grammar").innerHTML = grammar; //For debugging
//grammar = "F[+F]F[-F"; //Test string to debug the functions


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // enable depth testing and polygon offset
    // so lines will be in front of filled triangles

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 2.0);

//The following is used for debugging, and should be replaced with the vertices calculated in the functions for each of the letters:
/*

    //Attempting to draw some lines, used for testing of the buffer environment:
    var vertices = [
        vec4(0, 0, 0, 1.0),
        vec4(0, 1, 0, 1.0)
    ];

    for(var i=0; i < vertices.length; i++)
    {
        pointsArray.push(vertices[i]);
    }
*/

    //Next, let's try debugging the functions written:
    //draw_F(len, direction, turtle, pointsArray); //Draw one branch

    //draw_openBracket(turtle);

    //let's try modifying the direction now before drawing the next line:
    //direction = draw_plus(direction);

    //draw_F(len, direction, turtle, pointsArray);

    //Debugging:
    //document.getElementById("testoutput").innerHTML = turtle[0];

    //Next, let's actually use the characters from the grammar string:
    //drawTrees( treeA, grammar, turtle ); //Idk Gaj's idea? Wack

    //Let's just iterate through the string:
    for (var i = 0; i < grammar.length; i++)
    {
        if (grammar.charAt(i) == 'F')
        {
            draw_F(len, direction, turtle, pointsArray);

        }
        else if (grammar.charAt(i) == '+')
        {
            direction = draw_plus(direction);
        }
        else if (grammar.charAt(i) == '-')
        {
            direction = draw_minus(direction);
        }
        else if (grammar.charAt(i) == '[')
        {
            turtle = draw_openBracket(turtle, pointsArray);

        }
        else if (grammar.charAt(i) == ']')
        {
            turtle = draw_closeBracket(turtle, pointsArray);

        }
        else
        {
            document.getElementById("testoutput").innerHTML = grammar.charAt(i);
        }
    }
    for (var i = 0; i < grammar2.length; i++)
    {
        if (grammar2.charAt(i) == 'F')
        {

            draw_F(len, direction, turtle2, pointsArray);


        }
        else if (grammar2.charAt(i) == '+')
        {
            direction = draw_plus(direction);
        }
        else if (grammar2.charAt(i) == '-')
        {
            direction = draw_minus(direction);
        }
        else if (grammar2.charAt(i) == '[')
        {

            turtle2 = draw_openBracket(turtle2, pointsArray);

        }
        else if (grammar2.charAt(i) == ']')
        {

            turtle2 = draw_closeBracket(turtle2, pointsArray);

        }
        else
        {
            document.getElementById("testoutput").innerHTML = grammar.charAt(i);
        }
    }

    for (var i = 0; i < grammar3.length; i++)
    {
        if (grammar3.charAt(i) == 'F')
        {

            draw_F(len, direction, turtle3, pointsArray);

        }
        else if (grammar3.charAt(i) == '+')
        {
            direction = draw_plus(direction);
        }
        else if (grammar3.charAt(i) == '-')
        {
            direction = draw_minus(direction);
        }
        else if (grammar3.charAt(i) == '[')
        {

            turtle3 = draw_openBracket(turtle3, pointsArray);
        }
        else if (grammar3.charAt(i) == ']')
        {

            turtle3 = draw_closeBracket(turtle3, pointsArray);
        }
        else
        {
            document.getElementById("testoutput").innerHTML = grammar.charAt(i);
        }
    }


    //document.getElementById("testoutput").innerHTML = turtle;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var vBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    fColor = gl.getUniformLocation(program, "fColor");

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// buttons for moving viewer and changing size
    document.getElementById("Button5").onclick = function(){theta += dr;};
    document.getElementById("Button6").onclick = function(){theta -= dr;};
    document.getElementById("Button7").onclick = function(){phi += dr;};
    document.getElementById("Button8").onclick = function(){phi -= dr;};
    document.getElementById("Button9").onclick = function(){left  *= 0.9; right *= 0.9;};
    document.getElementById("Button10").onclick = function(){left *= 1.1; right *= 1.1;};
    document.getElementById("Button11").onclick = function(){ytop  *= 0.9; bottom *= 0.9;};
    document.getElementById("Button12").onclick = function(){ytop *= 1.1; bottom *= 1.1;};

    render();

}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var eye = vec3( radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi),
        radius*Math.cos(theta));

    var modelViewMatrix = lookAt( eye, at, up );
    var projectionMatrix = ortho( left, right, bottom, ytop, near, far );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    // draw the lines in pairs of two vertices for the length of pointsArray
    // Note that the lines are drawn: 0->1, 2->3, 4->5. In other words, no vertices are reused.

    for(var i=0; i<pointsArray.length; i++) {
        gl.uniform4fv(fColor, flatten(black)); //Makes sure a color is added for every vertex
        gl.drawArrays( gl.LINES, 0, pointsArray.length );
    }

    requestAnimFrame(render);
}