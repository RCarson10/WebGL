/*           geometry.js

    Simple geometry package using MV.js
    Supports:

            cube object
            cylinder object
            sphere object

            material object
            light object

            texture object
*/

"use strict";

//Eventually I would like to implement the ability to pass in multiple options for color to the call for each shape,
//For instance, cube could have multiple options for color, such as red, green, and blue,
//Then, cube(0.3, 1) would call option 1, red and cube(0.3, 2) would call option 2, blue

/* scallop object
    Usage: var myScallop = scallop(color)
    color is an integer, each integer corresponds to a different color configuration
    color = 1; Then Brown
    !color = rainbow

    Attributes:
    TriangleVertices
    TriangleVertex Colors

    Methods:
        translate( dx, dy, dz);
        scale( sx, sy, sz);
        rotate(angle, [axisx, axisy, axisz]);
*/

function scallop(color)
{
    var data = {};

    //Not gonna do size, since the vertices are so complicated

    var scallopVertices = [
        [ -0.78, 0, 0, 1.0 ], //v0
        [ -0.5, -1, 0, 1.0 ], //v1
        [ 0.78, 0, 0, 1.0 ], //v2
        [ -0.5, -1, 0, 1.0 ], //v3
        [ 0, 0, 0, 1.0 ], //v4
        [ 0.4, 0.15, 0, 1.0 ], //v5
        [ 0, 0.25, 0, 1.0 ], //v6
        [ -0.4, 0.15, 0, 1.0 ], //v7
        [ -0.5, -1, -0.1, 1.0 ], //v8
        [ 0.5, -1, -0.1, 1.0 ], //v9
        [ 0.78, 0, -0.1, 1.0 ], //v10
        [ 0.4, 0.15, -0.1, 1.0 ], //v11
        [ 0, 0.25, -0.1, 1.0 ], //v12
        [ -0.4, 0.15, -0.1, 1.0 ], //v13
        [ -0.78, 0, -0.1, 1.0 ], //v14
        [ 0, 0, -0.1, 1.0 ] //v15
    ];

    var triangleIndices = [

        0, 1, 2,
        1, 2, 3,
        0, 4, 7,
        7, 4, 6,
        4, 5, 6,
        4, 2, 5,

        14, 10, 8,
        8, 9, 10,
        13, 14, 15,
        12, 13, 15,
        11, 12, 15,
        10, 11, 15,

        0, 7, 14,
        14, 13, 7,
        7, 13, 6,
        6, 13, 12,
        12, 6, 5,
        12, 11, 5,
        11, 5, 2,
        11, 10, 2,

        0, 1, 14,
        1, 8, 14,
        1, 8, 9,
        1, 3, 9,
        2, 3, 10,
        10, 9, 3
    ];

    var colorIndices = [
        0, 1, 2,
        1, 2, 3,
        2, 3, 4,
        3, 4, 5,
        4, 5, 6,
        5, 6, 7,

        6, 7, 0,
        7, 0, 1,
        0, 1, 2,
        1, 2, 3,
        2, 3, 4,
        3, 4, 5,

        4, 5, 6,
        5, 6, 7,
        6, 7, 0,
        7, 0, 1,
        0, 1, 2,
        1, 2, 3,
        2, 3, 4,
        3, 4, 5,

        4, 5, 6,
        5, 6, 7,
        6, 7, 0,
        7, 0, 1,
        0, 1, 2,
        1, 2, 3
    ];

    //Define argument for choosing a color:
    if (color == 1)
    {
        //Brown:
        var scallopVertexColors = [

            [ 0.4, 0.2, 0.0, 1.0 ],  //Saturated
            [ 0.38, 0.2, 0.1, 1.0 ],
            [ 0.48, 0.29, 0.15, 1.0 ],
            [ 0.48, 0.35, 0.20, 1.0 ], //Medium brown
            [ 0.55, 0.39, 0.22, 1.0 ],
            [ 0.55, 0.45, 0.25, 1.0 ],
            [ 0.60, 0.59, 0.30, 1.0 ],
            [ 0.61, 0.59, 0.40, 1.0 ]  // Desaturated
        ];
    }
    else if (color == 2)
    {
        //Gray:
        var scallopVertexColors = [
            //Darkest
            [ 0.10, 0.10, 0.10, 1.0 ],  //
            [ 0.20, 0.20, 0.20, 1.0 ],  //
            [ 0.30, 0.30, 0.30, 1.0 ],  //
            [ 0.40, 0.40, 0.40, 1.0 ],  //
            [ 0.50, 0.50, 0.50, 1.0 ],  //
            [ 0.60, 0.60, 0.60, 1.0 ],  //
            [ 0.70, 0.70, 0.70, 1.0 ],   //
            [ 0.80, 0.80, 0.80, 1.0 ]  //Lightest
        ];
    }
    else
    {
        //Rainbow cube by default - means the conditional statement isn't working properly
        var scallopVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }

    //Now, Let's load all these vertices and triangles into arrays so that each triangle has its three vertices listed
    //define some temporary arrays to hold the vertices and colors:
    var scallopTriangleVertices = [];
    var scallopTriangleVertexColors = [];

    //Next, we need to implement iteration based on the number of triangles that are in the shape:
    for ( var i = 0; i < triangleIndices.length; i++ ) {
        scallopTriangleVertices.push( scallopVertices[triangleIndices[i]] );
        scallopTriangleVertexColors.push( scallopVertexColors[colorIndices[i]] );
    }

    //Next, the methods for translate, scale and rotate:
    function translate(x, y, z){

        for(i = 0; i < scallopVertices.length; i++) {
            scallopVertices[i][0] += x;
            scallopVertices[i][1] += y;
            scallopVertices[i][2] += z;
        };
        /*
        for(i=0; i<cubeTriangleVertices.length; i++) {
          cubeTriangleVertices[i][0] += x;
          cubeTriangleVertices[i][1] += y;
          cubeTriangleVertices[i][2] += z;
        };
     */
        //console.log(cubeVertices.length);
        //console.log(cubeTriangleVertices.length);
    }

    function scale(sx, sy, sz){

        for(i=0; i<scallopVertices.length; i++) {
            scallopVertices[i][0] *= sx;
            scallopVertices[i][1] *= sy;
            scallopVertices[i][2] *= sz;
        };

        /*
            for(i=0; i<cubeTriangleVertices.length; i++) {
                cubeTriangleVertices[i][0] *= sx;
                cubeTriangleVertices[i][1] *= sy;
                cubeTriangleVertices[i][2] *= sz;
                cubeTriangleNormals[i][0] /= sx;
                cubeTriangleNormals[i][1] /= sy;
                cubeTriangleNormals[i][2] /= sz;
            };
        */
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(i=0; i<scallopVertices.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*scallopVertices[i][k];
            for( var j =0; j<3; j++) scallopVertices[i][j] = t[j];
        };

    }

    data.VertexColors = scallopVertexColors;
    data.Vertices = scallopVertices;
    data.TriangleVertices = scallopTriangleVertices;
    data.TriangleVertexColors = scallopTriangleVertexColors;
    data.translate = translate;
    data.scale = scale;
    data.rotate = rotate;

    return data;

}

