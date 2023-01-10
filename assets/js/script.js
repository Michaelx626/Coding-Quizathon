var submitBtn = document.getElementById("submits");
var highScores = document.querySelector(".scores");
var countDown = document.getElementById("countdown");
var startPage = document.querySelector(".start");
var questionPage = document.querySelector(".questions");
var highScorePage = document.querySelector('.remove');
var currentQuestion = document.getElementById('showQuestions');
var scoreText = document.getElementById('showScores');
var submitButton = document.getElementById('submitScore');
var choiceA = document.getElementById('userA');
var choiceB = document.getElementById('userB');
var choiceC = document.getElementById('userC');
var choiceD = document.getElementById('userD');
var lists = document.getElementById('lists');
var goBack = document.getElementById('goBack');
var clearHS = document.getElementById('clear');
var savedInitials = document.querySelector('#savedName');
var myTimer = 30;
var i = 0;
var realAnswers = ['c', 'c', 'b', 'a', 'b'];
var userAnswers = [];
var yourScore = 0;
var scores = JSON.parse(localStorage.getItem('initials')) || [];

var myQuestions = [
    {
        question: "Which of these is a boolean?",
        a: "10",
        b: "10.00",
        c: "False",
        d: "None of the above"
    },
    {
        question: "Which of these is considered a 'strict equality'?",
        a: "=",
        b: "==",
        c: "===",
        d: "None of the above"
    },
    {
        question: "Which of these is true? 5 % 2 = ?",
        a: "5",
        b: "1",
        c: "2.5",
        d: "Undefined"
    },
    {
        question: "What does this logical operator mean? '&&'",
        a: "And",
        b: "Or",
        c: "Not",
        d: "None of the above"
    },
    {
        question: "What does this logical operator mean? '||'",
        a: "And",
        b: "Or",
        c: "Not",
        d: "None of the above"
    }
];

function checkAnswers(){
    if (realAnswers[i] === userAnswers[i]){
        yourScore++;
    } else {
        myTimer -= 5;
    }
}


function showQuestions(){
    if (i === 5){
        displayMessage();
        return;
    }
    var curr = myQuestions[i];
    
    currentQuestion.textContent = curr.question;
    choiceA.setAttribute('value', 'A: ' + curr.a);
    choiceB.setAttribute('value', 'B: ' + curr.b);
    choiceC.setAttribute('value', 'C: ' + curr.c);
    choiceD.setAttribute('value', 'D: ' + curr.d);
    
}   

function userPicks(){
    startPage.remove();
    var picksA = document.querySelector('.picksA');
    var picksB = document.querySelector('.picksB');
    var picksC = document.querySelector('.picksC');
    var picksD = document.querySelector('.picksD');
    
    picksA.addEventListener('click', function(){
        userAnswers.push('a');
        checkAnswers();
        i++;
        showQuestions();
    });
    
    picksB.addEventListener('click', function(){
        userAnswers.push('b');
        checkAnswers();
        i++;
        showQuestions();
    });
    
    picksC.addEventListener('click', function(){
        userAnswers.push('c');
        checkAnswers();
        i++;
        showQuestions();
    });
    
    picksD.addEventListener('click', function(){
        userAnswers.push('d');
        checkAnswers();
        i++;
        showQuestions();
    });
    
}

function startQuiz(){
    countDown.textContent = "Time: " + myTimer;
    var timeInterval = setInterval(function(){
        if (myTimer > 0){
            countDown.textContent = "Time: " + myTimer;
            myTimer--;
        } else {
            countDown.textContent = "Time: 0";
            clearInterval(timeInterval);
            displayMessage();
        }
        
        if (i === 5){
            countDown.textContent = "Time: " + myTimer;
            clearInterval(timeInterval);
            displayMessage();
        }
        
    },1000);
}


function displayMessage(){
    questionPage.remove();
    scoreText.textContent = "Your final score is " + yourScore + "/5!";
}

function viewHighScores(){
    highScorePage.remove();
    lists.innerHTML = "";
    for (var x = 0; x < scores.length; x++){
        if (x > 4){
            return;
        }
        var list = document.createElement('li');
        lists.append(list);
        list.innerHTML= scores[x].initials + " - " + scores[x].score + "/5!";
    }
}

submitButton.addEventListener('click', function(){
    var arr = {
        initials: savedInitials.value.trim(),
        score: yourScore,
        timer: myTimer,
    }
    scores.push(arr);
    localStorage.setItem('initials', JSON.stringify(scores));
    scores.sort(function(a,b){
        return parseFloat(b.score) - parseFloat(a.score);
    })
    viewHighScores();
})
goBack.addEventListener('click', function(){
    location.reload();
})
clearHS.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});
submitBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener('click', userPicks);
submitBtn.addEventListener('click', showQuestions);
highScores.addEventListener("click", viewHighScores);