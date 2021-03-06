	var data = {
		message: "Im  a message from the data object using a mustache template!",
		createdAt: new Date()
	};
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
	// $("#people-container").html(peopleFrag);

	$("#add-person-btn").click(function () {
		people.push({firstname: "New", lastname: "Guy"});
	});

	$("#remove-person-btn").click(function () {
		people.pop();
	});

	$("#toggle-people-list-btn").click(function () {
		peopleState.attr("visible", !peopleState.attr("visible") );
	});

	// Handle User Interaction
	// can.Control
	var famousPeople = [
	    {firstname: "John", lastname: "Doe"},
	    {firstname: "Emily", lastname: "Dickinson"},
	    {firstname: "William", lastname: "Adams"},
	    {firstname: "Stevie", lastname: "Nicks"},
	    {firstname: "Bob", lastname: "Barker"}
	];

	var FamousPeopleList = can.Control.extend({
		init: function ( element, opt) {
			this.options.famousPeople = new can.List(opt.famousPeople);
			this.element.html( can.view("famous-people-template", {
				famousPeople: this.options.famousPeople
			}));

		},
		'li click': function (li, event) {
			var famousPeople = this.options.famousPeople;
			var person = li.data("person");
			var index = famousPeople.indexOf(person);
			famousPeople.splice(index, 1);
		}
	});

	new FamousPeopleList("#famouse-people-container", {famousPeople: famousPeople});

	// Can Component
	can.Component.extend({
		tag: "people",
	    template: '<ul>' +
	                '{{#each people}}' +
	                '<li can-click="remove">' +
	                    '{{lastname}}, {{firstname}}' +
	                '</li>' +
	                '{{/each}}' +
	                '</ul>',
	    scope: {
	    	people: people,
	    	remove: function ( person ) {
	    		var people = this.attr("people");
	    		var index = people.indexOf(person);
	    		people.splice(index, 1);
	    	}
	    }
	});

	var componentFrag = can.view("#people-component", {people: people});
	$("#people-component-container").html(componentFrag);

	// TODO:
	// * create list and display
	// pull list using ajax
	// * create controller
