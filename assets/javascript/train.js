// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIsjHijHOINsKiCwxViGux602C7whnVHo",
    authDomain: "trainscheduler-1ed35.firebaseapp.com",
    databaseURL: "https://trainscheduler-1ed35.firebaseio.com",
    projectId: "trainscheduler-1ed35",
    storageBucket: "trainscheduler-1ed35.appspot.com",
    messagingSenderId: "145769335078"
  };
  firebase.initializeApp(config);

	var database = firebase.database();
	var randomdate = "01/01/2017";

	convertedDate = moment(randomdate).format("MM/DD/YYYY");

	database.ref().on("child_added",function(childSnapshot,prevChildkey){
		console.log(childSnapshot.val());

		var trainName = childSnapshot.val().trainName;
		var firstTime = childSnapshot.val().firstTime;
		var destination = childSnapshot.val().destination;
		var frequency = childSnapshot.val().frequency;
		var timeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
		var diffTime = moment().diff(moment(timeConverted), "minutes");
		var trainRemainder = diffTime % frequency;
		var nextTrain = frequency - trainRemainder;
		var arrival = moment().add(nextTrain, "minutes");

		arrivalFormat = moment(arrival).format("hh:mm A");

		$("table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  		frequency + "</td><td>" + arrivalFormat + "</td><td>" + nextTrain + "</td></tr>");

	});

	$("#submit-button").on("click",function(event){

		event.preventDefault();

		var	trainName = $("#train").val().trim();
		var	destination = $("#destination").val().trim();
		var	firstTime = $("#time").val().trim();
		var timeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
		var	frequency = $("#frequency").val().trim();
		var diff = moment(firstTime).diff(moment());
		var duration = moment.duration(diff);
		var min = duration.asMinutes();

			var trainInfo = {
				 trainName: trainName,
				 destination: destination,
				 firstTime: firstTime,
				 frequency: frequency
			};
			
			database.ref().push(trainInfo);

			console.log(trainInfo);

		   $("#train").val("");
		   $("#destination").val("");
		   $("#time").val("");
		   $("#frequency").val("");


	});


