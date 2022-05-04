let isTurn , count_turn , count_strike , count_ball , count_out;
let comScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let playerScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let bases = [0 , 0 , 0];

let button_1 = document.querySelector("#button_1");
let button_2 = document.querySelector("#button_2");
let resultDisplay_1 = document.querySelector("#resultDisplay_1");
let resultDisplay_2 = document.querySelector("#resultDisplay_2");
let countBoard_ballCount = document.querySelector("#countBoard_ballCount");
let countBoard_strikeCount = document.querySelector("#countBoard_strikeCount");
let countBoard_outCount = document.querySelector("#countBoard_outCount");
let scoreBoard_comScore = document.querySelector("#scoreBoard_comScore");
let scoreBoard_playerScore = document.querySelector("#scoreBoard_playerScore");

button_1.addEventListener("click" , gameStarter);

function gameStarter(){
    resultDisplay_1.innerHTML = "게임을 시작합니다!";
    resultDisplay_2.innerHTML = "잠깐만 기다려주세요.";

    setTimeout(function(){
        isTurn = "com";
        count_turn = 1;
        count_strike = 0;
        count_ball = 0;
        count_out = 0;

        resultDisplayPrinter();
    } , 2000);
}

// 각종 결과를 화면에 출력하는 함수
function resultDisplayPrinter(){
    // 볼 카운터 출력값을 결정
    let str_ball = ""
    for(i = 1; i <= 3; i++){
        if(i <= count_ball){
            str_ball += "●"
        } else {
            str_ball += "○"
        }
    }
    // 스트라이크 카운터 출력값을 결정
    let str_strike = ""
    for(i = 1; i <= 2; i++){
        if(i <= count_strike){
            str_strike += "●"
        } else {
            str_strike += "○"
        }
    }
    // 아웃 카운터 출력값을 결정
    let str_out = ""
    for(i = 1; i <= 3; i++){
        if(i <= count_out){
            str_out += "●"
        } else {
            str_out += "○"
        }
    }
    // 볼, 스트라이크, 아웃 카운터 출력
    countBoard_ballCount.innerHTML = str_ball;
    countBoard_strikeCount.innerHTML = str_strike;
    countBoard_outCount.innerHTML = str_out;

    // 현재 이닝 출력
    let scoreBoard_inning = document.querySelector("#scoreBoard_inning");
    for(i = 0; i < scoreBoard_inning.children.length; i++){
        scoreBoard_inning.children[i].style.backgroundColor = "";
    }
    scoreBoard_inning.children[count_turn].style.color = "#222";
    scoreBoard_inning.children[count_turn].style.backgroundColor = "yellow";

    // 점수 출력
    let sum_comScore = 0;
    let sum_playerScore = 0;
    for(i = 1; i <= count_turn; i++){
        scoreBoard_comScore.children[i].innerHTML = comScore[i - 1];
        scoreBoard_playerScore.children[i].innerHTML = playerScore[i - 1];
    }
    for(i = 0; i < 9; i++){
        sum_comScore += comScore[i];
        sum_playerScore += playerScore[i];
    }
    scoreBoard_comScore.children[10].innerHTML = sum_comScore;
    scoreBoard_playerScore.children[10].innerHTML = sum_playerScore;

    // 주자 표시
    for(i = 0; i < bases.length; i++){
        if(bases[i] == 0){
            document.querySelectorAll(".base")[i].style.backgroundColor = "bisque";
        } else if(bases[i] == 1){
            document.querySelectorAll(".base")[i].style.backgroundColor = "blue";
        }
    }
}