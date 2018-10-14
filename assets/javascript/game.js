$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOR6sICGLygz8vwaMCP5wLnCVDmhdGLn8",
    authDomain: "train-scheduler001.firebaseapp.com",
    databaseURL: "https://train-scheduler001.firebaseio.com",
    projectId: "train-scheduler001",
    storageBucket: "train-scheduler001.appspot.com",
    messagingSenderId: "397416706889"
  };
  firebase.initializeApp(config);

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";

    $("#submit-button").on("click", function(event) {
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#trainTime").val().trim();
        frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");

    });

    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().trainTime);
      console.log(childSnapshot.val().frequency);

      var trainNameTable = childSnapshot.val().trainName;
      var destinationTable = childSnapshot.val().destination;
      var frequencyTable = childSnapshot.val().frequency;
      var nextArrivalTable = childSnapshot.val().trainTime;

      var firstTimeConverted = moment(nextArrivalTable, "hh:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % frequencyTable;
      var minutesTillTrain = frequencyTable - tRemainder;
      var nextTrain = moment().add(minutesTillTrain, "minutes");
      var nextTrainFormatted = moment(nextTrain).format("hh:mm")

      $("#train-table").append("<tr><td>" +
            trainNameTable + "</td><td>" +
            destinationTable + "</td><td>" +
            frequencyTable + "</td><td>" +
            nextTrainFormatted + "</td><td>" +
            minutesTillTrain + "</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

})