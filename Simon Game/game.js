var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var i = 0;

function gamePlay() {

  var level = 1;

  $(window).keypress(function() {

    nextSequence();

    $(".btn").click(function() {

      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);

      // Calls function to play sound and animate
      playSound(userChosenColour);
      animatePress(userChosenColour);

      // DEBUG
      console.log("user pattern: " + userClickedPattern);

      var noErr = checkGame();

      if (noErr && userClickedPattern.length === gamePattern.length) {
        $("#level-title").text("Level " + level++);
        userClickedPattern = [];
        nextSequence();
      } else if (!noErr) {
        console.log('wrong one. userClickedPattern.length is ' + userClickedPattern.length + " and gamePattern.length is " + gamePattern.length);
        animateWrong();
        $(".btn").off("click");
        $("#level-title").text("Game Over! Press a key to start over.")
        resetGame();
        gamePlay();
      } else {
        console.log("unaccounted error / no error")
      }
    });

    $("#level-title").text("Level " + level++);
    $(window).off("keypress");

  })
}

gamePlay();

//generates the next game pattern and animates

var pressed = false;

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // DEBUG
  console.log("game pattern: " + gamePattern);

  console.log("pressed before: " + pressed);

  // this is crap and needs improvement
  // setInterval(function() {
  //   setTimeout(function() {
  //     setInterval(function() {
  //       console.log("initial i value: " + i);
  //       if (i < gamePattern.length && !pressed) {
  //         pressed = false;
  //         animateGamePress(gamePattern[i]);
  //         pressed[i] = true;
  //         console.log(pressed);
  //         i++;
  //         console.log("value of i is: " + i);
  //
  //       } else if (i === gamePattern.length) {
  //         pressed = true;
  //         i = 0;
  //       }
  //     }, 3000);
  //   }, 2000);
  // }, 1000)

  // new version with promises:
  function animGameAns(i){
    var promise = new Promise(function(resolve, reject) {
      console.log("new promise")
        if (i < gamePattern.length) {
          setTimeout(() => {
            console.log("i is: " + i);
            animateGamePress(gamePattern[i]);
            resolve(i);
          }, 200);
        } else if (i === gamePattern.length) {
          resolve(i);
        } else{
          reject('rejected');
        }
      });

      promise.then(() => {
        setTimeout(() => {
          i++;
          animGameAns(i);
        }, 300);
      }).catch((error)=>{
        console.log(error);
      })
  }

animGameAns(0);


}

  // This function is called whenever we need to play a sound
  function playSound(name) {

    //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  // Works if any key is pressed
  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed").delay(100).queue(function() {
      $(this).removeClass("pressed").dequeue();
    })
  }

  // Animation if the answer is wrong - changes the body background to red temporarily
  function animateWrong() {
    playSound("wrong");
    $("body").addClass("game-over").delay(100).queue(function() {
      $(this).removeClass("game-over").dequeue();
    })
  }


  // Checks the game and if user and game patterns aren't the same, it resets both arrays and user is prompted if they want to restart
  function checkGame() {
    var noErr = false;
    var j = 0;
    for (j = 0; j < userClickedPattern.length; j++) {
      if (gamePattern[j] !== userClickedPattern[j]) {
        console.log("wrong color entered; userClickedPattern list: " + userClickedPattern[j] + "; element number: " + j);
        console.log("not eq game pattern: " + gamePattern);
        console.log("ran checkGame()");
        noErr = false;
      }
      // this will only return true if j is the index of the last element AND if the last element is also equal to what is expected
      else if (j === gamePattern.length - 1) {
        console.log("all colors are correct");
        console.log("eq game pattern: " + gamePattern);
        console.log("ran checkGame()");
        noErr = true;
      } else {
        noErr = true;
      }
    }
    return noErr;

  }

  function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
  }

  function animateGamePress(currentColour) {
    $("#" + currentColour).addClass("game-pressed").delay(100).queue(function() {
      $(this).removeClass("game-pressed").dequeue();
    });
  }
