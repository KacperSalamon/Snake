const canvas = document.getElementById("snake");
const Context = canvas.getContext("2d");
const Button = document.querySelector(".button");



class PartOfSnake  {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
};

let Tile = 22.2;
let SizeTile = canvas.width / Tile - 2;
let X = 10;
let Y = 10;

let Xspeed = 0;
let Yspeed = 0;

let Xapple = 5;
let Yapple = 5;

const SnakeParts = [];

let Tail = 3;

let score = 0;

const Game = () =>{
    ChangePosition();
    let Results = GameOver();
    if(Results){
        return;
    }
    Clearing();
    Collision();
    //RestartGame();
    Apple();
    Snake();
    Score();
    setTimeout(Game, 1000/10);

};

const GameOver = () =>{
    let overgame = false;

    if(Xspeed === 0 && Yspeed === 0){
        return false;

    }

    if(X<0){
        overgame = true;
    } 

    if(X>=Tile){
        overgame = true;
    }
    else if(Y<0){
        overgame = true;

    }
    else if(Y>=Tile){
        overgame = true;
    }

    for(let i =0; i<SnakeParts.length; i++){
        let Section = SnakeParts[i];
        if(Section.x === X && Section.y === Y){
            overgame = true;
            break;
        }

    };

    if(overgame){
        Context.fillStyle = "darkgoldenrod";
        Context.font = "40px Roboto";
        Context.fillText("Przegrywasz", canvas.width/3.5, canvas.height/2);
        alert("Przykro mi byku, rozjebałeś się jak śliwka w kompocie");
        
       
        

    };
    
    return overgame;


};

const Score = () =>{
    Context.fillStyle = "white";
    Context.font = "20px Roboto";
    Context.fillText("Score: " + score, canvas.width - 80 ,20);

};

const Clearing = () =>{
    Context.fillStyle = 'black';
    Context.fillRect(0,0,canvas.width,canvas.height);

};

const Snake = () =>{
   

    Context.fillStyle = "blue";
    for(let i=0; i<SnakeParts.length; i++){
        let Section = SnakeParts[i];
        Context.fillRect(Section.x*Tile, Section.y*Tile, SizeTile, SizeTile);
    }

    SnakeParts.push(new PartOfSnake(X,Y));
    if(SnakeParts.length>Tail){
        SnakeParts.shift();
    }

    Context.fillStyle = 'yellow';
    Context.fillRect(X * Tile, Y * Tile, SizeTile, SizeTile);

};

function Apple(){
    Context.fillStyle = "red";
    Context.fillRect(Xapple * Tile, Yapple * Tile, SizeTile, SizeTile);
};

function Collision(){
    if(Xapple === X && Yapple === Y){
        Xapple = Math.floor(Math.random()*Tile);
        Yapple = Math.floor(Math.random()*Tile);
        Tail++;
        score++;
    }
};

const ChangePosition = () =>{
    X = X + Xspeed;
    Y = Y + Yspeed;

};

document.body.addEventListener("keydown", KeyDown);

function KeyDown(event){

    if(event.key == "ArrowUp" || event.key == "w"){
        if(Y == 1) return;
        Xspeed = 0;
        Yspeed = -1;

    };
    if(event.key == "ArrowDown" || event.key == "s"){
        if(Y == -1) return;
        Xspeed = 0;
        Yspeed = 1;

    };
    if(event.key == "ArrowLeft" || event.key == "a"){
        if(X == 1) return;
        Xspeed = -1;
        Yspeed = 0;

    };
    if(event.key == "ArrowRight" || event.key == "d"){
        if(X == -1) return;
        Xspeed = 1;
        Yspeed = 0;

    };

}; 

//const ButtonClick = () =>{
    //RestartGame();


//};
//Button.addEventListener("click", ButtonClick);

Game();