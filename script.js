var list_item = document.getElementsByClassName("list-item")[0];
var list = document.getElementsByClassName("list")[0];
// var myoperator_medium = ['+', '-', 'x', '÷'];
var myoperator_easy = ['+', '-', 'x'];
var start = document.getElementsByClassName("cover")[0];
var score = document.getElementsByClassName("score-value")[0];
var pos = 75;
var miss_question = 0;
var loop;
var announce = "restart";
//process

startGame();
let best_str = window.localStorage.getItem("best-score");
if(best_str!==null)
    document.getElementsByClassName("best-value")[0].innerHTML = best_str;
//function
function initQuestion() {
    // list_item.appendChild(createQues());
    list_item.insertBefore(createQues(), list_item.firstChild);
    pos -= 76;
    list.style.top = pos + "px";
    if(list_item.childElementCount > 7){

        let is_pass = list_item.lastChild.getAttribute("passed");

        if(is_pass){
            if(miss_question > 0)
                miss_question--;
        } else {
            miss_question++;
            if(miss_question >= 3)
            {
                stopGame();
                return;
            }
        }
        list_item.removeChild(list_item.lastChild);
    } 
    // console.log("Init 1 question, total: " ,list_item.childElementCount);
}
function createQues() {
    var a = randomNumber(1, 10);
    var b = randomNumber(1, 10);
    var oper_index = randomNumber(0, 2);
    var ques = document.createElement("p");
    ques.innerHTML = a + " " + myoperator_easy[oper_index] + " " + b;

    var c;
    switch (oper_index) {
        case 0:
            c = a + b;
            break;
        case 1:
            c = a - b;
            break;
        case 2:
            c = a * b;
            break;
        // case 3:
        //     c = Math.round((a / b) * 100) / 100;
        //     break;
    }

    var li = document.createElement("li");
    var answer1 = document.createElement("button");
    var answer2 = document.createElement("button");
    answer1.addEventListener("click", function () {
        check(answer1);
    }, {once: true});
    answer2.addEventListener("click", function () {
        check(answer2);
    }, { once: true});

    answer1
    var wrong_answer;
    do {
        wrong_answer = randomNumber(-3, 3) + c;
    } while (wrong_answer === c)
    wrong_answer = Math.round(wrong_answer * 100) / 100;
    var ran = randomNumber(1, 2);
    // console.log(ran);
    if (ran % 2 !== 0) {
        answer1.innerHTML = c;
        answer2.innerHTML = wrong_answer;
        answer1.setAttribute("is-true", true);
        answer2.setAttribute("is-true", false);
    } else {
        answer1.innerHTML = wrong_answer;
        answer2.innerHTML = c;
        answer1.setAttribute("is-true", false);
        answer2.setAttribute("is-true", true);
    }
    li.className += "item";
    ques.className += "question";
    answer1.className += "answer";
    answer2.className += "answer";

    li.append(ques, answer1, answer2);
    return li;
}
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function check(button) {
    if (button.getAttribute("is-true") == "true") {
        score.innerHTML = parseInt(score.innerHTML) + 1;
        button.style.backgroundColor = "lightgreen";
        button.parentNode.style.pointerEvents = "none";
        button.parentNode.setAttribute("passed", true);
    } else {
        stopGame(button);
    }
}
function startGame(){
    console.log("----start game----");
    initQuestion();

    start.addEventListener("click", function () {
        // start.style.zIndex = -1;
        start.style.visibility = "hidden";
        loop = setInterval(function () {
            if ((pos + 1) % 76 === 0)
                initQuestion();
            pos += 0.5;
            list.style.top = pos + "px";
        }, 7);
    });
}
function stopGame(button = null){
    clearInterval(loop);
    
    console.log("----Game stop----");
    while(list_item.firstChild){
        list_item.removeChild(list_item.firstChild);
    }

    let best = document.getElementsByClassName("best-value")[0]; 
    if(parseInt(score.innerHTML) > parseInt(best.innerHTML))
        {
            best.innerHTML = score.innerHTML;
            window.localStorage.setItem("best-score", best.innerHTML);
        }
    pos = 73;
    list.style.top = pos + "px";

    //reset
    start.style.visibility = "visible";
    start.style.opcatiy = "0.9";
    var content = document.getElementsByClassName("content")[0];
    if(button!==null){
        content.innerHTML = "Last question: " + button.parentNode.children[0].innerHTML + "<br>Your answer: " + button.innerHTML;
    } else {
        content.innerHTML = "You missed 3 question.";
    }
    content.innerHTML += "<br>Start again!";

    score.innerHTML = 0;
    miss_question = 0;
    initQuestion();
}