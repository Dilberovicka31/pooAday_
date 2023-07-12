/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const today = new Date();
const convertedDate = convertDate(today);
function convertDate() {
  // today = new Date();
  const sYear = today.getFullYear();
  let sMonth = today.getMonth() + 1;
  let sDate = today.getDate();
  sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
  sDate = sDate > 9 ? sDate : "0" + sDate;
  return sYear + "-" + sMonth + "-" + sDate;
}

$("#sleepRange").change(()=>{

}),

$("#activityRange").change(() => {
    // 	// display clicked value
    const activityVal = $("input#activityRange").val();

    if (activityVal === "1") {
      $("#resultActivity").html(`<p class ="text-muted"> Very Little </p>`);
    } else if (activityVal === "2") {
      $("#resultActivity").html(`<p class ="text-muted">  Light </p>`);
    } else if (activityVal === "3") {
      $("#resultActivity").html(`<p class ="text-muted"> Moderate </p>`);
    } else if (activityVal === "4") {
      $("#resultActivity").html(`<p class ="text-muted"> Active </p>`);
    } else {
      $("#resultActivity").html(`<p class ="text-muted"> Vigorous </p>`);
    }
  }),

$("#addReport").on("click", () => {
    const pickedDate = $("#datepicker").val();
    let date;
    if (!pickedDate) {
      date = convertedDate;
    } else {
      date = pickedDate;
    }

    if (!date) {
      return false;
    }
    const mood = $(".mood").val();
    const water = $(".water").val();
    const food = $(".food").val();
    const activity = $("#activityRange").val();
    const sleep = $("#sleepRange").val();
    const medication = $("#exampleFormControlInput1").val();
    const note = $("#exampleFormControlTextarea1").val();
    console.log("tecxt", {
      date: date,
      mood: mood,
      water: water,
      food: food,
      activity: activity,
      sleep: sleep,
      medication: medication,
      note: note,
    });
    $.ajax({
      method: "POST",
      url: "/api/members",
      data: {
        date: date,
        mood: mood,
        water: water,
        food: food,
        activity: activity,
        sleep: sleep,
        medication: medication,
        note: note,
      },
    }).then((res) => {
      console.log(res, "res");
      // location.reload();
    });
  }),

  $(".deleteReport").on("click", (event) => {
    const id = $(event.target).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/api/members/" + id,
    }).then(() => {
      window.location.replace("/myentry");
    });
  })
