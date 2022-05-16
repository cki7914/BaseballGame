// 변수 지정
let nowTurn , result_throw , result_swing , sum_comScore , sum_playerScore;
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
let logDisplay = document.querySelector("#logDisplay_buttom");

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

    button_1.disabled = true;
    button_2.disabled = true;

    resultDisplay_1.innerHTML = "게임을 시작합니다!";
    resultDisplay_2.innerHTML = "잠시만 기다려주세요.";

    processer_log("게임을 시작합니다!");

    setTimeout(function(){
        resultPrinter();
        processer_game();
    } , 2000);
}

// 공수 변경
function turnChanger(){
    count_ball = 0;
    count_strike = 0;
    count_out = 0;
    bases = [0 , 0 , 0 , 0];

    if(nowTurn == "computer"){
        nowTurn = "player";

        resultDisplay_1.innerHTML = count_turn + "회 말";
        resultDisplay_2.innerHTML = ""
    } else if(nowTurn == "player"){
        nowTurn = "computer";
        count_turn++;

        resultDisplay_1.innerHTML = count_turn + "회 초";
        resultDisplay_2.innerHTML = ""
    }

    if(count_turn < 10){
        setTimeout(function(){
            processer_game();
        } , 2000);
    } else if(count_turn == 10){
        if(sum_comScore > sum_playerScore){
            resultDisplay_1 = "COMPUTER의 승리!";
            resultDisplay_2 = "다시 도전해보세요.";
        } else if(sum_comScore < sum_playerScore){
            resultDisplay_1 = "PLAYER의 승리!";
            resultDisplay_2 = "축하합니다!";
        } else if(sum_comScore == sum_playerScore){
            resultDisplay_1 = "무승부입니다.";
            resultDisplay_2 = "다시 도전해보세요.";
        }

        button_1.innerHTML = "게임 시작"
        button_2.innerHTML = "초기화"
        
        button_1.addEventListener("click" , gameStarter);
    }
}

// 게임 진행
function processer_game(){
    button_1.disabled = false;
    button_2.disabled = false;

    if(nowTurn == "computer"){
        resultDisplay_1.innerHTML = "COMPUTER의 공격입니다.";
        resultDisplay_2.innerHTML = "행동을 선택하세요.";

        button_1.innerHTML = "직구";
        button_1.addEventListener("click" , result_throw_fastball);

        button_2.innerHTML = "커브";
        button_2.addEventListener("click" , result_throw_curve);
    }
    if(nowTurn == "player"){
        resultDisplay_1.innerHTML = "PLAYER의 공격입니다.";
        resultDisplay_2.innerHTML = "COMPUTER가 행동을 결정하는 중입니다.";

        button_1.innerHTML = "스윙";
        button_1.addEventListener("click" , result_swing_swing);

        button_2.innerHTML = "흘리기";
        button_2.addEventListener("click" , result_swing_noswing);
    }
}

// 플레이어가 직구 선택시
function result_throw_fastball(){
    resultDisplay_1.innerHTML = "PLAYER의 직구!";
    resultDisplay_2.innerHTML = "COMPUTER가 행동을 선택하고있습니다.";

    result_throw = "fastball";

    button_1.disabled = true;
    button_2.disabled = true;

    button_1.removeEventListener("click" , result_throw_fastball);
    button_2.removeEventListener("click" , result_throw_curve);

    setTimeout(computerSelect_swing , 2000);
}

// 플레이어가 커브 선택시
function result_throw_curve(){
    resultDisplay_1.innerHTML = "PLAYER의 커브!";
    resultDisplay_2.innerHTML = "COMPUTER가 행동을 선택하고있습니다.";

    result_throw = "curve";

    button_1.disabled = true;
    button_2.disabled = true;

    button_1.removeEventListener("click" , result_throw_fastball);
    button_2.removeEventListener("click" , result_throw_curve);

    setTimeout(computerSelect_swing() , 2000);
}

// 플레이어가 스윙 선택시
function result_swing_swing(){
    result_swing = "swing";

    button_1.disabled = true;
    button_2.disabled = true;

    button_1.removeEventListener("click" , result_swing_swing);
    button_2.removeEventListener("click" , result_swing_noswing);

    setTimeout(processer_swing() , 2000);
}