/*   Cube object

     Usage: var myCube = cube(side_length)
            var myCube = cube() gives side of length 1

    cube is centered at origin with sides aligned with axes

    Attributes:  The following each have 36 values for rendering 12 triangles
                  comprising the cube

                TextureCoordinates
                TriangleVertices
                TriangleVertexColors
                TriangleFaceColors
                TriangleNormals

                The following are for rendering by elements

                Indices
                Vertices
                Elements


                VertexColors   (8 primary colors)
    Methods:

                translate(dx, dy, dz)
                scale(sz, sy, sz)
                rotate(angle, [axisx, axisy, axisz])
*/

function cube(s, color) {

    var data = {};

    var size;
    if (!s) size = 0.5;
    else size = s/2;

    var cubeVertices = [
        [ -size, -size,  size, 1.0 ],
        [ -size,  size,  size, 1.0 ],
        [  size, size, size, 1.0 ],
        [  size, -size,  size, 1.0 ],
        [ -size, -size, -size, 1.0 ],
        [ -size,  size, -size, 1.0 ],
        [ size,  size, -size, 1.0  ],
        [ size, -size, -size, 1.0 ]
    ];

    var cubeFaceNormals = [
        [ 0, 0, 1],
        [ 1, 0, 0],
        [ 0, -1, 0],
        [ 0, 1, 0],
        [ 0, 0, -1],
        [ -1 , 0, 0]
    ];

    var cubeIndices = [

        [ 1, 0, 3, 2],
        [ 2, 3, 7, 6],
        [ 3, 0, 4, 7],
        [ 6, 5, 1, 2],
        [ 4, 5, 6, 7],
        [ 5, 4, 0, 1]
    ];

    //Define argument for choosing a color:
    if (color == "rainbow")
    {
        //Rainbow cube
        var cubeVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }
    else if ( color == "gray") //NOTE: everywhere cube is color = 2, it is not "gray"
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        //Gray cube:
        var cubeVertexColors = [
            //Darkest
            [ 0.10, 0.10, 0.10, 1.0 ],  //
            [ 0.20, 0.20, 0.20, 1.0 ],  //
            [ 0.30, 0.30, 0.30, 1.0 ],  //
            [ 0.40, 0.40, 0.40, 1.0 ],  //
            [ 0.50, 0.50, 0.50, 1.0 ],  //
            [ 0.60, 0.60, 0.60, 1.0 ],  //
            [ 0.70, 0.70, 0.70, 1.0 ],   //
            [ 0.80, 0.80, 0.80, 1.0 ]  //Lightest
        ];
    }
    else if ( color == "russet")
    {
        //Brownish red for the wood-like shelves
        //Brown:
        var cubeVertexColors = [

            [ 0.5, 0.2, 0.0, 1.0 ],  //Saturated
            [ 0.4, 0.2, 0.1, 1.0 ],
            [ 0.5, 0.29, 0.15, 1.0 ],
            [ 0.55, 0.35, 0.20, 1.0 ], //Medium brown
            [ 0.65, 0.39, 0.22, 1.0 ],
            [ 0.65, 0.45, 0.25, 1.0 ],
            [ 0.69, 0.59, 0.30, 1.0 ],
            [ 0.69, 0.59, 0.40, 1.0 ]  // Desaturated
        ];
    }
    else if ( color == "rock")
    {
        //Define tan for the countertop color:
        //Light brown for the rock colors
        //Tan:
        var cubeVertexColors = [

            [ 0.36, 0.25, 0.20, 1.0 ],  //Saturated/Darkest
            [ 0.31, 0.31, 0.18, 1.0 ], //Olive-ish
            [ 0.56, 0.42, 0.14, 1.0 ], //Sienna
            [ 0.36, 0.25, 0.20, 1.0 ], //Medium brown
            [ 0.55, 0.47, 0.33, 1.0 ], //bronze
            [ 0.55, 0.53, 0.47, 1.0 ], //cornsilk
            [ 0.52, 0.39, 0.39, 1.0 ], //Dusty rose
            [ 0.55, 0.47, 0.37, 1.0 ]  // Desaturated/Lightest
        ];
    }
        //Add Gaj's colors
    //Define argument for choosing a color:
    else if (color == "wood") // Wood Color
    {
        var cubeVertexColors = [

            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ]  // wood
        ];
    }
    else if ( color == "blue")//Baby Blue
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var cubeVertexColors = [// Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ]  //Baby Blue
        ];
    }
    else if ( color == "silver")//Silver
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var cubeVertexColors = [ //Silver
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ]  //
        ];
    }
    else if (color == "beige")
    {
        var cubeVertexColors = [
            //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
        ];
    }
    else if (color == "beige2")
    {
        var cubeVertexColors = [
            //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
            [ 0.602, 0.4765, 0.3667, 1.0 ],  //Beige
        ];
    }
    else if ( color == "black")
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var cubeVertexColors = [
            //Black
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],   //
            [ 0.0, 0.0, 0.0, 1.0 ]  //Lightest
        ];
    }
    //Add Anthony's Colors:
    else if (color == "grayA") // 1 = gray in Anthony's project
    {
        var cubeVertexColors = [

            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ]
        ];
    }
    else if ( color == "Ablue") // 2 = light Blue in Anthony's project
    {
        var cubeVertexColors = [

            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ]
        ];
    }
    else if ( color == "white") // 3 = white(-ish) from Anthony's project
    {
        var cubeVertexColors = [

            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ]
        ];
    }
    else if ( color == "blackA") // 4 = (lighter) black from Anthony's project
    {
        var cubeVertexColors = [

            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ]
        ];
    }
    else if ( color == "Lgray") // 4 = (lighter) black from Anthony's project
    {
        var cubeVertexColors = [

            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ]
        ];
    }
    else
    {
        //Rainbow cube by default
        var cubeVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }


    //Cube elements defines each vertex of each triangle that makes up each face of the cube, similar to the quad function
    var cubeElements = [
        1, 0, 3,
        3, 2, 1,

        2, 3, 7,
        7, 6, 2,

        3, 0, 4,
        4, 7, 3,

        6, 5, 1,
        1, 2, 6,

        4, 5, 6,
        6, 7, 4,

        5, 4, 0,
        0, 1, 5
    ];

    var cubeTexElements = [
        1, 0, 3,
        3, 2, 1,

        1, 0, 3,
        3, 2, 1,

        0, 1, 2,
        2, 3, 0,

        2, 1, 0,
        0, 3, 2,

        3, 2, 1,
        1, 0, 3,

        2, 3, 0,
        0, 1, 2
    ];

    var cubeNormalElements = [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1,
        1, 1, 1,
        2, 2, 2,
        2, 2, 2,
        3, 3, 3,
        3, 3, 3,
        4, 4, 4,
        4, 4, 4,
        5, 5, 5,
        5, 5, 5

    ];

    var faceTexCoord = [
        [ 0, 0],
        [ 0, 1],
        [ 1, 1],
        [ 1, 0]
    ];

    var cubeTriangleVertices = [];
    var cubeTriangleVertexColors = [];
    var cubeTriangleFaceColors = [];
    var cubeTextureCoordinates = [];
    var cubeTriangleNormals = [];

    for ( var i = 0; i < cubeElements.length; i++ ) {
        cubeTriangleVertices.push( cubeVertices[cubeElements[i]] );
        cubeTriangleVertexColors.push( cubeVertexColors[cubeElements[i]] );
        cubeTextureCoordinates.push( faceTexCoord[cubeTexElements[i]]);
        cubeTriangleNormals.push(cubeFaceNormals[cubeNormalElements[i]]);
    }

    for ( var i = 0; i < cubeElements.length; i++ ) {
        cubeTriangleFaceColors[i] = cubeVertexColors[1+Math.floor((i/6))];
    }

    function translate(x, y, z){

        for(i=0; i<cubeVertices.length; i++) {
            cubeVertices[i][0] += x;
            cubeVertices[i][1] += y;
            cubeVertices[i][2] += z;
        };
        /*
        for(i=0; i<cubeTriangleVertices.length; i++) {
          cubeTriangleVertices[i][0] += x;
          cubeTriangleVertices[i][1] += y;
          cubeTriangleVertices[i][2] += z;
        };
     */
        //console.log(cubeVertices.length);
        //console.log(cubeTriangleVertices.length);
    }

    function scale(sx, sy, sz){

        for(i=0; i<cubeVertices.length; i++) {
            cubeVertices[i][0] *= sx;
            cubeVertices[i][1] *= sy;
            cubeVertices[i][2] *= sz;
        };
        for(i=0; i<cubeFaceNormals.length; i++) {
            cubeFaceNormals[i][0] /= sx;
            cubeFaceNormals[i][1] /= sy;
            cubeFaceNormals[i][2] /= sz;
        };

        /*
            for(i=0; i<cubeTriangleVertices.length; i++) {
                cubeTriangleVertices[i][0] *= sx;
                cubeTriangleVertices[i][1] *= sy;
                cubeTriangleVertices[i][2] *= sz;
                cubeTriangleNormals[i][0] /= sx;
                cubeTriangleNormals[i][1] /= sy;
                cubeTriangleNormals[i][2] /= sz;
            };
        */
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(i=0; i<cubeVertices.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*cubeVertices[i][k];
            for( var j =0; j<3; j++) cubeVertices[i][j] = t[j];
        };


        for(i=0; i<cubeFaceNormals.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*cubeFaceNormals[i][k];
            for( var j =0; j<3; j++) cubeFaceNormals[i][j] = t[j];
        };

    }


    data.Indices = cubeIndices;
    data.VertexColors = cubeVertexColors;
    data.Vertices = cubeVertices;
    data.Elements = cubeElements;
    data.FaceNormals = cubeFaceNormals;
    data.TextureCoordinates = cubeTextureCoordinates;
    data.TriangleVertices = cubeTriangleVertices;
    data.TriangleVertexColors = cubeTriangleVertexColors;
    data.TriangleFaceColors = cubeTriangleFaceColors;
    data.TriangleNormals = cubeTriangleNormals;
    data.translate = translate;
    data.scale = scale;
    data.rotate = rotate;

    return data;

}

