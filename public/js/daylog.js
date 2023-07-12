/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // ********************************** choices// could change it better wording
  const dlMood = ["Unhappy", "So so", "Okay", "Happy", "Very Happy"];
  const dlWater = [
    "1 bottle",
    "2 bottles",
    "3 bottles",
    "4 bottles",
    "5 bottles",
    "6 bottles",
  ];
  const dlFood = ["breakfast", "lunch", "dinner", "fruit & veggies", "snacks"];
  const dlActivity = ["Very Little", "Light", "Moderate", "Active", "Vigorous"];
  const dlSleep = ["Very Little", "Little", "Moderate", "Good", "Great"];
  // ********************************** Update # of BM for today
  // need to check date and match
  // **********************************
  // (1) Mood
  $("#moodRating").on("click", () => {
    // 	// display clicked value
    $("#resultMood").html($("input:checked").val() + " is checked");
    const moodVal = $(".mood:checked").val();
    console.log(moodVal, "val");
    if (moodVal === "1") {
      $("#resultMood").html(`<p class ="text-muted"> ${dlMood[0]}`);
    } else if (moodVal === "2") {
      $("#resultMood").html(`<p class ="text-muted"> ${dlMood[1]}`);
    } else if (moodVal === "3") {
      $("#resultMood").html(`<p class ="text-muted"> ${dlMood[2]}`);
    } else if (moodVal === "4") {
      $("#resultMood").html(`<p class ="text-muted"> ${dlMood[3]}`);
    } else {
      $("#resultMood").html(`<p class ="text-muted"> ${dlMood[4]}`);
    }
  });
  // (2) Water
  $("#waterIntake").on("click", () => {
    const waterVal = $(".water:checked").val();

    if (waterVal === "1") {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[0]}`);
    } else if (waterVal === "2") {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[1]}`);
    } else if (waterVal === "3") {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[2]}`);
    } else if (waterVal === "4") {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[3]}`);
    } else if (waterVal === "5") {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[4]}`);
    } else {
      $("#resultWater").html(`<p class ="text-muted"> ${dlWater[5]}`);
    }
  });
  // (3) food intake - radio / multiple check
});
