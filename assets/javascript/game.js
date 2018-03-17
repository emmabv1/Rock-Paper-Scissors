var config = {
    apiKey: "AIzaSyAlopL725AQmgqkvwsjJYdXtuZgkebAPdM",
    authDomain: "rock-paper-scissors-502d7.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-502d7.firebaseio.com",
    projectId: "rock-paper-scissors-502d7",
    storageBucket: "rock-paper-scissors-502d7.appspot.com",
    messagingSenderId: "890900020473"
  };
firebase.initializeApp(config);

var database = firebase.database();

var p1 = "";
var p2 = "";
var choice1 = "";
var choice2 = "";
var image1 = "";
var image2 = "";

$(".choice1").on("click", function() {
  choice1=$(this).prop("value");
  if($(this).prop("value") === "r"){
    image1 = "assets/images/rock.jpg";
  }
  else if($(this).prop("value") === "p"){
    image1 = "assets/images/paper.jpg";
  }
  else if($(this).prop("value") === "s"){
    image1 = "assets/images/scissors.png";
  }
  database.ref().push({
    choice1: choice1,
    image1: image1
  })
});

$(".choice2").on("click", function() {
  choice2=$(this).prop("value");
  if($(this).prop("value") === "r"){
    image2 = "assets/images/rock.jpg";
  }
  else if($(this).prop("value") === "p"){
    image2 = "assets/images/paper.jpg";
  }
  else if($(this).prop("value") === "s"){
    image2 = "assets/images/scissors.png";
  }
  database.ref().push({
    choice2: choice2,
    image2: image2
  })
});

$("#submit1").on("click", function() {
  p1 = $("#player1").val().trim();
  database.ref().push({
    p1: p1
  })
});

$("#submit2").on("click", function() {
  p2 = $("#player2").val().trim();
  database.ref().push({
    p2: p2
  })
});


  database.ref().on("child_added", function(childSnapshot){
    p1 = childSnapshot.val().p1;
    p2 = childSnapshot.val().p2;
    choice1 = childSnapshot.val().choice1;
    $("#name1").html(p1);
    choice2 = childSnapshot.val().choice2;
    $("#name2").html(p2);
    image1 = childSnapshot.val().image1;
    $("#img1").attr("src", image1);
    image2 = childSnapshot.val().image2;
    $("#img2").attr("src", image2);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  

//couldn't get this to work...
$("#compare").on("click", function() {
  if (choice1 === "r" && choice2 === "p") {
    $("#results").text("Winner: " + p1 + "!");
  }

  else if (choice1 === "r" && choice2 === "s") {
    $("#results").html("Winner: " + p2 + "!");
  }

  else if (choice1 === "p" && choice2 === "r") {
    $("#results").html("Winner: " + p1 + "!");
  }

  else if (choice1 === "p" && choice2 === "s") {
    $("#results").html("Winner: " + p2 + "!");
  }
  
  else if (choice1 === "s" && choice2 === "p") {
    $("#results").html("Winner: " + p1 + "!");
  }

  else if (choice1 === "s" && choice2 === "r") {
    $("#results").html("Winner: " + p2 + "!");
  }

  else if (choice1 === choice2) {
    $("#results").html("It's a tie");
  }
})