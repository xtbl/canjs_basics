	var data = {message: "Im  a message from the data object using a mustache template!"};
	// Pass the id of the template and the data, containing our message to can.view
	var frag = can.view("app-template", data);
	// load the fragment in the page
	$("#my-app").html(frag);

	var changingData = new can.Map({changingMessage: "I'm changing..."});

	var contactFrag = can.view("contact-list-template", changingData);
	$("#contacts-container").html(contactFrag);	

	$("#changeBtn").click(function () {
		console.log("changing...");
		changingData.attr("changingMessage", "I changed!")
	});

	var people = new can.List([
    	{firstname: "John", lastname: "Doe"},
    	{firstname: "Emily", lastname: "Dickinson"}
	]);
	var peopleState = new can.Map({visible: true});

	var peopleFrag = can.view("people-list-template", {
		data : {people: people},
		state: peopleState
		});
	$("#my-app").html(peopleFrag);

	$("#add-person-btn").click(function () {
		people.push({firstname: "New", lastname: "Guy"});
	});

	$("#remove-person-btn").click(function () {
		people.pop();
	});

	$("#toggle-people-list-btn").click(function () {
		peopleState.attr("visible", !peopleState.attr("visible") );
	});


	console.log($("#my-app"));
	console.log(data);

	// TODO:
	// create list and display
	// pull list using ajax
	// create controller