//________________________________________________________

/*      Special Cube for caddy

        Usage is the same for cube()

*/

function specialCube(s, color) {

    var data = {};

    var size;
    if (!s) size = 0.5;
    else size = s/2;

    //Post zip change: Made the top skinnier
    var specialVertices = [
        [ -size, -size, size, 1.0 ],
        [ (-0.4 * size), size, size, 1.0 ],
        [ (0.4 * size), size, size, 1.0 ],
        [  size, -size,  size, 1.0 ],
        [ -size, -size, -size, 1.0 ],
        [ (-0.4 * size),  size, -size, 1.0 ],
        [ (0.4 * size),  size, -size, 1.0  ],
        [ size, -size, -size, 1.0 ]
    ]


    //var cubeVertices = [
    //    [ -size, -size,  size, 1.0 ],
    ///    [ -size,  size,  size, 1.0 ],
    //    [  size, size, size, 1.0 ],
    //    [  size, -size,  size, 1.0 ],
    //   [ -size, -size, -size, 1.0 ],
    //   [ -size,  size, -size, 1.0 ],
    //   [ size,  size, -size, 1.0  ],
    //   [ size, -size, -size, 1.0 ]
    //];

    var specialFaceNormals = [
        [ 0, 0, 1],
        [ 1, 0, 0],
        [ 0, -1, 0],
        [ 0, 1, 0],
        [ 0, 0, -1],
        [ -1 , 0, 0]
    ];

    var specialIndices = [

        [ 1, 0, 3, 2],
        [ 2, 3, 7, 6],
        [ 3, 0, 4, 7],
        [ 6, 5, 1, 2],
        [ 4, 5, 6, 7],
        [ 5, 4, 0, 1]
    ];

    //Define argument for choosing a color:
    if (color == "rainbow")
    {
        //Rainbow cube
        var specialVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }
    else if ( color == "gray") //NOTE: everywhere cube is color = 2, it is not "gray"
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        //Gray cube:
        var specialVertexColors = [
            //Darkest
            [ 0.10, 0.10, 0.10, 1.0 ],  //
            [ 0.20, 0.20, 0.20, 1.0 ],  //
            [ 0.30, 0.30, 0.30, 1.0 ],  //
            [ 0.40, 0.40, 0.40, 1.0 ],  //
            [ 0.50, 0.50, 0.50, 1.0 ],  //
            [ 0.60, 0.60, 0.60, 1.0 ],  //
            [ 0.70, 0.70, 0.70, 1.0 ],   //
            [ 0.80, 0.80, 0.80, 1.0 ]  //Lightest
        ];
    }
    else if ( color == "russet")
    {
        //Brownish red for the wood-like shelves
        //Brown:
        var specialVertexColors = [

            [ 0.5, 0.2, 0.0, 1.0 ],  //Saturated
            [ 0.4, 0.2, 0.1, 1.0 ],
            [ 0.5, 0.29, 0.15, 1.0 ],
            [ 0.55, 0.35, 0.20, 1.0 ], //Medium brown
            [ 0.65, 0.39, 0.22, 1.0 ],
            [ 0.65, 0.45, 0.25, 1.0 ],
            [ 0.69, 0.59, 0.30, 1.0 ],
            [ 0.69, 0.59, 0.40, 1.0 ]  // Desaturated
        ];
    }
    else if ( color == "rock")
    {
        //Define tan for the countertop color:
        //Light brown for the rock colors
        //Tan:
        var specialVertexColors = [

            [ 0.36, 0.25, 0.20, 1.0 ],  //Saturated/Darkest
            [ 0.31, 0.31, 0.18, 1.0 ], //Olive-ish
            [ 0.56, 0.42, 0.14, 1.0 ], //Sienna
            [ 0.36, 0.25, 0.20, 1.0 ], //Medium brown
            [ 0.55, 0.47, 0.33, 1.0 ], //bronze
            [ 0.55, 0.53, 0.47, 1.0 ], //cornsilk
            [ 0.52, 0.39, 0.39, 1.0 ], //Dusty rose
            [ 0.55, 0.47, 0.37, 1.0 ]  // Desaturated/Lightest
        ];
    }
        //Add Gaj's colors
    //Define argument for choosing a color:
    else if (color == "wood") // Wood Color
    {
        var specialVertexColors = [

            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ],  // wood
            [ .4157, .2863, .251, 1.0 ]  // wood
        ];
    }
    else if ( color == "blue")//Baby Blue
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var specialVertexColors = [// Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ],  //Baby Blue
            [ 0.537, 0.812, 0.941, 1.0 ]  //Baby Blue
        ];
    }
    else if ( color == "silver")//Silver
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var specialVertexColors = [ //Silver
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ],  //
            [ 0.753, 0.753, 0.753, 1.0 ]  //
        ];
    }
    else if (color == "beige")
    {
        var specialVertexColors = [
            //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
            [ 0.702, 0.5765, 0.4667, 1.0 ],  //Beige
        ];
    }
    else if ( color == "black")
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var specialVertexColors = [
            //Black
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],   //
            [ 0.0, 0.0, 0.0, 1.0 ]  //Lightest
        ];
    }
    //Add Anthony's Colors:
    else if (color == "grayA") // 1 = gray in Anthony's project
    {
        var specialVertexColors = [

            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ],
            [ .4, .4, .4, 1.0 ]
        ];
    }
    else if ( color == "Ablue") // 2 = light Blue in Anthony's project
    {
        var specialVertexColors = [

            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ],
            [ 0.537, 0.812, 0.941, 1.0 ]
        ];
    }
    else if ( color == "white") // 3 = white(-ish) from Anthony's project
    {
        var specialVertexColors = [

            [ 0.919, 0.925, 0.93, 1.0 ],
            [ 0.93, 0.925, 0.919, 1.0 ],
            [ 0.915, 0.915, 0.915, 1.0 ],
            [ 0.92, 0.92, 0.92, 1.0 ],
            [ 0.93, 0.93, 0.93, 1.0 ],
            [ 0.913, 0.913, 0.913, 1.0 ],
            [ 0.9, 0.9, 0.9, 1.0 ],
            [ 0.95, 0.95, 0.95, 1.0 ]
        ];
    }
    else if ( color == "blackA") // 4 = (lighter) black from Anthony's project
    {
        var specialVertexColors = [

            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ],
            [ 0.1, 0.1, 0.1, 1.0 ]
        ];
    }
    else
    {
        //Rainbow cube by default
        var specialVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }

    var specialElements = [
        1, 0, 3,
        3, 2, 1,

        2, 3, 7,
        7, 6, 2,

        3, 0, 4,
        4, 7, 3,

        6, 5, 1,
        1, 2, 6,

        4, 5, 6,
        6, 7, 4,

        5, 4, 0,
        0, 1, 5
    ];

    var specialTexElements = [
        1, 0, 3,
        3, 2, 1,

        1, 0, 3,
        3, 2, 1,

        0, 1, 2,
        2, 3, 0,

        2, 1, 0,
        0, 3, 2,

        3, 2, 1,
        1, 0, 3,

        2, 3, 0,
        0, 1, 2
    ];

    var specialNormalElements = [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1,
        1, 1, 1,
        2, 2, 2,
        2, 2, 2,
        3, 3, 3,
        3, 3, 3,
        4, 4, 4,
        4, 4, 4,
        5, 5, 5,
        5, 5, 5

    ];

    var specialTexCoord = [
        [ 0, 0],
        [ 0, 1],
        [ 1, 1],
        [ 1, 0]
    ];

    var specialTriangleVertices = [];
    var specialTriangleVertexColors = [];
    var specialTriangleFaceColors = [];
    var specialTextureCoordinates = [];
    var specialTriangleNormals = [];

    for ( var i = 0; i < specialElements.length; i++ ) {
        specialTriangleVertices.push( specialVertices[specialElements[i]] );
        specialTriangleVertexColors.push( specialVertexColors[specialElements[i]] );
        specialTextureCoordinates.push( specialTexCoord[specialTexElements[i]]);
        specialTriangleNormals.push(specialFaceNormals[specialNormalElements[i]]);
    }

    for ( var i = 0; i < specialElements.length; i++ ) {
        specialTriangleFaceColors[i] = specialVertexColors[1+Math.floor((i/6))];
    }

    function translate(x, y, z){

        for(i=0; i<specialVertices.length; i++) {
            specialVertices[i][0] += x;
            specialVertices[i][1] += y;
            specialVertices[i][2] += z;
        };
        /*
        for(i=0; i<cubeTriangleVertices.length; i++) {
          cubeTriangleVertices[i][0] += x;
          cubeTriangleVertices[i][1] += y;
          cubeTriangleVertices[i][2] += z;
        };
     */
        //console.log(cubeVertices.length);
        //console.log(cubeTriangleVertices.length);
    }

    function scale(sx, sy, sz){

        for(i=0; i<specialVertices.length; i++) {
            specialVertices[i][0] *= sx;
            specialVertices[i][1] *= sy;
            specialVertices[i][2] *= sz;
        };
        for(i=0; i<specialFaceNormals.length; i++) {
            specialFaceNormals[i][0] /= sx;
            specialFaceNormals[i][1] /= sy;
            specialFaceNormals[i][2] /= sz;
        };

        /*
            for(i=0; i<cubeTriangleVertices.length; i++) {
                cubeTriangleVertices[i][0] *= sx;
                cubeTriangleVertices[i][1] *= sy;
                cubeTriangleVertices[i][2] *= sz;
                cubeTriangleNormals[i][0] /= sx;
                cubeTriangleNormals[i][1] /= sy;
                cubeTriangleNormals[i][2] /= sz;
            };
        */
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(i=0; i<specialVertices.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*specialVertices[i][k];
            for( var j =0; j<3; j++) specialVertices[i][j] = t[j];
        };


        for(i=0; i<specialFaceNormals.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*specialFaceNormals[i][k];
            for( var j =0; j<3; j++) specialFaceNormals[i][j] = t[j];
        };

    }


    data.Indices = specialIndices;
    data.VertexColors = specialVertexColors;
    data.Vertices = specialVertices;
    data.Elements = specialElements;
    data.FaceNormals = specialFaceNormals;
    data.TextureCoordinates = specialTextureCoordinates;
    data.TriangleVertices = specialTriangleVertices;
    data.TriangleVertexColors = specialTriangleVertexColors;
    data.TriangleFaceColors = specialTriangleFaceColors;
    data.TriangleNormals = specialTriangleNormals;
    data.translate = translate;
    data.scale = scale;
    data.rotate = rotate;

    return data;

}

