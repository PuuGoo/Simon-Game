var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keydown(function(){
    if (!started) {
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); // Khong chay duoc
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); // Phai co tinh tuong tac google moi cho dung sound
}
function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("success");
    
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
