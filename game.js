//setting variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//checking if the game has been started 

$(document).keypress(function() {

       if (started==false){
       nextSequence();
       $("h1").text("Level "+level);
       started = true;

       }
  })

// jquery checks if button with class .btn is clicked

$(".btn").click(function() {

  //setting variable according to button pressed
  var userChosenColor = $(this).attr("id");
  //adding the pressed button choise to the array
  userClickedPattern.push(userChosenColor);
  //play func
  playSound(userChosenColor);
  //play func
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);

});


function checkAnswer(currentLevel){

if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

  console.log("success!");

  if (userClickedPattern.length === gamePattern.length) {

    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}
else {
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");
  setTimeout(function() {

    $("body").removeClass("game-over")

  }, 200);
  startOver();
  console.log("wrong");
}
}

function nextSequence() {

  userClickedPattern = [];

  level++;
   $("h1").text("Level "+level);

  //setting a number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  //choosing a color from the buttonColors array
  var randomChosenColor = buttonColors[randomNumber];

  //adding the color to the gamePattern array
  gamePattern.push(randomChosenColor);

  //jquery makes the button flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //plays the random selected buttons sound
  playSound(randomChosenColor);



  //console.log(level);

}

function playSound(name) {

  //load audio

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {

  //adding a class to the selected button with jquery
  $("#" + currentColor).addClass("pressed");

//removes the selected buttons class after 100millis.
  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed")

  }, 100);

}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