//----------------------------------------------------------
//      Special trapezoid for shelf, almost identical to specialCube, but with different vertices
//________________________________________________________

/*      Special Cube for caddy

        Usage is the same for cube()

*/

function specialCube2(s, color) {

    var data = {};

    var size;
    if (!s) size = 0.5;
    else size = s/2;

    //Post zip change: Made the top skinnier
    var specialVertices = [
        [ -size, -size, size, 1.0 ],
        [ (-0.05 * size), size, size, 1.0 ],
        [ (size), size, size, 1.0 ],
        [  size, -size,  size, 1.0 ],
        [ -size, -size, -size, 1.0 ],
        [ (-0.05 * size),  size, -size, 1.0 ],
        [ (size),  size, -size, 1.0  ],
        [ size, -size, -size, 1.0 ]
    ]


    //var cubeVertices = [
    //    [ -size, -size,  size, 1.0 ],
    ///    [ -size,  size,  size, 1.0 ],
    //    [  size, size, size, 1.0 ],
    //    [  size, -size,  size, 1.0 ],
    //   [ -size, -size, -size, 1.0 ],
    //   [ -size,  size, -size, 1.0 ],
    //   [ size,  size, -size, 1.0  ],
    //   [ size, -size, -size, 1.0 ]
    //];

    var specialFaceNormals = [
        [ 0, 0, 1],
        [ 1, 0, 0],
        [ 0, -1, 0],
        [ 0, 1, 0],
        [ 0, 0, -1],
        [ -1 , 0, 0]
    ];

    var specialIndices = [

        [ 1, 0, 3, 2],
        [ 2, 3, 7, 6],
        [ 3, 0, 4, 7],
        [ 6, 5, 1, 2],
        [ 4, 5, 6, 7],
        [ 5, 4, 0, 1]
    ];

    //Conditional statement that chooses what color set to implement
    if (color === "gray")
    {
        var specialVertexColors = [
            //Darkest Gray
            [ 0.01, 0.01, 0.01, 1.0 ],  //
            [ 0.1, 0.1, 0.1, 1.0 ],  //
            [ 0.15, 0.15, 0.15, 1.0 ],  //
            [ 0.2, 0.2, 0.2, 1.0 ],  //
            [ 0.25, 0.25, 0.25, 1.0 ],  //
            [ 0.3, 0.3, 0.3, 1.0 ],  //
            [ 0.35, 0.35, 0.35, 1.0 ],   //
            [ 0.4, 0.4, 0.4, 1.0 ]  //Lightest Gray
        ];
    }
    else if ( color == "black")
    {
        //Let's try and make it shades of gray for the caddy:
        //Ok, this works for the caddy, so let's build that now
        var cubeVertexColors = [
            //Black
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],  //
            [ 0.0, 0.0, 0.0, 1.0 ],   //
            [ 0.0, 0.0, 0.0, 1.0 ]  //Lightest
        ];
    }
    else
    {
        var specialVertexColors = [

            [ 1.0, 0.0, 0.0, 1.0 ],  // red
            [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
            [ 0.0, 1.0, 0.0, 1.0 ],  // green
            [ 0.0, 0.0, 1.0, 1.0 ],  // blue
            [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
            [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
            [ 1.0, 1.0, 1.0, 1.0 ],   // white
            [ 0.0, 0.0, 0.0, 1.0 ]  // black
        ];
    }

    var specialElements = [
        1, 0, 3,
        3, 2, 1,

        2, 3, 7,
        7, 6, 2,

        3, 0, 4,
        4, 7, 3,

        6, 5, 1,
        1, 2, 6,

        4, 5, 6,
        6, 7, 4,

        5, 4, 0,
        0, 1, 5
    ];

    var specialTexElements = [
        1, 0, 3,
        3, 2, 1,

        1, 0, 3,
        3, 2, 1,

        0, 1, 2,
        2, 3, 0,

        2, 1, 0,
        0, 3, 2,

        3, 2, 1,
        1, 0, 3,

        2, 3, 0,
        0, 1, 2
    ];

    var specialNormalElements = [
        0, 0, 0,
        0, 0, 0,
        1, 1, 1,
        1, 1, 1,
        2, 2, 2,
        2, 2, 2,
        3, 3, 3,
        3, 3, 3,
        4, 4, 4,
        4, 4, 4,
        5, 5, 5,
        5, 5, 5

    ];

    var specialTexCoord = [
        [ 0, 0],
        [ 0, 1],
        [ 1, 1],
        [ 1, 0]
    ];

    var specialTriangleVertices = [];
    var specialTriangleVertexColors = [];
    var specialTriangleFaceColors = [];
    var specialTextureCoordinates = [];
    var specialTriangleNormals = [];

    for ( var i = 0; i < specialElements.length; i++ ) {
        specialTriangleVertices.push( specialVertices[specialElements[i]] );
        specialTriangleVertexColors.push( specialVertexColors[specialElements[i]] );
        specialTextureCoordinates.push( specialTexCoord[specialTexElements[i]]);
        specialTriangleNormals.push(specialFaceNormals[specialNormalElements[i]]);
    }

    for ( var i = 0; i < specialElements.length; i++ ) {
        specialTriangleFaceColors[i] = specialVertexColors[1+Math.floor((i/6))];
    }

    function translate(x, y, z){

        for(i=0; i<specialVertices.length; i++) {
            specialVertices[i][0] += x;
            specialVertices[i][1] += y;
            specialVertices[i][2] += z;
        };
        /*
        for(i=0; i<cubeTriangleVertices.length; i++) {
          cubeTriangleVertices[i][0] += x;
          cubeTriangleVertices[i][1] += y;
          cubeTriangleVertices[i][2] += z;
        };
     */
        //console.log(cubeVertices.length);
        //console.log(cubeTriangleVertices.length);
    }

    function scale(sx, sy, sz){

        for(i=0; i<specialVertices.length; i++) {
            specialVertices[i][0] *= sx;
            specialVertices[i][1] *= sy;
            specialVertices[i][2] *= sz;
        };
        for(i=0; i<specialFaceNormals.length; i++) {
            specialFaceNormals[i][0] /= sx;
            specialFaceNormals[i][1] /= sy;
            specialFaceNormals[i][2] /= sz;
        };

        /*
            for(i=0; i<cubeTriangleVertices.length; i++) {
                cubeTriangleVertices[i][0] *= sx;
                cubeTriangleVertices[i][1] *= sy;
                cubeTriangleVertices[i][2] *= sz;
                cubeTriangleNormals[i][0] /= sx;
                cubeTriangleNormals[i][1] /= sy;
                cubeTriangleNormals[i][2] /= sz;
            };
        */
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(i=0; i<specialVertices.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*specialVertices[i][k];
            for( var j =0; j<3; j++) specialVertices[i][j] = t[j];
        };


        for(i=0; i<specialFaceNormals.length; i++) {
            var t = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++)
                    t[j] += mat[j][k]*specialFaceNormals[i][k];
            for( var j =0; j<3; j++) specialFaceNormals[i][j] = t[j];
        };

    }


    data.Indices = specialIndices;
    data.VertexColors = specialVertexColors;
    data.Vertices = specialVertices;
    data.Elements = specialElements;
    data.FaceNormals = specialFaceNormals;
    data.TextureCoordinates = specialTextureCoordinates;
    data.TriangleVertices = specialTriangleVertices;
    data.TriangleVertexColors = specialTriangleVertexColors;
    data.TriangleFaceColors = specialTriangleFaceColors;
    data.TriangleNormals = specialTriangleNormals;
    data.translate = translate;
    data.scale = scale;
    data.rotate = rotate;

    return data;

}

//_________________________________________________________

/*     Cylinder Object

      Usage: var myCylinder = cylinder(numSlices, numStacks, caps);

      Cylinder aligned with y-axis with base on plane y = 0

      slices = divisions around cylinder
      stacks = divisions along y
      caps = true then generate top and bottom caps

      default: cylinder(36, 1, true)

      Attributes:  The following each have  values for rendering the triangles
                    comprising the cylinder

                  TextureCoordinates
                  TriangleVertices
                  TriangleVertexColors
                  TriangleFaceColors
                  TriangleNormals

      Methods:

                  translate(dx, dy, dz)
                  scale(sz, sy, sz)
                  rotate(angle, [axisx, axisy, axisz])


*/

function cylinder(numSlices, numStacks, caps, color) {

    var slices = 36;
    if(numSlices) slices = numSlices;
    var stacks = 1;
    if(numStacks) stacks = numStacks;
    var capsFlag = true;
    if(caps==false) capsFlag = caps;

    var data = {};

    var top = 0.5;
    var bottom = -0.5;
    var radius = 0.5;
    var topCenter = [0.0, top, 0.0];
    var bottomCenter = [0.0, bottom, 0.0];

    //We can also make this a conditional statement:
    if (color === "brown") //Brown
    {
        var sideColor = [ 0.48, 0.35, 0.20, 1.0 ]; //Brown
        var topColor = [ 0.0, 0.0, 0.0, 1.0 ]; //Black
        var bottomColor = [ 0.0, 0.0, 0.0, 1.0 ]; //Black
    }
    else if (color === "gray") //Gray
    {
        var sideColor = [ 0.5, 0.5, 0.5, 1.0 ]; //Gray
        var topColor = [ 0.0, 0.0, 0.0, 1.0 ]; //Black
        var bottomColor = [ 0.0, 0.0, 0.0, 1.0 ]; //Black
    }
    else if (color == "black")
    {
        var sideColor = [0.0, 0.0, 0.0, 1.0];
        var topColor = [0.0, 0.0, 0.0, 1.0];
        var bottomColor = [0.0, 0.0, 0.0, 1.0];
    }
    else if (color == "stone")
    {
        var sideColor = [0.40, 0.40, 0.40, 1.0];
        var topColor = [0.30, 0.30, 0.30, 1.0];
        var bottomColor = [0.35, 0.35, 0.35, 1.0];
    }
    else
    {
        //Rainbow
        var sideColor = [1.0, 0.0, 0.0, 1.0]; //Red
        var topColor = [0.0, 1.0, 0.0, 1.0]; //Green
        var bottomColor = [0.0, 0.0, 1.0, 1.0]; //Blue
    }

    var cylinderVertexCoordinates = [];
    var cylinderNormals = [];
    var cylinderVertexColors = [];
    var cylinderTextureCoordinates = [];

// side

    for(var j=0; j<stacks; j++) {
        var stop = bottom + (j+1)*(top-bottom)/stacks;
        var sbottom = bottom + j*(top-bottom)/stacks;
        var topPoints = [];
        var bottomPoints = [];
        var topST = [];
        var bottomST = [];
        for(var i =0; i<slices; i++) {
            var theta = 2.0*i*Math.PI/slices;
            topPoints.push([radius*Math.sin(theta), stop, radius*Math.cos(theta), 1.0]);
            bottomPoints.push([radius*Math.sin(theta), sbottom, radius*Math.cos(theta), 1.0]);
        };

        topPoints.push([0.0, stop, radius, 1.0]);
        bottomPoints.push([0.0,  sbottom, radius, 1.0]);


        for(var i=0; i<slices; i++) {
            var a = topPoints[i];
            var d = topPoints[i+1];
            var b = bottomPoints[i];
            var c = bottomPoints[i+1];
            var u = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
            var v = [c[0]-b[0], c[1]-b[1], c[2]-b[2]];

            var normal = [
                u[1]*v[2] - u[2]*v[1],
                u[2]*v[0] - u[0]*v[2],
                u[0]*v[1] - u[1]*v[0]
            ];

            var mag = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2])
            normal = [normal[0]/mag, normal[1]/mag, normal[2]/mag];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([i/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, (j-1)*(top-bottom)/stacks]);

            cylinderVertexCoordinates.push([d[0], d[1], d[2], 1.0]);
            cylinderVertexColors.push(sideColor);
            cylinderNormals.push([normal[0], normal[1], normal[2]]);
            cylinderTextureCoordinates.push([(i+1)/slices, j*(top-bottom)/stacks]);
        };
    };

    var topPoints = [];
    var bottomPoints = [];
    for(var i =0; i<slices; i++) {
        var theta = 2.0*i*Math.PI/slices;
        topPoints.push([radius*Math.sin(theta), top, radius*Math.cos(theta), 1.0]);
        bottomPoints.push([radius*Math.sin(theta), bottom, radius*Math.cos(theta), 1.0]);
    };
    topPoints.push([0.0, top, radius, 1.0]);
    bottomPoints.push([0.0,  bottom, radius, 1.0]);

    if(capsFlag) {

//top

        for(i=0; i<slices; i++) {
            normal = [0.0, 1.0, 0.0];
            var a = [0.0, top, 0.0, 1.0];
            var b = topPoints[i];
            var c = topPoints[i+1];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(topColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);
        };

//bottom

        for(i=0; i<slices; i++) {
            normal = [0.0, -1.0, 0.0];
            var a = [0.0, bottom, 0.0, 1.0];
            var b = bottomPoints[i];
            var c = bottomPoints[i+1];
            cylinderVertexCoordinates.push([a[0], a[1], a[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([b[0], b[1], b[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);

            cylinderVertexCoordinates.push([c[0], c[1], c[2], 1.0]);
            cylinderVertexColors.push(bottomColor);
            cylinderNormals.push(normal);
            cylinderTextureCoordinates.push([0, 1]);
        };

    };
    function translate(x, y, z){
        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            cylinderVertexCoordinates[i][0] += x;
            cylinderVertexCoordinates[i][1] += y;
            cylinderVertexCoordinates[i][2] += z;
        };
    }

    function scale(sx, sy, sz){
        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            cylinderVertexCoordinates[i][0] *= sx;
            cylinderVertexCoordinates[i][1] *= sy;
            cylinderVertexCoordinates[i][2] *= sz;
            cylinderNormals[i][0] /= sx;
            cylinderNormals[i][1] /= sy;
            cylinderNormals[i][2] /= sz;
        };
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(var i=0; i<cylinderVertexCoordinates.length; i++) {
            var u = [0, 0, 0];
            var v = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++) {
                    u[j] += mat[j][k]*cylinderVertexCoordinates[i][k];
                    v[j] += mat[j][k]*cylinderNormals[i][k];
                };
            for( var j =0; j<3; j++) {
                cylinderVertexCoordinates[i][j] = u[j];
                cylinderNormals[i][j] = v[j];
            };
        };
    }

    data.TriangleVertices = cylinderVertexCoordinates;
    data.TriangleNormals = cylinderNormals;
    data.TriangleVertexColors = cylinderVertexColors;
    data.TextureCoordinates = cylinderTextureCoordinates;
    data.rotate = rotate;
    data.translate = translate;
    data.scale = scale;
    return data;

}

//_____________________________________________________________


/*    Sphere object

      Usage: var mySphere = sphere(numSubdivisions);

      Sphere of radius 0.5 generated by recursive subdivision of tetrahedron
        producing 4**(numsubdivisions+1) triangles

     default: sphere(3)

      Attributes:  The following each have  values for rendering the triangles
              apporoximating the sphere

            TextureCoordinates
            TriangleVertices
            TriangleVertexColors
            TriangleFaceColors
            TriangleNormals

Methods:

            translate(dx, dy, dz)
            scale(sz, sy, sz)
            rotate(angle, [axisx, axisy, axisz])


*/

function sphere(numSubdivisions) {

    var subdivisions = 3;
    if(numSubdivisions) subdivisions = numSubdivisions;


    var data = {};

//var radius = 0.5;

    var sphereVertexCoordinates = [];
    var sphereVertexCoordinatesNormals = [];
    var sphereVertexColors = [];
    var sphereTextureCoordinates = [];
    var sphereNormals = [];

    var va = vec4(0.0, 0.0, -1.0,1);
    var vb = vec4(0.0, 0.942809, 0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
    var vd = vec4(0.816497, -0.471405, 0.333333,1);

    function triangle(a, b, c) {

        sphereVertexCoordinates.push([a[0],a[1], a[2], 1]);
        sphereVertexCoordinates.push([b[0],b[1], b[2], 1]);
        sphereVertexCoordinates.push([c[0],c[1], c[2], 1]);

        // normals are vectors

        sphereNormals.push([a[0],a[1], a[2]]);
        sphereNormals.push([b[0],b[1], b[2]]);
        sphereNormals.push([c[0],c[1], c[2]]);

        sphereVertexColors.push([(1+a[0])/2.0, (1+a[1])/2.0, (1+a[2])/2.0, 1.0]);
        sphereVertexColors.push([(1+b[0])/2.0, (1+b[1])/2.0, (1+b[2])/2.0, 1.0]);
        sphereVertexColors.push([(1+c[0])/2.0, (1+c[1])/2.0, (1+c[2])/2.0, 1.0]);

        sphereTextureCoordinates.push([0.5*Math.acos(a[0])/Math.PI, 0.5*Math.asin(a[1]/Math.sqrt(1.0-a[0]*a[0]))/Math.PI]);
        sphereTextureCoordinates.push([0.5*Math.acos(b[0])/Math.PI, 0.5*Math.asin(b[1]/Math.sqrt(1.0-b[0]*b[0]))/Math.PI]);
        sphereTextureCoordinates.push([0.5*Math.acos(c[0])/Math.PI, 0.5*Math.asin(c[1]/Math.sqrt(1.0-c[0]*c[0]))/Math.PI]);

        //sphereTextureCoordinates.push([0.5+Math.asin(a[0])/Math.PI, 0.5+Math.asin(a[1])/Math.PI]);
        //sphereTextureCoordinates.push([0.5+Math.asin(b[0])/Math.PI, 0.5+Math.asin(b[1])/Math.PI]);
        //sphereTextureCoordinates.push([0.5+Math.asin(c[0])/Math.PI, 0.5+Math.asin(c[1])/Math.PI]);

    }



    function divideTriangle(a, b, c, count) {
        if ( count > 0 ) {

            var ab = mix( a, b, 0.5);
            var ac = mix( a, c, 0.5);
            var bc = mix( b, c, 0.5);

            ab = normalize(ab, true);
            ac = normalize(ac, true);
            bc = normalize(bc, true);

            divideTriangle( a, ab, ac, count - 1 );
            divideTriangle( ab, b, bc, count - 1 );
            divideTriangle( bc, c, ac, count - 1 );
            divideTriangle( ab, bc, ac, count - 1 );
        }
        else {
            triangle( a, b, c );
        }
    }


    function tetrahedron(a, b, c, d, n) {
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    tetrahedron(va, vb, vc, vd, subdivisions);


    function translate(x, y, z){
        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            sphereVertexCoordinates[i][0] += x;
            sphereVertexCoordinates[i][1] += y;
            sphereVertexCoordinates[i][2] += z;
        };
    }

    function scale(sx, sy, sz){
        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            sphereVertexCoordinates[i][0] *= sx;
            sphereVertexCoordinates[i][1] *= sy;
            sphereVertexCoordinates[i][2] *= sz;
            sphereNormals[i][0] /= sx;
            sphereNormals[i][1] /= sy;
            sphereNormals[i][2] /= sz;
        };
    }

    function radians( degrees ) {
        return degrees * Math.PI / 180.0;
    }

    function rotate( angle, axis) {

        var d = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);

        var x = axis[0]/d;
        var y = axis[1]/d;
        var z = axis[2]/d;

        var c = Math.cos( radians(angle) );
        var omc = 1.0 - c;
        var s = Math.sin( radians(angle) );

        var mat = [
            [ x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s ],
            [ x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s ],
            [ x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c ]
        ];

        for(var i=0; i<sphereVertexCoordinates.length; i++) {
            var u = [0, 0, 0];
            var v = [0, 0, 0];
            for( var j =0; j<3; j++)
                for( var k =0 ; k<3; k++) {
                    u[j] += mat[j][k]*sphereVertexCoordinates[i][k];
                    v[j] += mat[j][k]*sphereNormals[i][k];
                };
            for( var j =0; j<3; j++) {
                sphereVertexCoordinates[i][j] = u[j];
                sphereNormals[i][j] = v[j];
            };
        };
    }
//for(var i =0; i<sphereVertexCoordinates.length; i++) console.log(sphereTextureCoordinates[i]);

    data.TriangleVertices = sphereVertexCoordinates;
    data.TriangleNormals = sphereNormals;
    data.TriangleVertexColors = sphereVertexColors;
    data.TextureCoordinates = sphereTextureCoordinates;
    data.rotate = rotate;
    data.translate = translate;
    data.scale = scale;
    return data;

}

