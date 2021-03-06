//Javascript
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d"); // 캔버스에 그리기 위해 실질적으로 사용되는 도구인 2D rendering context


/**
lesson1
canvas 그림 그리기 beginPath~ closePath 사이에 모든 명령어가 들어감
ctx.beginPath(); //그림 시작
ctx.rect(20,40,50,50);// rect(x,y,width, height)
ctx.fillStyle = "#FF0000"; // 색칠할 색 지정
ctx.fill(); // 색칠
ctx.closePath(); //그림 끝(도형 하나 완성)
*/

var y = canvas.height-30; //화면 하단에
var x = canvas.width/2; //화면 중간에
// x, y의 움직임을 표현하기 위한 값
var dx = -2;
var dy = -2;
var color = ["red", "blue", "green", "#0095DD" ];
var ballRadius = 10;// 원의 반지름 값
var ballColor = "#0095DD";
//Bar의 속성
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2 ;

var rightPressed = false; //오른쪽 눌렸을 때
var leftPressed = false; //왼쪽 눌렸을 때
//벽돌  속성
var brickRowCount = 3; //벽돌 줄 수
var brickColumnCount = 5; //벽돌 칸 수
var brickWidth = 75; //벽돌의 넓이
var brickHeight = 10; //벽돌의 높이
var brickPadding = 10; //벽돌 사이의 간격
var brickOffsetTop = 30; //벽돌과 천장의 간격
var brickOffsetLeft = 30; //벽돌과 왼쪽 벽의 간격

function init(){
  y = canvas.height-30; //화면 하단에
  x = canvas.width/2; //화면 중간에
  // x, y의 움직임을 표현하기 위한 값
  dx = -2;
  dy = -2;

  ballRadius = 10;// 원의 반지름 값
  ballColor = "#0095DD";
  //Bar의 속성
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX = (canvas.width - paddleWidth)/2 ;

  rightPressed = false; //오른쪽 눌렸을 때
  leftPressed = false; //왼쪽 눌렸을 때
  //벽돌  속성
  brickRowCount = 3; //벽돌 줄 수
  brickColumnCount = 5; //벽돌 칸 수
  brickWidth = 75; //벽돌의 넓이
  brickHeight = 10; //벽돌의 높이
  brickPadding = 10; //벽돌 사이의 간격
  brickOffsetTop = 30; //벽돌과 천장의 간격
  brickOffsetLeft = 30; //벽돌과 왼쪽 벽의 간격
}


var brickStatus = 1; // 벽돌의 경도

//점수
var score = 0;
var brickOutPoint = 5;

//목숨
var lives = 3;
//스테이지
var stage = 1;

function drawState(){
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Stage : "+stage, (canvas.width-57)/2 , 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives : "+lives, canvas.width-65, 20);
}

function drawScore(){
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score : "+ score,8 , 20);
}


