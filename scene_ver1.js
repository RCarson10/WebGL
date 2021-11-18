"use strict";

var canvas;
var gl;
var viewerPos, projection;

var pointsArray = [];
var colorsArray = [];
var normalsArray = [];

//We could include length variables here, but with the same gl.TRIANGLE configuration used for all the shapes, it is not needed

//Camera stuff, leave it alone for now:
var near = 0.3;
var far = 9;
var radius = 4.5;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 120.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var camera = 1;
const at = vec3(1.0, -1.0, 1.0);
const up = vec3(0.0, 1.0, 0.0); //This just tells the camera which direction is "up"

//Define some colors for the  as necessary:
const gray = vec4(0.5, 0.5, 0.5, 1.0);

//Begin initialization:
window.onload = function init() {
    //General setup of the canvas and such:
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    var myLight = light0(); //Variable to handle light
    var myMaterial = goldMaterial();


    //Step 2: Declare some objects, and add both their TriangleVertices and
    // TriangleVertexColors to the points and colors array
    // Declare translate, scaling and rotation before pushing to the arrays:
    //The objects we have to work with so far from geometry.js is cube(), specialCube() which is a trapezoid,
    // cylinder(), scallop(), and sphere()

    //FLOOR STEP 2 -----------------------------------------------------------
    var floor = cube(1.0, "Lgray");
    floor.scale(15, 0.1, 10);
    floor.translate(0.8, -2.0, 0);
    //FLOOR STEP 2 END ---------------------------------------------------------

    //WALL 1 STEP 2 -----------------------------------------------------------
    var wall1 = cube(1.0, "beige");
    wall1.scale(15, 8, 0.10);
    wall1.translate(1.5, 2, -3);
    //WALL 1 STEP 2 END ---------------------------------------------------------

    //WALL 2 STEP 2 -----------------------------------------------------------
    var wall2 = cube(1.0, "beige2");
    wall2.scale(5, 8, 3);
    wall2.rotate(90, [0, 1, 0]);
    wall2.translate(1.0, 0.7, -3.7);
    //WALL 2 STEP 2 END ---------------------------------------------------------

    //CADDY STEP 2 -------------------------------------------------------------------------
    //construct elongated cube for base of the caddy
    //Let's try and store the shapes of each object in one array, so that transformation can be applied to all the shapes within one object at the same time
    var caddy = [];

    var myCube = cube(1.0, "white");
    myCube.scale(1.8, 0.5, 0.5);
    myCube.translate(-3.0, 0, 0); //Move the whole thing to the side
    caddy.push(myCube); //Add box object to array for caddy

    //construct trapezoid side #1 of the caddy:
    var trapezoid1 = specialCube(1.0, "white");
    trapezoid1.scale(0.5, 0.7, 0.1);
    trapezoid1.rotate( 90, [0, 1, 0]);
    trapezoid1.translate(0.85, 0.6, 0.0);
    trapezoid1.translate(-3.0, 0,0); //Move the whole thing to the side
    caddy.push(trapezoid1);

    //construct trapezoid side #2 of the caddy
    var trapezoid2 = specialCube(1.0, "white");
    trapezoid2.scale(0.5, 0.7, 0.1); //Scaled the same as the first one
    trapezoid2.rotate(90, [0, 1, 0]); //Rotated the same as the first one
    trapezoid2.translate( -0.85, 0.6, 0.0); //Moved to the opposite end of the elongated cube
    trapezoid2.translate(-3.0, 0, 0 ); //Move the whole thing to the side
    caddy.push(trapezoid2);

    //construct the handle of the caddy
    var handle = cube(1.0, "white");
    handle.scale(1.8, 0.1, 0.2);
    handle.translate(0.0, 1.0, 0.0);
    handle.translate(-3.0, 0, 0); //Move the whole thing to the side
    caddy.push(handle);

    //A for loop to manipulate all the objects within caddy at the same time:
    for (var i = 0; i < caddy.length; i++)
    {
        caddy[i].scale(0.6, 0.6, 0.6);
        caddy[i].translate(2.1, 0, 2.3);
    }
    //END CADDY STEP 2-------------------------------------------------------------------------

    //CHAIR_A STEP 2 ----------------------------------------------
    //Create array to store all the objects for the chair:
    var chair1 = [];
    var chair2 = [];
    var chair3 = [];

    //Construct the back of the chair:
    var scallop1 = scallop(1);
    scallop1.scale(1.0, 1.0, 1.0);
    scallop1.translate(-1.0, 0, 0); //Move the whole thing to the side
    //All the chairs are the same, so we can add all the same objects to them
    //The duplication of the chairs comes later, when different transformations are added to the second and third chairs,
    //and those are added to the points array as well
    chair1.push(scallop1); //Push to the first chair

    //Construct the seat of the chair:
    var scallop2 = scallop(1);
    scallop2.scale(1.0, 1.0, 1.0);
    scallop2.rotate(-90, [1, 0, 0]);
    scallop2.rotate(180, [0, 1, 0]);
    scallop2.translate(0, -0.9, 0.9);
    scallop2.translate(-1.0, 0, 0); //Move the whole thing to the side
    chair1.push(scallop2); //Push to the first chair

    //Construct the legs:
    var leg1 = cylinder(72, 3, true, "brown");
    leg1.scale(0.1, 1.0, 0.1);
    leg1.translate(0.5, -1.5, 0.1);
    leg1.translate(-2, 0, 0); //move the whole thing to the side
    chair1.push(leg1); //Push to the first chair

    var leg2 = cylinder(72, 3, true, "brown");
    leg2.scale(0.1, 1.0, 0.1);
    leg2.translate( 1.5, -1.5, 0.1);
    leg2.translate(-2, 0, 0); //move the whole thing to the side
    chair1.push(leg2);

    var leg3 = cylinder(72, 3, true, "brown");
    leg3.scale( 0.1, 1.0, 0.1);
    leg3.translate(0.4, -1.5, 0.9);
    leg3.translate(-2, 0, 0); //move the whole thing to the side
    chair1.push(leg3);

    var leg4 = cylinder( 72, 3, true, "brown");
    leg4.scale(0.1, 1.0, 0.1);
    leg4.translate(1.6, -1.5, 0.9);
    leg4.translate(-2, 0, 0); //move the whole thing to the side
    chair1.push(leg4);

    //END CHAIR A -------------------------------------------------------

    //CHAIR B -----------------------------------------------------------
    //Construct the back of the SECOND chair:
    var scallop3 = scallop(1);
    scallop3.scale(1.0, 1.0, 1.0);
    scallop3.translate(-1.0, 0, 0); //Move the whole thing to the side
    //All the chairs are the same, so we can add all the same objects to them
    //The duplication of the chairs comes later, when different transformations are added to the second and third chairs,
    //and those are added to the points array as well
    chair2.push(scallop3); //Push to the first chair

    //Construct the seat of the chair:
    var scallop4 = scallop(1);
    scallop4.scale(1.0, 1.0, 1.0);
    scallop4.rotate(-90, [1, 0, 0]);
    scallop4.rotate(180, [0, 1, 0]);
    scallop4.translate(0, -0.9, 0.9);
    scallop4.translate(-1.0, 0, 0); //Move the whole thing to the side
    chair2.push(scallop4); //Push to the first chair

    //Construct the legs:
    var leg5 = cylinder(72, 3, true, "brown");
    leg5.scale(0.1, 1.0, 0.1);
    leg5.translate(0.5, -1.5, 0.1);
    leg5.translate(-2, 0, 0); //move the whole thing to the side
    chair2.push(leg5); //Push to the first chair

    var leg6 = cylinder(72, 3, true, "brown");
    leg6.scale(0.1, 1.0, 0.1);
    leg6.translate( 1.5, -1.5, 0.1);
    leg6.translate(-2, 0, 0); //move the whole thing to the side
    chair2.push(leg6);

    var leg7 = cylinder(72, 3, true, "brown");
    leg7.scale( 0.1, 1.0, 0.1);
    leg7.translate(0.4, -1.5, 0.9);
    leg7.translate(-2, 0, 0); //move the whole thing to the side
    chair2.push(leg7);

    var leg8 = cylinder( 72, 3, true, "brown");
    leg8.scale(0.1, 1.0, 0.1);
    leg8.translate(1.6, -1.5, 0.9);
    leg8.translate(-2, 0, 0); //move the whole thing to the side
    chair2.push(leg8);

    //CHAIR C -----------------------------------------------------------
    //Construct the back of the THIRD chair:
    var scallop5 = scallop(1);
    scallop5.scale(1.0, 1.0, 1.0);
    scallop5.translate(-1.0, 0, 0); //Move the whole thing to the side
    //All the chairs are the same, so we can add all the same objects to them
    //The duplication of the chairs comes later, when different transformations are added to the second and third chairs,
    //and those are added to the points array as well
    chair3.push(scallop5); //Push to the first chair

    //Construct the seat of the chair:
    var scallop6 = scallop(1);
    scallop6.scale(1.0, 1.0, 1.0);
    scallop6.rotate(-90, [1, 0, 0]);
    scallop6.rotate(180, [0, 1, 0]);
    scallop6.translate(0, -0.9, 0.9);
    scallop6.translate(-1.0, 0, 0); //Move the whole thing to the side
    chair3.push(scallop6); //Push to the first chair

    //Construct the legs:
    var leg9 = cylinder(72, 3, true, "brown");
    leg9.scale(0.1, 1.0, 0.1);
    leg9.translate(0.5, -1.5, 0.1);
    leg9.translate(-2, 0, 0); //move the whole thing to the side
    chair3.push(leg9); //Push to the first chair

    var leg10 = cylinder(72, 3, true, "brown");
    leg10.scale(0.1, 1.0, 0.1);
    leg10.translate( 1.5, -1.5, 0.1);
    leg10.translate(-2, 0, 0); //move the whole thing to the side
    chair3.push(leg10);

    var leg11 = cylinder(72, 3, true, "brown");
    leg11.scale( 0.1, 1.0, 0.1);
    leg11.translate(0.4, -1.5, 0.9);
    leg11.translate(-2, 0, 0); //move the whole thing to the side
    chair3.push(leg11);

    var leg12 = cylinder( 72, 3, true, "brown");
    leg12.scale(0.1, 1.0, 0.1);
    leg12.translate(1.6, -1.5, 0.9);
    leg12.translate(-2, 0, 0); //move the whole thing to the side
    chair3.push(leg12);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < chair1.length; i++)
    {
        chair1[i].translate(1.7, 0, 0.5); //Translates the entire chair to the positive x-axis
    }

    //Additional loops to affect the other two chairs can be implemented which should be different than the first set of chairs
    for (var i = 0; i < chair2.length; i++)
    {
        chair2[i].rotate(90, [0, 1, 0]);
        chair2[i].translate(-1.9, 0, 1.2); //Keeps the second chair in place
    }

    for (var i = 0; i < chair3.length; i++)
    {
        chair3[i].rotate(-90, [0, 1, 0]);
        chair3[i].translate(3, 0, 3.5); //Keeps the second chair in place
    }


    //END CHAIR_A STEP 2------------------------------------------------------

    //SHELF STEP 2: ----------------------------------------------------------
    var shelf = [];

    //Construct the left side of the shelf:
    var side1 = specialCube2(1.0, "gray");
    side1.scale(1.0, 4.0, 0.1); //It should be taller than it is wider, and thin in the z-direction
    side1.rotate(90, [0, 1, 0]); //Rotate it about the y-axis
    side1.translate(1.0, 0, 0); //Move it to the side
    shelf.push(side1);

    //Construct the right side of the shelf:
    var side2 = specialCube2(1.0, "gray");
    side2.scale(1.0, 4.0, 0.1); //Same dimensions as the other side of the shelf
    side2.rotate(90, [0, 1, 0]); //Same rotation as first side
    side2.translate(3.0, 0, 0); //Move it farther then the first side
    shelf.push(side2);

    //Construct the top shelf:
    var shelf1 = cube(1.0, "russet");
    shelf1.scale(2.0, 0.1, 0.4); //Long, skinny, short in the z-direction
    shelf1.translate(2.0, 1.7, -0.3); //Move it to line up with slightly below the top edges of the shelf sides
    shelf.push(shelf1);

    //construct the second shelf:
    var shelf2 = cube(1.0, "russet");
    shelf2.scale(2.0, 0.1, 0.6); //Which sticks out farther in the positive z-direction than shelf 1
    shelf2.translate(2.0, 0.7, -0.2); //Same x and z coordinates of first shelf, lower y coordinate
    shelf.push(shelf2);

    //Construct the third shelf:
    var shelf3 = cube(1.0, "russet");
    shelf3.scale(2.0, 0.1, 0.8); //Larger in the z-direction than the previous shelf
    shelf3.translate(2.0, -0.4, -0.1); //Below the previous shelf in the y-direction, slightly farther forward in the z-direction
    shelf.push(shelf3);

    //Construct the bottom shelf:
    var shelf4 = cube(1.0, "russet");
    shelf4.scale(2.0, 0.1, 0.89); //Larger in the z-direction than the previous shelf
    shelf4.translate(2.0, -1.6, 0.0); //Lower than all the other shelves
    shelf.push(shelf4);

    //A for loop to manipulate all the objects within shelf at the same time:
    for (var i = 0; i < shelf.length; i++)
    {
        shelf[i].scale(0.9, 0.9, 0.9);
        shelf[i].translate(-0.6, -0.2, -0.5);
    }

    //END SHELF STEP 2 -------------------------------------------------------

    //GRILL STEP 2: ----------------------------------------------------------
    var grill = [];

    //First, construct the countertop out of a cube:
    var counter = cube(1.0, "rock");
    counter.scale(1.7, 2.0, 2.7);
    counter.translate(4.5, -0.5, 1.5); //Move it far to the right and closer to the front
    grill.push(counter);

    //Next, build the base of the grill, which will stick out somewhat from the counter
    var grillbase = cube(1.0, "gray");
    grillbase.scale(1.0, 1.0, 1.5); //Make it a little bit longer in the z-direction
    grillbase.translate(4.0, 0.1, 1.5); //It needs to be moved where the counter is, and stick out farther in the negative x-direction of the counter
    grill.push(grillbase);

    //Construct the cylinder that will be the hood of the grill:
    var hood = cylinder(72, 3, true, "gray");
    hood.scale(1.0, 1.5, 1.5); //Scaled the same x and z directions as the grill base
    hood.rotate(90, [1, 0, 0]); //Rotate it to match the orientation of the counter
    hood.translate(4.0, 0.5, 1.5); //Move to approximately the same position as the grill base
    grill.push(hood);

    //Construct the dials for the front of the grill, the knob closest to the background:
    var dial1 = cylinder(72, 3, true, "gray");
    dial1.scale(0.2, 0.1, 0.2); //Needs to be very short in the y-direction and relatively small compared to the grill
    dial1.rotate(90, [0, 0, 1]); //Face is outwards from grill
    dial1.translate(3.5, 0.1, 0.9); //Needs to be translated to the front edge of the grill
    grill.push(dial1);

    //construct the second from the back dial:
    var dial2 = cylinder(72, 3, true, "gray");
    dial2.scale(0.2, 0.1, 0.2);
    dial2.rotate(90, [0, 0, 1]);
    dial2.translate(3.5, 0.1, 1.3);
    grill.push(dial2);

    //construct the third from the back dial:
    var dial3 = cylinder( 72, 3, true, "gray");
    dial3.scale(0.2, 0.1, 0.2);
    dial3.rotate(90, [0, 0, 1]);
    dial3.translate(3.5, 0.1, 1.7);
    grill.push(dial3);

    //construct the fourth from the back dial:
    var dial4 = cylinder( 72, 3, true, "gray");
    dial4.scale(0.2, 0.1, 0.2);
    dial4.rotate(90, [0, 0, 1]);
    dial4.translate(3.5, 0.1, 2.1);
    grill.push(dial4);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < grill.length; i++)
    {
        grill[i].translate(0, -0.3, 0);
    }

    //END GRILL STEP 2--------------------------------------------------------

    // GAJ"S OBJECTS STEP 2: ------------------------------------------------------------
    var door = [];
    // DOOR:
    var doorbase = cube(1.0,"wood");
    doorbase.scale(2.5,5.0, 0.3); // Making the door longer because it is the longest object in the scene
    doorbase.translate(-2.5,0.0,0.0); // The door is the farthest object to the left in the -x direction compared to the TV and Pillar
    door.push(doorbase);

    // The numbering of the windows starts from the top right window(1) to the bottom left window being window 8.
    var window1 = cube(0.75,"blue");
    window1.scale(1,1,0.43) // All the windows have the same scale to fit onto the door
    window1.translate(-2.0, 1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window1);

    var window2 = cube(0.75,"blue");
    window2.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window2.translate(-3.0, 1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window2);

    var window3 = cube(0.75,"blue");
    window3.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window3.translate(-2.0, 0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window3);

    var window4 = cube(0.75,"blue");
    window4.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window4.translate(-3.0, 0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window4);

    var window5 = cube(0.75,"blue");
    window5.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window5.translate(-2.0, -0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window5);

    var window6 = cube(0.75,"blue");
    window6.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window6.translate(-3.0, -0.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window6);

    var window7 = cube(0.75,"blue");
    window7.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window7.translate(-3.0, -1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window7);

    var window8 = cube(0.75,"blue");
    window8.scale(1,1,0.43)// All the windows have the same scale to fit onto the door
    window8.translate(-2.0, -1.5 ,0); // Each window was created in the pattern of keeping the x's and y's the same for the respective rows and columns
    door.push(window8);

    var doorKnob = cylinder(73,3,true,"gray");// The door knob is just a cylinder that are rotated and scaled perpendicular to the door
    doorKnob.scale(0.25,0.55,0.25); // Gotta make it scaled to the size of the door, it is small
    doorKnob.rotate(90,[1,0,0]); // Rotated it onto it's side so looks like a circle
    doorKnob.translate(-1.45,0,0); // Putting it right by the windows
    door.push(doorKnob);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < door.length; i++)
    {
        door[i].translate(0, 0.5, -3);
    }

    //Construct the television:
    //Create an array to store the different shapes that make up the objects:
    var television = [];
    var TV = cube(1,"black");
    TV.scale(4.5,2.3,0.1); // Making it the perfect size for a flat screen TV
    TV.translate(1.0,3.3,1.0); // Putting the TV on the top right of the door
    television.push(TV);

    var tvStem = cylinder(73,3,true,"black");
    tvStem.scale(1.0,2.5,0.1);
    tvStem.rotate(90,[1,0,0]); // Rotated it onto it's side so looks like a circle
    tvStem.translate(1.0,3.5,-0.25);
    television.push(tvStem);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < television.length; i++)
    {
        television[i].scale(0.8, 0.8, 0.8);
        television[i].translate(0, 0.8, -2);
    }

    //Construct the pillar:
    var pillar = [];
    var topPillar = cube(1.0,"beige");
    topPillar.scale(1.0,0.5,1.0); // We want the cube to be the same dimensions all around, but the top reaching to the top of the screen
    topPillar.translate(-0.5,2,-0.75); // Putting the far right and in front of TV and door on the Z axis
    pillar.push(topPillar);

    var midPillar = cube(1.0,"beige");
    midPillar.scale(1.0,4.5,0.5); // We want the cube to be the same dimensions all around, a little bigger in the Y for the mid
    midPillar.translate(-0.5,0.0,-0.75); // Putting it right under the top pillar
    pillar.push(midPillar);

    var btmPillar = cube(1.0,"wood");
    btmPillar.scale(0.5,0.5,0.5); // We want the cube to be the same dimensions all around, connects the top to the bottom
    btmPillar.translate(-0.5,-2.5,-0.75); // Putting it right under the mid pillar reaching to the bottom of the screen
    pillar.push(btmPillar);

    //A for loop to manipulate all the objects within pillar at the same time:
    for (var i = 0; i < pillar.length; i++)
    {
        pillar[i].translate(4.4, 1, 3.8);
    }

    // END GAJ STEP 2------------------------------------------------------------------------

    //ANTHONY'S OBJECTS: STEP 2: ---------------------------------------------------
    //Create array to store the shapes that construct the table object:
    var table = [];
    //Construct the tabletop:
    var tabletop = cylinder(72, 3, true, "stone");
    tabletop.scale(1.9, 0.04, 1.9);
    tabletop.rotate(0.0, [ 1, 1, 1]);
    tabletop.translate(0.3, -0.1, 2.3);
    table.push(tabletop);

    var tableLeg1 = cube(0.3, "gray");
    tableLeg1.scale(0.4, 7, 0.4);
    tableLeg1.rotate(35.0, [ 1, 1, 1]);
    tableLeg1.translate(0.2, -1.05, 2.2);
    table.push(tableLeg1);

    var tableLeg2 = cube(0.3, "gray");
    tableLeg2.scale(0.4, 7, 0.4);
    tableLeg2.rotate(-35.0, [ 1, 1, 1]);
    tableLeg2.translate(0.2, -1.05, 2.2);
    table.push(tableLeg2);

    var tableLeg3 = cube(0.3, "gray");
    tableLeg3.scale(0.4, 7, 0.4);
    tableLeg3.rotate(40.0, [ 1, 1, 1]);
    tableLeg3.rotate(-250, [0, 1, 0]);
    tableLeg3.translate(0.2, -1.05, 2.2);
    table.push(tableLeg3);

    var tableLeg4 = cube(0.3, "gray");
    tableLeg4.scale(0.4, 7, 0.4);
    tableLeg4.rotate(-40.0, [ 1, 1, 1]);
    tableLeg4.rotate( 60, [0, 1, 0]);
    tableLeg4.translate(0.2, -1.05, 2.2);
    table.push(tableLeg4);

    //Insert loop for manipulating table as a whole (if necessary)


    //TRASH CAN ----------------------------------------------------------
    var trashcan = [];

    var can = cube(0.75, "black");
    can.scale(0.45, 0.9, 0.85)
    can.translate(0.9, 0, -1.5);
    trashcan.push(can);

    var trashlid = cube(0.75, "blackA");
    trashlid.scale(0.45, 0.1, 0.85)
    trashlid.translate(0.9, 0.37, -1.5);
    trashcan.push(trashlid);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < trashcan.length; i++)
    {
        trashcan[i].scale(3, 3, 3);
        trashcan[i].translate(1.1, -0.9, 2);
    }
    //END TRASH CAN -------------------------------------------------------

    //WINDOWS ---------------------------------------------------------------
    var leftWindow = [];

    var myWindow = cube(0.75, "Ablue");
    myWindow.scale(1.25, 0.65, 0.2)
    myWindow.translate(0.0, 2.1, -1.0);
    leftWindow.push(myWindow);

    var myWindow2 = cube(0.75, "Ablue");
    myWindow2.scale(1.25, 0.65, 0.2)
    myWindow2.translate(0.0, 1.45, -1.0);
    leftWindow.push(myWindow2);

    var windowFrame = cube(0.75, "wood");
    windowFrame.scale(1.45, 1.65, 0.25)
    windowFrame.translate(0.0, 1.8, -1.05);
    leftWindow.push(windowFrame);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < leftWindow.length; i++)
    {
        leftWindow[i].scale(1.9, 1.9, 1.9);
        leftWindow[i].translate(5.0, -1.4, -1.0);
    }

    var rightWindow = [];
    var myWindow3 = cube(0.75, "Ablue");
    myWindow3.scale(1.25, 0.65, 0.2)
    myWindow3.translate(1.5, 2.1, -1.0);
    rightWindow.push(myWindow3);

    var myWindow4 = cube(0.75, "Ablue");
    myWindow4.scale(1.25, 0.65, 0.2)
    myWindow4.translate(1.5, 1.45, -1.0);
    rightWindow.push(myWindow4);

    var windowFrame2 = cube(0.75, "wood");
    windowFrame2.scale(1.45, 1.65, 0.25)
    windowFrame2.translate(1.5, 1.8, -1.05);
    rightWindow.push(windowFrame2);

    //A for loop to manipulate all the objects within chairA at the same time:
    for (var i = 0; i < rightWindow.length; i++)
    {
        rightWindow[i].scale(1.9, 1.9, 1.9);
        rightWindow[i].translate(5.0, -1.4, -1.0);
    }

    //END WINDOWS -------------------------------------------------------------

    //END ANTHONY'S OBJECTS STEP 2 --------------------------------------------------

    //Step 3: Load all of the triangle vertices needed along with the color:
    //Remember these are calculated in geometry.js for us, so the variable TriangleVertices contains every vertex of every triangle that is used to build the shape

    //Let's attempt to optimize these, and put all these concatenations in a loop

    //FLOOR
    pointsArray = pointsArray.concat(floor.TriangleVertices);
    colorsArray = colorsArray.concat(floor.TriangleVertexColors);
    normalsArray = normalsArray.concat(floor.TriangleNormals);

    //WALL 1
    pointsArray = pointsArray.concat(wall1.TriangleVertices);
    colorsArray = colorsArray.concat(wall1.TriangleVertexColors);
    normalsArray = normalsArray.concat(wall1.TriangleNormals);

    //WALL 2
    pointsArray = pointsArray.concat(wall2.TriangleVertices);
    colorsArray = colorsArray.concat(wall2.TriangleVertexColors);
    normalsArray = normalsArray.concat(wall2.TriangleNormals);


    //CADDY STEP 3: -------------------------------------------------------------------------
    //Let's attempt to optimize these, and put all these concatenations in a loop
    for (var i = 0; i < caddy.length; i++)
    {
        pointsArray = pointsArray.concat(caddy[i].TriangleVertices);
        colorsArray = colorsArray.concat(caddy[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(caddy[i].TriangleNormals);

    }
    //END CADDY STEP 3 -------------------------------------------------------------------------

    //CHAIR_A STEP 3: ----------------------------------------------------------
    for (var i = 0; i < chair1.length; i++)
    {
        pointsArray = pointsArray.concat(chair1[i].TriangleVertices);
        colorsArray = colorsArray.concat(chair1[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(chair1[i].TriangleNormals);

    }
    for (var i = 0; i < chair2.length; i++)
    {
        pointsArray = pointsArray.concat(chair2[i].TriangleVertices);
        colorsArray = colorsArray.concat(chair2[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(chair2[i].TriangleNormals);

    }
    for (var i = 0; i < chair3.length; i++)
    {
        pointsArray = pointsArray.concat(chair3[i].TriangleVertices);
        colorsArray = colorsArray.concat(chair3[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(chair3[i].TriangleNormals);

    }
    //END CHAIR_A STEP 3------------------------------------------------------

    //SHELF STEP 3: ----------------------------------------------------------
    for (var i = 0; i < shelf.length; i++)
    {
        pointsArray = pointsArray.concat(shelf[i].TriangleVertices);
        colorsArray = colorsArray.concat(shelf[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(shelf[i].TriangleNormals);

    }

    //END SHELF STEP 3 -------------------------------------------------------

    //GRILL STEP 3: ----------------------------------------------------------
    for (var i = 0; i < grill.length; i++)
    {
        pointsArray = pointsArray.concat(grill[i].TriangleVertices);
        colorsArray = colorsArray.concat(grill[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(grill[i].TriangleNormals);

    }

    //END GRILL STEP 3 --------------------------------------------------------

    //GAJ's OBJECTS: STEP 3 ------------------------------------------------------

    for (var i = 0; i < door.length; i++)
    {
        pointsArray = pointsArray.concat(door[i].TriangleVertices);
        colorsArray = colorsArray.concat(door[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(door[i].TriangleNormals);

    }

    for (var i = 0; i < television.length; i++)
    {
        pointsArray = pointsArray.concat(television[i].TriangleVertices);
        colorsArray = colorsArray.concat(television[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(television[i].TriangleNormals);

    }

    for (var i = 0; i < pillar.length; i++)
    {
        pointsArray = pointsArray.concat(pillar[i].TriangleVertices);
        colorsArray = colorsArray.concat(pillar[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(pillar[i].TriangleNormals);

    }

    //END GAJ'S OBJECTS STEP 3 --------------------------------------------------

    //ANTHONY"S OBJECTS STEP 3 ---------------------------------------------------
    for (var i = 0; i < table.length; i++)
    {
        pointsArray = pointsArray.concat(table[i].TriangleVertices);
        colorsArray = colorsArray.concat(table[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(table[i].TriangleNormals);

    }

    for (var i = 0; i < trashcan.length; i++)
    {
        pointsArray = pointsArray.concat(trashcan[i].TriangleVertices);
        colorsArray = colorsArray.concat(trashcan[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(trashcan[i].TriangleNormals);

    }

    for (var i = 0; i < leftWindow.length; i++)
    {
        pointsArray = pointsArray.concat(leftWindow[i].TriangleVertices);
        colorsArray = colorsArray.concat(leftWindow[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(leftWindow[i].TriangleNormals);

    }

    for (var i = 0; i < rightWindow.length; i++)
    {
        pointsArray = pointsArray.concat(rightWindow[i].TriangleVertices);
        colorsArray = colorsArray.concat(rightWindow[i].TriangleVertexColors);
        normalsArray = normalsArray.concat(rightWindow[i].TriangleNormals);

    }

    //END ANTHONY"S OBJECTS STEP 3 -----------------------------------------------

    //Step 4: Calculate the number of vertices needed for the cube so that the drawArrays function knows how long to iterate:
    //These would only be used if something other than gl.TRIANGLES was needed, which would completely change how the vertices are added into pointsArray


    //
    //  Load shaders and initialize attribute buffers
    //  LEAVE IT ALONE FOR NOW
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

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    viewerPos = vec3(0.0, 0.0, -20.0 );

    projection = ortho(-1, 1, -1, 1, -100, 100);

    var ambientProduct = mult(myLight.lightAmbient, myMaterial.materialAmbient);
    var diffuseProduct = mult(myLight.lightDiffuse, myMaterial.materialDiffuse);
    var specularProduct = mult(myLight.lightSpecular, myMaterial.materialSpecular);


// sliders for viewing parameters, camera stuff, leave it alone for now

    document.getElementById("zFarSlider").onchange = function(event) {
        far = event.target.value;
    };
    document.getElementById("zNearSlider").onchange = function(event) {
        near = event.target.value;
    };
    document.getElementById("radiusSlider").onchange = function(event) {
        radius = event.target.value;
    };
    document.getElementById("thetaSlider").onchange = function(event) {
        theta = event.target.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function(event) {
        phi = event.target.value* Math.PI/180.0;
    };
    document.getElementById("aspectSlider").onchange = function(event) {
        aspect = event.target.value;
    };
    document.getElementById("fovSlider").onchange = function(event) {
        fovy = event.target.value;
    };

    //---- ISAC ADDITIONS - MULTIPLE CAMERAS ----//


    document.getElementById("Camera1").onclick = function(event) {
        camera = 1;
    };

    document.getElementById("Camera2").onclick = function(event) {
        camera = 2;
    };

    document.getElementById("Camera3").onclick = function(event) {
        camera = 3;
    };

    document.getElementById("Camera4").onclick = function(event) {
        camera = 4;
    };

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
        flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
        flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(myLight.lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), myMaterial.materialShininess);

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
        false, flatten(projection));


    //---- END MULTIPLE CAMERAS
    render(); //Call webGL to draw now
}


var render = function(){

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //SWITCH function for cameras to create easier multi-viewing, leave it alone for now
    //Subject to change to make views more diverse - will be changed in refinement stage of scene project
    switch (camera) {
        case 1:
            eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
                radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));
            break;
        case 2:
            eye = vec3(radius * Math.sin(theta + 3.5) * Math.cos(phi + 0.5),
                radius * Math.sin(theta + 3.5) * Math.sin(phi + 0.5), radius * Math.cos(theta + 3.5));
            break;
        case 3:
            eye = vec3(radius * Math.sin(theta + 0.5) * Math.cos(phi + 0.6),
                radius * Math.sin(theta + 0.5) * Math.sin(phi + 0.6), radius * Math.cos(theta + 0.5));
            break;
        case 4:
            eye = vec3(radius * Math.sin(theta + 2.5) * Math.cos(phi + 2.6),
                radius * Math.sin(theta + 1.5) * Math.sin(phi + 6.9), radius * Math.cos(theta + 0.5));
            break;
    }

    //Leave these alone, camera stuff
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    //Leave these alone, integrates matrices from shaders and puts the model and projection into those shaders
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    //Step 5: FOR EACH SHAPE: call drawArrays and gl.TRIANGLES with the corresponding indices, calculated using the length of the entire array:
    //If the triangles are set up in the pointsArray correctly, this should work fine:
    //Let's see if we can just draw all of it:
    gl.drawArrays( gl.TRIANGLES, 0, pointsArray.length); //Success: (so far), but this will only work with shapes constructed based on gl.TRIANGLES.
    //If any other gl.SHAPE function is implemented, the indexing of the shapes will be wrong, and there will possibly be random triangles connecting shapes that aren't supposed to be connected


    requestAnimFrame(render);
}