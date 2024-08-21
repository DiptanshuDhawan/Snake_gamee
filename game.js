const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Screen Size
const width = canvas.width;
const height = canvas.height;

// Colors
const white = '#FFFFFF';
const red = '#FF0000';
const black = '#000000';
const blue = '#0000FF';

// Game Variables
let exit_game = false;
let snake_x = 50;
let snake_y = 100;
let velocity_x = 0;
let velocity_y = 0;
let init_velocity = 10;
let snake_size = 20;
let food_x = Math.floor(Math.random() * (width - snake_size));
let food_y = Math.floor(Math.random() * (height - snake_size));
let score = 0;
let fps = 30;

let snk_list = [];
let snk_length = 1;

// Draw text on screen
function textScreen(text, color, x, y) {
    ctx.fillStyle = color;
    ctx.font = '30px Arial';
    ctx.fillText(text, x, y);
}

// Draw the snake on the screen
function plotSnake(snk_list, snake_size) {
    ctx.fillStyle = black;
    snk_list.forEach(([x, y]) => {
        ctx.fillRect(x, y, snake_size, snake_size);
    });
}

// Game Loop
function gameLoop() {
    if (exit_game) {
        return;
    }

    snake_x += velocity_x;
    snake_y += velocity_y;

    // Check if snake has collided with food
    if (Math.abs(snake_x - food_x) < snake_size && Math.abs(snake_y - food_y) < snake_size) {
        score += 10;
        food_x = Math.floor(Math.random() * (width - snake_size));
        food_y = Math.floor(Math.random() * (height - snake_size));
        snk_length += 5;
    }

    // Clear the screen
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, width, height);

    // Display score
    textScreen('Score: ' + score, blue, 5, 30);

    // Update snake's body
    const head = [snake_x, snake_y];
    snk_list.push(head);
    if (snk_list.length > snk_length) {
        snk_list.shift();
    }

    // Draw the food
    ctx.fillStyle = red;
    ctx.fillRect(food_x, food_y, snake_size, snake_size);

    // Draw the snake
    plotSnake(snk_list, snake_size);

    setTimeout(gameLoop, 1000 / fps);
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            velocity_x = init_velocity;
            velocity_y = 0;
            break;
        case 'ArrowLeft':
            velocity_x = -init_velocity;
            velocity_y = 0;
            break;
        case 'ArrowUp':
            velocity_y = -init_velocity;
            velocity_x = 0;
            break;
        case 'ArrowDown':
            velocity_y = init_velocity;
            velocity_x = 0;
            break;
    }
});

// Start the game loop
gameLoop();
