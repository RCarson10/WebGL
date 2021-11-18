
//Helper function to generate the grammar:
function genGrammar(F = "F[-F+F]F[+F-F]", iterations = 2) {
    let output = F;

    for (let i = 0; i < iterations; i++) {
        for (let j = 0; ; j++) {
            if (j >= output.length) break;
            if (output[j] === "F") {
                output = output.substring(0, j) + F + output.substring(j + 1);
                j += F.length;
            }
        }
    }

    return output;
}

//VERIFIED WORKING:
//Function that returns the vertices for drawing a new line in the current direction of a certain length
//Based on the current placement of the turtle
function draw_F(len, direction, turtle, pointsArray)
{
    var vertices = [
        vec4(turtle[turtle.length - 1]), //Starting point: the location of the turtle
        vec4((turtle[turtle.length - 1][0] + (len * (Math.cos(radians(direction))))), (turtle[turtle.length - 1][1] + (len * Math.sin(radians(direction)))), 0, 1.0)
    ];
    //The turtle's x and y values are added to based on a constant length and the direction
    //In this particular function, the turtle is not moved, but in the grammar, open bracket is always preceded by big F
    //turtle.push(vertices[1]);
    //Note that in two dimensions, z will always be 0

    for (var i = 0; i < vertices.length; i++)
    {
        pointsArray.push(vertices[i]);
    }
}

//Function that modifies the turtle, not working right yet:
function draw_closeBracket(turtle)
{
    turtle.pop();
    direction = 90;
    return turtle;
}

//CAREFUL here: The turtle can only be moved if preceded by 'F'
function draw_openBracket(turtle, pointsArray)
{
    turtle.push(pointsArray[pointsArray.length - 1]); //Adds the last point drawn to to the turtle.
    return turtle;
}

//Function that changes the direction by applying a positive rotation
function draw_plus(direction)
{
    if (direction < 180) {
        direction += 27.5;
    }
    return direction;
}

function draw_minus(direction)
{
    if (direction > 0) {
        direction -= 25.7;
    }
    return direction;
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//Next: Write the other functions that modify the turtle direction and move the turtle

// Dictionary that is mapped to the chars in the grammar
/*var dict = {
    'F':draw_F,
    //'f':f,
    '+': posRotateX,
    '-': negRotateX,
    /!*'&': posRotateY,
    '^': negRotateY,
    '/': negRotateZ,
    '\\': posRotateZ,
    '|': turn180,*!/
    '[': pushStack,
    ']': popStack,
};*/

// Focusing on only the functions implemented in the current grammar
/*
function f(len, direction)
{
    var vertices = [
        vec4(turtle[turtle.length - 1]), //Starting point: the location of the turtle
        vec4((turtle[turtle.length - 1][0] + (len * Math.round(Math.cos(radians(direction))))), (turtle[turtle.length - 1][1] + (len * Math.sin(radians(direction)))), 0, 1.0)
    ];
    //The turtle's x and y values are added to based on a constant length and the direction
    //In this particular function, the turtle is not moved
    //Note that in two dimensions, z will always be 0

    return vertices;
}
*/

// Should rotate the endpoint of the ray by xrot
function posRotateX(xrot)
{
    var vertices = [
        vec4(turtle[turtle.length - 1]), //Starting point: the location of the turtle
        vec4((turtle[turtle.length - 1][0] * (rotate(xrot,"x"))), (turtle[turtle.length - 1][1]), 0, 1.0)
    ];

    return vertices;
}
function negRotateX(xrot)
{
    var vertices = [
        vec4(turtle[turtle.length - 1]), //Starting point: the location of the turtle
        vec4((turtle[turtle.length - 1][0] * (rotate(-xrot,"x"))), (turtle[turtle.length - 1][1]), 0, 1.0)
    ];
}

/*function posRotateY(yrot)
{
    turtle.top = turtle.top.rotate(yrot,'y');
}
function negRotateY(yrot)
{
    turtle.top = turtle.top.rotate(-yrot,'y');
}
function turn180( axis = 'y')
{
    turtle.top = turtle.top.rotate(180,axis);
}*/
function pushStack(newturt)
{
    turtle.push(newturt);
}
function popStack()
{
    turtle.pop();
}
// Not really needed but I still made them
/*
function negRotateZ(zrot)
{
    turtle.top = turtle.top.rotate(-zrot,'z');
}
function posRotateZ(zrot)
{
    turtle.top = turtle.top.rotate(zrot,'z');
}
*/

// tree functions that prints the fractal tree design
const treeA = {
    params: {
        direction: 90,
        iteration: 3,
        len: .05, // around .01-.02 for smaller tree to fit on canvas
        pointsArray: [],
        turtle: [vec4(0, 0, 0, 1.0)]
    },
    axiom: "F",
    rules: {
        F: "F[+F]F[-F]F"
    },
    commands: {
        'F'( params, turtle, pointsArray ) {
            draw_F( params.len, params.direction, turtle, pointsArray );
        },
        '+'( params ) {
            params.direction = draw_plus( params.direction )
        },
        '-'( params ) {
            params.direction = draw_minus( params.direction )
        },
        '['( params, turtle ) {
            draw_openBracket(turtle);
        },
        ']'( params, turtle ) {
            draw_closeBracket(turtle);
        }

    }
}

// Iterate over each char in instruction string and call corresponding function
// draw the tree
function drawTrees( tree,grammar, turtle ) {
    // loop through the tree string
    for( const character of grammar ) {
        // if the character is in the tree commands
        if( tree.commands[character] ) {
            // execute the command
            tree.commands[character]( tree.params, turtle );
        }
    }
}
