$(document).ready(() => {
	// ********************************** user name display
	$.get("/api/user_data").then((user) => {
		$(".member-name").text(` Hello , ${user.name} ! `);
	});
	// ********************************** datepicker/timepicker setup
	$("#datepicker").datepicker({
		format: "yyyy-mm-dd",
	});
	// this will make a big popup go away but then have to click twice for time and min....
	// may want to change it to differenct timepicker.

	$("#timepicker").timepicker({
		modal: false,
		header: false,
		footer: false,
	});

	// *********************************** Current Date display
	let today = new Date();
	const date = today.toDateString();
	console.log(date, "date");
	$("#date-display").text(date);

	//  *********************************** User picked date display
	$("#datepicker").on("change", () => {
		const pickedDate = $("input").val();
		$("#date-display").text(` for  ${pickedDate} `);
	});
	////////////////////

	///////////////////
	// $("#moodRating").on("click", () => {
	// 	// display clicked value
	// 	$("#resultMood").html($("input:checked").val() + " is checked");
	// });
});