//______________________________________________________________________

/*
          Gold Colored materialAmbient

          Useage: myMaterial = goldMaterial();
*/

function goldMaterial() {
    var data  = {};
    data.materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
    data.materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
    data.materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
    data.materialShininess = 100.0;
    return data;
}

//Let's make a new color, similar to gold material:
function greenMaterial() {
    var data  = {};
    data.materialAmbient = vec4( 0.5, 0.0, 1.0, 1.0 );
    data.materialDiffuse = vec4( 0.5, 1.0, 0.0, 1.0);
    data.materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
    data.materialShininess = 100.0;
    return data;
}

//_________________________________________________________________________________

/*
          Light Object

          Usage: var myLight = light0()

          Distant light with ambient, diffuse and specular components
*/
function light0() {
    var data = {};
    data.lightPosition = [0.0, 0.0, 10.0, 0.0 ];;
    data.lightAmbient = [0.2, 0.2, 0.2, 1.0 ];
    data.lightDiffuse = [ 1.0, 1.0, 1.0, 1.0 ];
    data.lightSpecular = [1.0, 1.0, 1.0, 1.0 ];
    data.lightShineness = 10;
    return data;
}

//_________________________________________________________________________________

/*
      Checkerboard texture

      Usage: var myTexture = checkerboardTexture(size, rows, columns)

      creates a size x size texture with a checkerboard of nrows x ncolumns

      default: checkerboard(128, 8 8)
*/


function checkerboardTexture(size, rows, columns)
{
    var texSize = 128;
    if(size)  texSize = size;

    var nrows = 8;
    if(rows) nrows = rows;
    var ncolumns = nrows;
    if(columns) ncolumns = columns;

    // Create a checkerboard pattern using floats

    var image = new Uint8Array(4*texSize*texSize);

    for ( var i = 0; i < texSize; i++ )
        for ( var j = 0; j < texSize; j++ ) {
            var patchx = Math.floor(i/(texSize/ncolumns));
            var patchy = Math.floor(j/(texSize/nrows));

            var c = (patchx%2 !== patchy%2 ? 255 : 0);

            image[4*i*texSize+4*j] = c;
            image[4*i*texSize+4*j+1] = c;
            image[4*i*texSize+4*j+2] = c;
            image[4*i*texSize+4*j+3] = 255;
        }

    var texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    return texture;
}