// 플레이어가 흘리기 선택시
function result_swing_noswing(){
    result_swing = "noswing";

    button_1.disabled = true;
    button_2.disabled = true;

    button_1.removeEventListener("click" , result_swing_swing);
    button_2.removeEventListener("click" , result_swing_noswing);

    setTimeout(processer_swing() , 2000);
}

// 컴퓨터의 스윙/흘리기 결정
function computerSelect_swing(){
    let rndNum = Math.ceil(Math.random() * 100);

    if(result_throw == "fastball"){
        if(rndNum <= 80){
            resultDisplay_1.innerHTML = "COMPUTER의 스윙!";
            resultDisplay_2.innerHTML = "...";

            setTimeout(processer_swing , 2000);
        }
        if(rndNum >= 81){
            resultDisplay_1.innerHTML = "COMPUTER가 공을 흘립니다.";
            resultDisplay_2.innerHTML = "...";

            setTimeout(processer_noswing , 2000);
        }
    }
    if(result_throw == "curve"){
        if(rndNum <= 30){
            resultDisplay_1.innerHTML = "COMPUTER의 스윙!";
            resultDisplay_2.innerHTML = "...";

            setTimeout(processer_swing , 2000);
        }
        if(rndNum >= 31){
            resultDisplay_1.innerHTML = "COMPUTER가 공을 흘립니다.";
            resultDisplay_2.innerHTML = "...";

            setTimeout(processer_noswing , 2000);
        }
    }
}

// 스윙시
function processer_swing(){
    let rndNum_1 = Math.ceil(Math.random() * 100);

    if(result_throw == "fastball"){
        if(rndNum_1 <= 60){
            let rndNum_2 = Math.ceil(Math.random() * 100);
            if(rndNum_2 <= 35){
                resultDisplay_2.innerHTML = "플라이 아웃!";

                setTimeout(processer_out() , 2000);
            } else if(rndNum_2 <= 85){
                resultDisplay_2.innerHTML = "안타!";

                setTimeout(processer_goBase() , 2000);
            } else if(rndNum_2 <= 95){
                resultDisplay_2.innerHTML = "2루타!";

                setTimeout(processer_goBase2() , 2000);
            } else if(rndNum_2 <= 100){
                resultDisplay_2.innerHTML = "홈런! 홈런입니다!";

                setTimeout(processer_homerun() , 2000);
            }
        }
        if(rndNum_1 >= 61){
            resultDisplay_2.innerHTML = "스트라이크!";

            setTimeout(processer_strike() , 2000);
        }
    }
    if(result_throw == "curve"){
        if(rndNum_1 <= 20){
            let rndNum_2 = Math.ceil(Math.random() * 100);
            if(rndNum_2 <= 65){
                resultDisplay_2.innerHTML = "플라이 아웃!";

                setTimeout(processer_out() , 2000);
            } else if(rndNum_2 <= 90){
                resultDisplay_2.innerHTML = "안타!";

                setTimeout(processer_goBase() , 2000);
            } else if(rndNum_2 <= 99){
                resultDisplay_2.innerHTML = "2루타!";

                setTimeout(processer_goBase2() , 2000);
            } else if(rndNum_2 <= 100){
                resultDisplay_2.innerHTML = "홈런! 홈런입니다!";

                setTimeout(processer_homerun() , 2000);
            }
        }
        if(rndNum_1 >= 21){
            resultDisplay_2.innerHTML = "스트라이크!";

            setTimeout(processer_strike() , 2000);
        }
    }
}

// 흘리기
function processer_noswing(){
    let rndNum = Math.ceil(Math.random() * 100);

    if(result_throw == "fastball"){
        if(rndNum <= 90){
            resultDisplay_2.innerHTML = "스트라이크!";

            setTimeout(processer_strike() , 2000);
        }
        if(rndNum >= 91){
            resultDisplay_2.innerHTML = "볼!";

            setTimeout(processer_ball() , 2000);
        }
    }
    if(result_throw == "curve"){
        if(rndNum <= 20){
            resultDisplay_2.innerHTML = "스트라이크!";

            setTimeout(processer_strike() , 2000);
        }
        if(rndNum >= 21){
            resultDisplay_2.innerHTML = "볼!";

            setTimeout(processer_ball() , 2000);
        }
    }
}

