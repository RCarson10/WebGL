"use strict";

var canvas;
var gl;

var pointsArray = [];
var colorsArray = [];
var normalsArray = [];
var modelView, projection;

var lightPosition = vec4(0.0, 0.0, 10.0, 0.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0,1.0, 1.0 );

var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0);
var materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
var materialShininess = 10.0;

//Step 1: Length variables
var ncube1; //Variable to store the number of vertices loaded to pointsArray for the door
var ncube2;
var ncube3;
var ncube4;
var ncube5;
var ncube6;
var ncube7;
var ncube8;
var ncube9;
var ncube10;
var ncube11;
var ncube12;
var ncube13;
var cylinder1;
var cylinder2;


var near = 0.4;
var far = 4.9;
var radius = 3.05;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 110.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var camera = 1;
var viewerPos;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    projection = ortho(-1, 1, -1, 1, -100, 100);
    viewerPos = vec3(0.0, 0.0, -20.0 );

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);


    //Step 2: Declare some objects, and add both their TriangleVertices and
    // TriangleVertexColors to the points and colors array
    //Declare translate, scaling and rotation before pushing to the arrays:

    var door = cube(1.0,1);
    door.scale(2.5,5.0, 0.3); // Making the door longer because it is the longest object in the scene
    door.translate(-2.5,0.0,0.0); // The door is the farthest object to the left in the -x direction compared to the TV and Pillar

