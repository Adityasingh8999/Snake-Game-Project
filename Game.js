// Game Constants & Variables
let inputDir = {x:0,y:0};
const foodSound = new Audio('Music/food.mp3');
const gameOverSound = new Audio('Music/gameover.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:15, y:15}
]
let food = {x:5,y:5};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for(let i = 1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    } 
}

function gameEngine(){
    // Part 1:Updates the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over, Press any key to play again!");
        snakeArr = [{x:15,y:15}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        musicSound.play();
    }

    //Function to regenerate the food
    function generateFood() {
    let a = 1, b = 17; // To ensure food stays inside borders
    let newFood;
    let isOnSnake;

    do {
        isOnSnake = false;
        newFood = {
            x: Math.floor(Math.random() * (b - a + 1)) + a,
            y: Math.floor(Math.random() * (b - a + 1)) + a
        };

        // Check if food is on the snake
        for (let segment of snakeArr) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                isOnSnake = true;
                break;
            }
        }
    } while (isOnSnake);

    return newFood;
}


    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
           hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highscorebox.innerHTML = "High-Score: " +  hiscoreval ;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = generateFood();
        if (snakeArr.length === 324) {
            alert("🎉 Congratulations! You won the game!");
            inputDir = {x:0, y:0};
            musicSound.pause();
            return;
        }

    }

    // Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2:Display the snake & food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
};

// Main logic
musicSound.play();
let highscore = localStorage.getItem("hiscore");
if(highscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High-Score: " +  highscore ;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
        case "w":
        case "W":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1  ;
            break;
        
        case "ArrowDown":
        case "s":
        case "S":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case "ArrowLeft":
        case "a":
        case "A":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
        case "d":
        case "D":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        default:
            break;
    }
});
