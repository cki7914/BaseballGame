let isTurn , throwing_result;
let count_turn = 0;
let count_strike = 0;
let count_ball = 0;
let count_out = 0;
let comScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let playerScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
let bases = [0 , 0 , 0 , 0];

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

// 게임 시작시 초기세팅
function gameStarter(){
    button_1.removeEventListener("click" , gameStarter);
    button_1.disabled = true;
    button_2.disabled = true;
    resultDisplay_1.innerHTML = "게임을 시작합니다!";
    resultDisplay_2.innerHTML = "잠깐만 기다려주세요.";

    setTimeout(function(){
        gameReseter();
        turnChanger();
        resultDisplayPrinter();
    } , 2000);
}

// 게임 데이터 초기화
function gameReseter(){
    isTurn = "player";
    count_turn = 1;
    count_strike = 0;
    count_ball = 0;
    count_out = 0;
    comScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    playerScore = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    bases = [0 , 0 , 0 , 0];
}

// 공/수 전환시 세팅
function turnChanger(){
    if(isTurn == "com"){
        isTurn = "player";
        resultDisplay_1.innerHTML = count_turn + "회 말";
        resultDisplay_2.innerHTML = "PLAYER의 공격입니다.";
        setTimeout(throwing_com , 2000);
    } else if(isTurn == "player"){
        count_turn++;
        isTurn = "com";
        resultDisplay_1.innerHTML = count_turn + "회 초";
        resultDisplay_2.innerHTML = "COMPUTER의 공격입니다.";
        setTimeout(throwing_player , 2000);
    }
}

// 컴퓨터가 던질 공을 결정
function throwing_com(){
    let rndNum = Math.floor(Math.random() * 2);
    if(rndNum == 0){
        throwing_result = "직구";
        resultDisplay_1.innerHTML = "COMPUTER의 직구!";
        resultDisplay_2.innerHTML = "행동을 선택하세요";
    } else if(rndNum == 1){
        throwing_result = "커브";
        resultDisplay_1.innerHTML = "COMPUTER의 커브볼!";
        resultDisplay_2.innerHTML = "행동을 선택하세요";
    }
    button_1.innerHTML = "스윙";
    button_1.addEventListener("click" , );
    button_2.innerHTML = "흘리기";
    button_2.addEventListener("click" , );
}

// 플레이어가 던질 공 선택
function throwing_player(){
    button_1.disabled = false;
    button_2.disabled = false;
    resultDisplay_2.innerHTML = "행동을 선택하세요";
    button_1.innerHTML = "직구";
    button_1.addEventListener("click" , function(){
        resultDisplay_1.innerHTML = "Player의 직구!"
        resultDisplay_2.innerHTML = "COMPUTER가 행동을 결정하고있습니다."
        throwing_result = "직구";
        button_1.disabled = true;
        button_2.disabled = true;
        setTimeout(swing_com , 2000);
    });
    button_2.innerHTML = "커브";
    button_2.addEventListener("click" , function(){
        resultDisplay_1.innerHTML = "Player의 커브!"
        resultDisplay_2.innerHTML = "COMPUTER가 행동을 결정하고있습니다."
        throwing_result = "커브";
        button_1.disabled = true;
        button_2.disabled = true;
        setTimeout(swing_com , 2000);
    });
}

// 컴퓨터의 스윙/흘리기 선택
function swing_com(){
    let rndNum = Math.floor(Math.random() * 2);
    if(rndNum == 0){
        resultDisplay_1.innerHTML = "COMPUTER의 스윙!"
        resultDisplay_2.innerHTML = "..."
        setTimeout(process_swing , 2000);
    } else if(rndNum == 1){
        resultDisplay_1.innerHTML = "COMPUTER가 공을 흘립니다"
        resultDisplay_2.innerHTML = "..."
    }

}

