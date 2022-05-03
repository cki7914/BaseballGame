let isTurn , count_turn , count_strike , count_ball , count_out;
let button_1 = document.querySelector("#button_1");
let button_2 = document.querySelector("#button_2");
let resultDisplay_1 = document.querySelector("#resultDisplay_1");
let resultDisplay_2 = document.querySelector("#resultDisplay_2");
let countBoard_ballCount = document.querySelector("#countBoard_ballCount");
let countBoard_strikeCount = document.querySelector("#countBoard_strikeCount");
let countBoard_outCount = document.querySelector("#countBoard_outCount");

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
    document.querySelector("#scoreBoard_inning").children[count_turn];
}