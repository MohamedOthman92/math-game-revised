var action;
var playing = false;
var score;
var timeRemaining;
var correctAnswer;
//if we click start/reset button
document.getElementById("startreset").onclick = function(){
    //if we are playing
    
    if(playing == true){
         location.reload() //reload page

    }else{ //if we are not playing
        
    playing = true;            //change to playing mode
        
    score = 0;              //set score to 0
        
    document.getElementById("scorevalue").innerHTML = score;
               
        //show countdown box
        
        show("timeremaining")
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining
    
        //Hide game over box
        hide("gameOver")
        
        //change button to reset
        
    document.getElementById("startreset").innerHTML = "Reset Game";
        
                //reduce time by 1sec in loops
        
    startCountdown();
        
    // Generate a new Q&A
        
    generateQA();
    }
    
}
    
// Clicking an answer box     
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //Check if we are playing
    if(playing == true){
        if(this.innerHTML == correctAnswer){ // Correct Answer.
            score++;
        document.getElementById("scorevalue").innerHTML = score;
        // Hide wrong box and show correct box
        hide("wrong");
        show('correct');
        setTimeout(function(){
            hide("correct");
        },1500)
        //Generate new Q&A
        generateQA();
    }else{
        // Wrong Answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
            hide("wrong");
        }, 1500);
        // Generate new Q&A
    }
    }
} 
}   

// Functions:

// Start Counter:
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        
        if(timeRemaining == 0) {
            
            stopCountdown();
           
            show("gameOver")
            
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + ".</p>";
            
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }                      // game over
    }, 1000);
}

// Stop Counter:
function stopCountdown(){
    clearInterval(action)
}

// Hide Elements:
function hide(Id){
    document.getElementById(Id).style.display = "none";
};

// Show Elements
function show(Id){
    document.getElementById(Id).style.display = "block";
};

// Generate Q&A:

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x*y; 
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random())
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    //fill other boxes
    
    var answers = [correctAnswer];
    for(i=1; i<5 ; i++){
        if(i != correctPosition){
            var wrongAnswer;
           do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
           }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        };
    };
};