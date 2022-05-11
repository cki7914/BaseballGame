// 변수 지정
let nowTurn;
let count_ball = 0;
let count_strike = 0;
let count_out = 0;
let count_turn = 1;
let score_computer = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let score_player = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let bases = [0 , 0 , 0 , 0];

let button_1 = document.querySelector("#button_1");
let button_2 = document.querySelector("#button_2");
let resultDisplay_1 = document.querySelector("#resultDisplay_1");
let resultDisplay_2 = document.querySelector("#resultDisplay_2");

button_1.addEventListener("click" , gameStarter);

// 게임 시작
function gameStarter(){
    nowTurn = "computer";
    count_ball = 0;
    count_strike = 0;
    count_out = 0;
    count_turn = 1;
    score_computer = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    score_player = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    bases = [0 , 0 , 0 , 0];

    button_1.removeEventListener("click" , gameStarter);

    resultDisplay_1.innerHTML = "게임을 시작합니다!";
    resultDisplay_2.innerHTML = "잠시만 기다려주세요.";

    setTimeout(function(){
        resultPrinter();
        processer_game();
    } , 2000);
}

// 공수 변경
function turnChanger(){
    if(nowTurn == "computer"){
        nowTurn = "player";

        resultDisplay_1.innerHTML = count_turn + "회 말"
        resultDisplay_2.innerHTML = ""
    }
    if(nowTurn == "player"){
        nowTurn = "computer";
        count_turn++;

        resultDisplay_1.innerHTML = count_turn + "회 초"
        resultDisplay_2.innerHTML = ""
    }

    setTimeout(function(){
        processer_game();
    } , 2000);
}

// 게임 진행
function processer_game(){
    if(nowTurn == "computer"){
        resultDisplay_1.innerHTML = "COMPUTER의 공격입니다.";
        resultDisplay_2.innerHTML = "행동을 선택하세요.";

        button_1.innerHTML = "직구";
        button_2.innerHTML = "커브";
        button_1.addEventListener("click" , function(){
            processer_swing();
        });
    }
    if(nowTurn == "player"){
        resultDisplay_1.innerHTML = "PLAYER의 공격입니다.";
        resultDisplay_2.innerHTML = "COMPUTER가 행동을 결정하는 중입니다.";
    }
}

// 현재 상황 출력
function resultPrinter(){
    // 볼 카운트 출력
    let result_ball
    switch(count_ball){
        case 0 :
            result_ball = "○○○";
            break;
        case 1 :
            result_ball = "●○○";
            break;
        case 2 :
            result_ball = "●●○";
            break;
        case 3 :
            result_ball = "●●●";
            break;
    }
    document.querySelector("#countBoard_ballCount").innerHTML = result_ball;
    
    // 스트라이크 카운트 출력
    let result_strike
    switch(count_strike){
        case 0 :
            result_strike = "○○";
            break;
        case 1 :
            result_strike = "●○";
            break;
        case 2 :
            result_strike = "●●";
            break;
    }
    document.querySelector("#countBoard_strikeCount").innerHTML = result_strike;
    
    // 아웃 카운트 출력
    let result_out
    switch(count_out){
        case 0 :
            result_out = "○○";
            break;
        case 1 :
            result_out = "●○";
            break;
        case 2 :
            result_out = "●●";
            break;
    }
    document.querySelector("#countBoard_outCount").innerHTML = result_out;

    // 이닝 출력
    let scoreBoard_inning = document.querySelector("#scoreBoard_inning");
    for(i = 1; i <= 10; i++){
        scoreBoard_inning.children[i].style.color = "#ddd";
        scoreBoard_inning.children[i].style.backgroundColor = "";
    }
    scoreBoard_inning.children[count_turn].style.color = "#222";
    scoreBoard_inning.children[count_turn].style.backgroundColor = "yellow";

    // 점수 출력
    let sum_comScore = 0;
    let sum_playerScore = 0;

    let scoreBoard_comScore = document.querySelector("#scoreBoard_comScore");
    let scoreBoard_playerScore = document.querySelector("#scoreBoard_plyaerScore");
    
    if(nowTurn == "computer"){
        for(i = 1; i <= count_turn; i++){
            scoreBoard_comScore.children[i].innerHTML = score_computer[i - 1];
            sum_comScore += score_computer[i - 1];
        }
        scoreBoard_comScore.children[10].innerHTML = sum_comScore;
    } else if(nowTurn == "player"){
        for(i = 1; i <= count_turn; i++){
            scoreBoard_playerScore.children[i].innerHTML = score_player[i - 1];
            sum_plyaerScore += score_player[i - 1];
        }
        scoreBoard_playerScore.children[10].innerHTML = sum_playerScore;
    }

    // 주자 표시
    for(i = 0; i <= 2; i++){
        if(bases[i] == 0){
            document.querySelectorAll(".base")[i].style.backgroundColor = "bisque";
        } else if(bases[i] == 1){
            document.querySelectorAll(".base")[i].style.backgroundColor = "blue";
        }
    }
}