var bricks = []; //벽돌을 그리기 위한 배열
for( c = 0; c< brickColumnCount; c++ ){ //지정한 수의 칸 수만큼
bricks[c] = [];
for(  r =0; r< brickRowCount; r++){ // 지정한 수의 줄 수 만큼
  bricks[c][r] = { x: 0, y: 0, status: brickStatus }; //벽돌의 상태값을 1로 정해준다
}
}
function drawBricks(){
for( c = 0; c< brickColumnCount; c++ ){
  for(  r =0; r< brickRowCount; r++){
    if(bricks[c][r].status > 0) {
      var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft; //벽돌이 생성되는 x좌표
      var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop; //벽돌의 생성되는 y좌표
      //벽돌의 x,y좌표 지정
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;

      ctx.beginPath();
      ctx.rect(brickX,brickY, brickWidth, brickHeight);
      ctx.fillStyle =  "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}
}






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
/*
// 마우스는 나중에 다시 쓰게끔
document.addEventListener("mousemove",mouseMoveHandler, false);

function mouseMoveHandler(e){
var relativeX = e.clientX - canvas.offsetLeft; //뷰포트의 수평 마우스 위치 (e.clientX)
//relativeX : 캔바스의 왼쪽 가장자리와 마우스 포인터 사이의 거리와 같습니다
if(relativeX > 0 && relativeX < canvas.width){
  paddleX = relativeX - paddleWidth /2;
}
}
*/
function keyDownHandler(e){ //키보드 눌렀을 때
if(e.keyCode == 39){
  rightPressed = true; //오른쪽으로 쭉 상태 지속

}else if(e.keyCode == 37){
  leftPressed = true; //왼쪽 지속
}
}

function keyUpHandler(e){
if(e.keyCode == 39){
  rightPressed = false;

}else if(e.keyCode == 37){
  leftPressed = false;
}
}

function initBricks(stage){
  for( c= 0; c< brickColumnCount; c++){
    for( r=0; r < brickRowCount; r++){
        var b = bricks[c][r];
        b.status = stage;
    }
  }
}
function initPaddle(){

}

function initBall(){

}

function collisionDetection(){ //충돌 감지 기능
for( c= 0; c< brickColumnCount; c++){
  for( r=0; r < brickRowCount; r++){
    var b = bricks[c][r];
    /*
     코드의 가독성을 높이기 위해 충돌 탐지의 모든 루프에
    brick객체를 저장하기 위한 b변수 정의 b = 블록 각각의 객체
    */
    //calculations
    if(b.status > 0) {
      if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
        dy = - dy;
        b.status--;
        if(b.status == 0){
          score+=brickOutPoint;
          if(score == brickRowCount * brickColumnCount * brickOutPoint* stage){ //이렇게 하면 처음부터 0인 경우는 어떻게 하지
            alert("You Win! Your Score : "+score);

              stage++;
              init();
              initBricks(stage); //벽돌
            // draw(stage);
          }
        }
        changeBall();
      }
    }
  }
}
}


function drawPaddle(){
ctx.beginPath();
ctx.rect(paddleX, canvas.height- paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = ballColor;
ctx.fill();
ctx.closePath();
}

function drawball(){
ctx.beginPath();
ctx.arc(x,y,ballRadius,0,Math.PI * 2);
ctx.fillStyle = ballColor;
ctx.fill();
ctx.closePath();

}
function changeBall(){
  ballColor = color[Math.floor(Math.random() * 4) ];
}
function draw(stage){

//drawing code
ctx.clearRect(0, 0, canvas.width, canvas.height); // 전에 찍힌 draw 지워주기
drawScore(); // 점수 보여주는 함수
drawBricks(); //벽돌
drawPaddle(); // 패들
drawball(); //공
collisionDetection(); //벽돌 충돌 시 함수
drawLives();
drawState();
if(y + dy < ballRadius){ //바닥에 닿을 경우
  dy = - dy;
  changeBall(); //공 색깔 바꾸기
}else if(y + dy > canvas.height - ballRadius){ //천장에 닿을 경우
    if(x > paddleX && x < paddleX + paddleWidth) {//공이 패들에 닿았을 경우

      if(rightPressed){
        console.log("rightPressed"+rightPressed);
        dx++;
      }else if(leftPressed){
        console.log("leftPressed"+leftPressed);
        dx--;
      }
      console.log("dx : "+ dx + "dy : " + dy);
        dy = -dy;
        //여기서 공의 속도를 좀 더 다르게 해줘도 좋을듯
    }else { //공이 바닥에 닿았을 경우
      lives--;
      if(!lives){
        alert("Game Over! Your Score : "+score);
        document.location.reload();
      }else{
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
      }

    }
}

if(x + dx < ballRadius){ //왼쪽에 닿을 경우
  dx = - dx;
  changeBall();
}

if(x + dx > canvas.width- ballRadius){ //오른쪽에 닿을 경우
    dx = -dx;
    changeBall();
}
/*
//위의 코드 리팩토링
if(x + dx > canvas.width || x + dx < 0) {
  dx = -dx;
}

if(y + dy > canvas.height || y + dy < 0) {
  dy = -dy;
}
*/
//페달 이동 시
if(rightPressed && paddleX < canvas.width-paddleWidth) {
  paddleX += 7; //오른쪽 버튼 누를 경우 가는 칸
}else if(leftPressed && paddleX > 0) {
    paddleX -= 7; //왼쪽 버튼
}

x += dx;
y += dy;
//setInterval(draw, 10); // Javascript 타이밍 함수 = requestAnimationFrame()와 같은 종류, 무한히 작동함 10밀리초마다

requestAnimationFrame(draw);
}



draw(stage);
