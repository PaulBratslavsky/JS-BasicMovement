/******************************************************
    VARIABLES
******************************************************/
let context, controller, rectangle, loop;

context = document.querySelector('canvas').getContext('2d');

let screenHeight = context.canvas.height = 480;
let screenWidth = context.canvas.width = 720;

let bottom = 128;

// Shape
rectangle = {
    size: 32,
    jumping: true,
    x: 144,
    x_velocity: 0,
    y: 0,
    y_velocity: 0,
}

// Key Input
controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function(event) {
        let key_state = (event.type === 'keydown') ? true : false ;

        switch (event.keyCode) {    
            case 37: 
                controller.left = key_state;
                console.log('left');
                break;
            case 38:
            case 32:    
                controller.up = key_state;
                console.log('up');
                break;
            case 39: 
                controller.right = key_state;
                console.log('right');
                break;
            default:
                console.log('Key not taged' + event.keyCode );
        }
    }
}

loop = function() {
    if ( controller.up && rectangle.jumping === false ) {
        rectangle.y_velocity -= 20;
        rectangle.jumping = true;
    }

    if ( controller.left ) {
        rectangle.x_velocity -= 0.5;
    }

    if ( controller.right ) {
        rectangle.x_velocity += 0.5;
    }

    rectangle.y_velocity += 1.5; // Gravity
    rectangle.x += rectangle.x_velocity;
    rectangle.y += rectangle.y_velocity;
    rectangle.x_velocity *= 0.9; // Fricition
    rectangle.y_velocity *= 0.9 // Fricition
    
    // Collission Floor
    if ( rectangle.y > screenHeight - bottom - rectangle.size) {
        rectangle.jumping = false;
        rectangle.y = screenHeight - bottom - rectangle.size;
        rectangle.y_velocity = 0; 
    }

    // Collission Walls
    if (rectangle.x < -32) {
        rectangle.x = screenWidth; 
    } else if (rectangle.x > screenWidth) {
        rectangle.x = -32;
    }

    context.fillStyle= "#f0f0f0";
    context.fillRect(0,0,screenWidth,screenHeight);
    context.fillStyle='#ff0000';
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.size, rectangle.size);
    context.fill();
    context.strokeStyle = '202830';
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0,screenHeight - bottom);
    context.lineTo(screenWidth, screenHeight - bottom);
    context.stroke();

    // Call update
    window.requestAnimationFrame(loop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.requestAnimationFrame(loop);