// The numbering of the windows starts from the top right window(1) to the bottom left window being window 8.
    var window1 = cube(0.75,2);
    window1.scale(1,1,0.43) // All the windows have the same scale to fit onto the door
    window1.translate(-2.0, 1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var window2 = cube(0.75,2);
    window2.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window2.translate(-3.0, 1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns


    var window3 = cube(0.75,2);
    window3.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window3.translate(-2.0, 0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var window4 = cube(0.75,2);
    window4.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window4.translate(-3.0, 0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns


    var window5 = cube(0.75,2);
    window5.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window5.translate(-2.0, -0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var window6 = cube(0.75,2);
    window6.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window6.translate(-3.0, -0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var window7 = cube(0.75,2);
    window7.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window7.translate(-3.0, -1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var window8 = cube(0.75,2);
    window8.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window8.translate(-2.0, -1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns

    var doorKnob = cylinder(73,3,true,1);// The door knob is just a cylinder that are rotated and scaled perpendicular to the door
    doorKnob.scale(0.25,0.55,0.25); // Gotta make it scaled to the size of the door, it is small
    doorKnob.rotate(90,[1,0,0]); // Rotated it onto it's side so looks like a circle
    doorKnob.translate(-1.45,0,0); // Putting it right by the windows

    var TV = cube(1,4);
    TV.scale(4.5,2.3,0.1); // Making it the perfect size for a flat screen TV
    TV.translate(1.0,3.3,1.0); // Putting the TV on the top right of the door

    var topPillar = cube(1.0,5);
    topPillar.scale(1.27,0.85,1.27); // We want the cube to be the same dimensions all around, but the top reaching to the top of the screen
    topPillar.translate(3.0,3.50,2.0); // Putting the far right and in front of TV and door on the Z axis

    var midPillar = cube(1.0,5);
    midPillar.scale(1.0,4.50,1.0); // We want the cube to be the same dimensions all around, a little bigger in the Y for the mid
    midPillar.translate(3.0,1.0,2.0); // Putting it right under the top pillar


    var btmPillar = cube(1.0,1);
    btmPillar.scale(0.85,0.45,0.85); // We want the cube to be the same dimensions all around, connects the top to the bottom
    btmPillar.translate(3.0,-1.35,2.0); // Putting it right under the mid pillar reaching to the bottom of the screen

    var tvStem = cylinder(73,3,true,2);
    tvStem.scale(1.0,2.5,0.1);
    tvStem.rotate(90,[1,0,0]); // Rotated it onto it's side so looks like a circle
    tvStem.translate(1.0,3.5,-0.25);



    //Step 3: Load all of the triangle vertices needed along with the color:
    //Remember these are calculated in geometry.js for us, so the variable TriangleVertices contains every vertex of every triangle that is used to build the shape
    pointsArray = door.TriangleVertices;
    colorsArray = door.TriangleVertexColors;
    normalsArray = door.TriangleNormals;
    //After the first one, concat is used to push the arrays onto the end of what is already there

    pointsArray = pointsArray.concat(window1.TriangleVertices);
    colorsArray = colorsArray.concat(window1.TriangleVertexColors);
    normalsArray = normalsArray.concat(window1.TriangleNormals);
    pointsArray = pointsArray.concat(window2.TriangleVertices);
    colorsArray = colorsArray.concat(window2.TriangleVertexColors);
    normalsArray = normalsArray.concat(window2.TriangleNormals);
    pointsArray = pointsArray.concat(window3.TriangleVertices);
    colorsArray = colorsArray.concat(window3.TriangleVertexColors);
    normalsArray = normalsArray.concat(window3.TriangleNormals);
    pointsArray = pointsArray.concat(window4.TriangleVertices);
    colorsArray = colorsArray.concat(window4.TriangleVertexColors);
    normalsArray = normalsArray.concat(window4.TriangleNormals);
    pointsArray = pointsArray.concat(window5.TriangleVertices);
    colorsArray = colorsArray.concat(window5.TriangleVertexColors);
    normalsArray = normalsArray.concat(window5.TriangleNormals);
    pointsArray = pointsArray.concat(window6.TriangleVertices);
    colorsArray = colorsArray.concat(window6.TriangleVertexColors);
    normalsArray = normalsArray.concat(window6.TriangleNormals);
    pointsArray = pointsArray.concat(window7.TriangleVertices);
    colorsArray = colorsArray.concat(window7.TriangleVertexColors);
    normalsArray = normalsArray.concat(window7.TriangleNormals);
    pointsArray = pointsArray.concat(window8.TriangleVertices);
    colorsArray = colorsArray.concat(window8.TriangleVertexColors);
    normalsArray = normalsArray.concat(window8.TriangleNormals);
    pointsArray = pointsArray.concat(doorKnob.TriangleVertices);
    colorsArray = colorsArray.concat(doorKnob.TriangleVertexColors);
    normalsArray = normalsArray.concat(doorKnob.TriangleNormals);
    pointsArray = pointsArray.concat(TV.TriangleVertices);
    colorsArray = colorsArray.concat(TV.TriangleVertexColors);
    normalsArray = normalsArray.concat(TV.TriangleNormals);
    pointsArray = pointsArray.concat(topPillar.TriangleVertices);
    colorsArray = colorsArray.concat(topPillar.TriangleVertexColors);
    normalsArray = normalsArray.concat(topPillar.TriangleNormals);
    pointsArray = pointsArray.concat(midPillar.TriangleVertices);
    colorsArray = colorsArray.concat(midPillar.TriangleVertexColors);
    normalsArray = normalsArray.concat(midPillar.TriangleNormals);
    pointsArray = pointsArray.concat(btmPillar.TriangleVertices);
    colorsArray = colorsArray.concat(btmPillar.TriangleVertexColors);
    normalsArray = normalsArray.concat(btmPillar.TriangleNormals);
    pointsArray = pointsArray.concat(tvStem.TriangleVertices);
    colorsArray = colorsArray.concat(tvStem.TriangleVertexColors);
    normalsArray = normalsArray.concat(tvStem.TriangleNormals);




    //Step 4: Calculate the number of vertices needed for the cube so that the drawArrays function knows how long to iterate:
    ncube1 = door.TriangleVertices.length;
    ncube2 = window1.TriangleVertices.length;
    ncube3 = window2.TriangleVertices.length;
    ncube4 = window3.TriangleVertices.length;
    ncube5 = window4.TriangleVertices.length;
    ncube6 = window5.TriangleVertices.length;
    ncube7 = window6.TriangleVertices.length;
    ncube12 = window7.TriangleVertices.length;
    ncube13 = window8.TriangleVertices.length;
    cylinder2 = doorKnob.TriangleVertices.length;
    ncube8 = TV.TriangleVertices.length;
    ncube9 = topPillar.TriangleVertices.length;
    ncube10 = midPillar.TriangleVertices.length;
    ncube11 = btmPillar.TriangleVertices.length;
    cylinder1 = tvStem.TriangleVertices.length;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
``
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// sliders for viewing parameters

    document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
        flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
        flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"),materialShininess);

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
        false, flatten(projection));


    render();
}


var render = function(){

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    switch (camera) {
        case 1:
            eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
                radius *  Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));
            break;
        case 2:
            eye = vec3(radius * Math.sin(theta + 0.4) * Math.cos(phi),
                radius * Math.sin(theta + 0.4) * Math.sin(phi), radius * Math.cos(theta + 0.4));
            break;
        case 3:
            eye = vec3(radius * Math.sin(theta + 0.5) * Math.cos(phi + 0.6),
                radius * Math.sin(theta + 0.5) * Math.sin(phi + 0.6), radius * Math.cos(theta + 0.5));
            break;
        case 4:
            eye = vec3(radius * Math.sin(theta - 0.5) * Math.cos(phi - 0.6),
                radius * Math.sin(theta - 0.5) * Math.sin(phi - 0.6), radius * Math.cos(theta - 0.5));
            break;
    }

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    //Step 5: FOR EACH SHAPE: call drawArrays and gl.TRIANGLES with the corresponding indices, calculated using the lengths:
    gl.drawArrays( gl.TRIANGLES, 0, pointsArray.length);



    requestAnimFrame(render);
}