// 아웃 처리
function processer_out(){
    count_out++
    count_ball = 0;
    count_strike = 0;

    if(count_out != 3){
        setTimeout(function(){
            resultPrinter();
            processer_game();
        } , 2000);
    } else if(count_out == 3){
        if(nowTurn == "computer"){
            setTimeout(function(){
                resultDisplay_1.innerHTML = "COMPUTER의 삼진아웃!"
                resultDisplay_2.innerHTML = "공수교대"
            } , 2000);
        }
        if(nowTurn == "player"){
            setTimeout(function(){
                resultDisplay_1.innerHTML = "PLAYER의 삼진아웃!"
                resultDisplay_2.innerHTML = "공수교대"
            } , 2000);
        }

        count_out = 0;
        
        setTimeout(function(){
            turnChanger();
            resultPrinter();
        } , 2000);
    }
}

// 진루 처리
function processer_goBase(){
    for(i = 0; i <= 3; i++){
        if(bases[i] == 0){
            bases[i] = 1;
            break;
        }
    }

    if(bases[4] == 1){
        if(nowTurn == "computer"){
            score_computer[count_turn - 1]++;
        }
        if(nowTurn == "player"){
            score_player[count_turn - 1]++;
        }
        bases[4] = 0;
    }

    count_ball = 0;
    count_strike = 0;

    setTimeout(function(){
        resultPrinter();
        processer_game();
    } , 2000);
}

// 2루타 처리
function processer_goBase2(){
    for(i = 0; i <= 1; i++){
        for(j = 0; j <= 3; j++){
            if(bases[j] == 0){
                bases[j] = 1;
                break;
            }
        }
    
        if(bases[4] == 1){
            if(nowTurn == "computer"){
                score_computer[count_turn - 1]++;
            }
            if(nowTurn == "player"){
                score_player[count_turn - 1]++;
            }
            bases[4] = 0;
        }
    }

    count_ball = 0;
    count_strike = 0;
    bases[0] = 0;

    setTimeout(function(){
        resultPrinter();
        processer_game();
    } , 2000);
}

// 홈런 처리
function processer_homerun(){
    let count_homerun = 0;

    for(i = 0; i <= 3; i++){
        if(bases[i] == 1){
            count_homerun++;
        }
    }
    
    if(nowTurn == "computer"){
        score_computer[count_turn - 1] += (count_homerun + 1);
    }
    if(nowTurn == "player"){
        score_player[count_turn - 1] += (count_homerun + 1);
    }

    count_ball = 0;
    count_strike = 0;
    bases = [0 , 0 , 0 , 0];

    setTimeout(function(){
        resultPrinter();
        processer_game();
    } , 2000);
}

// 스트라이크 처리
function processer_strike(){
    count_strike++;

    if(count_strike != 3){
        setTimeout(function(){
            resultPrinter();
            processer_game();
        } , 2000);
    } else if(count_strike == 3){
        if(nowTurn == "computer"){
            resultDisplay_1.innerHTML = "COMPUTER의 삼진아웃!"
            resultDisplay_2.innerHTML = "..."
        }
        if(nowTurn == "player"){
            resultDisplay_1.innerHTML = "PLAYER의 삼진아웃!"
            resultDisplay_2.innerHTML = "..."
        }

        processer_out();
    }
}

// 볼 처리
function processer_ball(){
    count_ball++;

    if(count_ball != 4){
        setTimeout(function(){
            resultPrinter();
            processer_game();
        } , 2000);
    } else if(count_ball == 4){
        if(nowTurn == "computer"){
            resultDisplay_1.innerHTML = "COMPUTER의 포볼!"
            resultDisplay_2.innerHTML = "타자가 진루합니다."
        }
        if(nowTurn == "player"){
            resultDisplay_1.innerHTML = "PLAYER의 포볼!"
            resultDisplay_2.innerHTML = "타자가 진루합니다."
        }

        processer_goBase();
    }
}

//로그 남기기
function processer_log(a){
    // let newText = document.createTextNode;
    // newText.value = a;
    let newP = document.createElement("p");
    newP.innerHTML = a;
    // newP.appendChild(newText);
    logDisplay.appendChild(newP);
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
    sum_comScore = 0;
    sum_playerScore = 0;

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