// 스윙시 결과
function process_swing(){
    let rndNum1 = Math.ceil(Math.random() * 100);
    if(throwing_result == "직구"){
        if(rndNum1 >= 1 && rndNum1 <= 60){
            let rndNum2 = Math.ceil(Math.random() * 100);
            if(rndNum2 >= 1 && rndNum2 <= 35){
                resultDisplay_2.innerHTML = "플라이 아웃입니다.";
                setTimeout(process_out , 2000);
            } else if(rndNum2 >= 36 && rndNum2 <= 85){
                resultDisplay_2.innerHTML = "안타입니다!";
                setTimeout(process_goBase , 2000);
            } else if(rndNum2 >= 86 && rndNum2 <= 95){
                resultDisplay_2.innerHTML = "2루타입니다!";
                setTimeout(process_goBase2 , 2000);
            } else if(rndNum2 >= 96 && rndNum2 <= 100){
                resultDisplay_2.innerHTML = "홈런! 홈런입니다!";
                setTimeout(process_homerun , 2000);
            }
        } else if(rndNum1 >= 61 && rndNum1 <= 100){
            resultDisplay_2.innerHTML = "헛스윙! 스트라이크입니다.";
            setTimeout(process_strike , 2000);
        }
    } else if(throwing_result == "커브"){
        if(rndNum1 >= 1 && rndNum1 <= 20){
            let rndNum2 = Math.ceil(Math.random() * 100);
            if(rndNum2 >= 1 && rndNum2 <= 65){
                resultDisplay_2.innerHTML = "플라이 아웃입니다.";
                setTimeout(process_out , 2000);
            } else if(rndNum2 >= 66 && rndNum2 <= 90){
                resultDisplay_2.innerHTML = "안타입니다!";
                setTimeout(process_goBase , 2000);
            } else if(rndNum2 >= 91 && rndNum2 <= 99){
                resultDisplay_2.innerHTML = "2루타입니다.";
                setTimeout(process_goBase2 , 2000);
            } else if(rndNum2 >= 100 && rndNum2 <= 100){
                resultDisplay_2.innerHTML = "홈런! 홈런입니다!";
                setTimeout(process_homerun , 2000);
            }
        } else if(rndNum1 >= 21 && rndNum1 <= 100){
            resultDisplay_2.innerHTML = "헛스윙! 스트라이크입니다.";
            setTimeout(process_strike , 2000);
        }
    }
}

// 흘리기 결과
function process_noSwing(){
    let rndNum = Math.ceil(Math.random() * 10);
    if(throwing_result == "직구"){
        if(rndNum >= 1 && rndNum <= 9){
            resultDisplay_2.innerHTML = "스트라이크!";
            setTimeout(process_strike , 2000);
        } else if(rndNum == 10){
            resultDisplay_2.innerHTML = "볼!";
            setTimeout(process_ball , 2000);
        }
    } else if(throwing_result == "커브"){
        if(rndNum >= 1 && rndNum <= 2){
            resultDisplay_2.innerHTML = "스트라이크!";
            setTimeout(process_strike , 2000);
        } else if(rndNum >= 3 && rndNum <= 10){
            resultDisplay_2.innerHTML = "볼!";
            setTimeout(process_ball , 2000);
        }
    }
}

// 아웃 처리
function process_out(){
    count_out++;
    if(count_out == 3){
        count_strike = 0;
        count_ball = 0;
        count_out = 0;
        setTimeout(function(){
            resultDisplayPrinter;
            turnChanger;
        } , 2000);
        return;
    }
    resultDisplayPrinter();
    if(isTurn = "com"){
        setTimeout(throwing_player , 2000);
    } else if(isTurn = "player"){
        setTimeout(throwing_com , 2000);
    }
}

// 안타(진루) 처리
function process_goBase(){
    for(i = 0; i < bases.length; i++){
        if(bases[i] == 0){
            bases[i] = 1;
        }
    }
    if(bases[4] = 1){
        if(isTurn = "com"){
            comScore[count_turn]++;
        } else if(isTurn = "player"){
            playerScore[count_turn]++;
        }
        bases[4] = 0;
    }

    resultDisplayPrinter();
    if(isTurn = "com"){
        setTimeout(throwing_player , 2000);
    } else if(isTurn = "player"){
        setTimeout(throwing_com , 2000);
    }
}

// 아웃 처리
function process_out(){
    count_out++;
    if(count_out == 3){
        count_strike = 0;
        count_ball = 0;
        count_out = 0;
        setTimeout(function(){
            resultDisplayPrinter;
            turnChanger;
        } , 2000);
        return;
    }
    resultDisplayPrinter();
    if(isTurn = "com"){
        setTimeout(throwing_player , 2000);
    } else if(isTurn = "player"){
        setTimeout(throwing_com , 2000);
    }
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
    for(i = 1; i <= 2; i++){
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
    if(isTurn == "com"){
        for(i = 1; i <= count_turn; i++){
            scoreBoard_comScore.children[i].innerHTML = comScore[i - 1];
            sum_comScore += comScore[i - 1];
        }
        scoreBoard_comScore.children[10].innerHTML = sum_comScore;
    } else if(isTurn == "player"){
        for(i = 1; i <= count_turn; i++){
            scoreBoard_playerScore.children[i].innerHTML = playerScore[i - 1];
            sum_plyaerScore += plyaerScore[i - 1];
        }
        scoreBoard_playerScore.children[10].innerHTML = sum_playerScore;
    }

    // 주자 표시
    for(i = 0; i < bases.length; i++){
        if(bases[i] == 0){
            document.querySelectorAll(".base")[i].style.backgroundColor = "bisque";
        } else if(bases[i] == 1){
            document.querySelectorAll(".base")[i].style.backgroundColor = "blue";
        }
    }
}