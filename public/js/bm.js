/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
$(document).ready(() => {
  const today = new Date();
  const date = today.toDateString();
  const curTime = getTime(today);
  const convertedDate = convertDate(today);
  const bmStyle = ["liquid", "soft", "normal", "hard", "solid"];
  const bmAmount = ["little", "normal", "a lot"];
  const bmSpeed = ["less than 5 mins", "5 - 10 mins", "more than 10 mins"];
  const bmComfort = [
    "very uncomfortable",
    "uncomfortable",
    "it's okay",
    "nice",
    "great",
  ];

  // ********************************** Converting Time to match 23:10:00 format

  function getTime() {
    // today = new Date();
    let sHour = today.getHours();
    let sMin = today.getMinutes();
    sHour = sHour > 9 ? sHour : "0" + sHour;
    sMin = sMin > 9 ? sMin : "0" + sMin;
    return sHour + ":" + sMin + ":00";
  }
  console.log(getTime(today), "curTime");

  console.log(curTime);
  // ********************************** Converting Date to match 2021-01-16 format
  function convertDate() {
    // today = new Date();
    const sYear = today.getFullYear();
    let sMonth = today.getMonth() + 1;
    let sDate = today.getDate();
    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate = sDate > 9 ? sDate : "0" + sDate;
    return sYear + "-" + sMonth + "-" + sDate;
  }
  // ********************************** just checking if getting correct value from user picked time

  $("#timepicker").on("change", () => {
    const pickedTime = $("input#timepicker").val();
    console.log(pickedTime, "picked Time");
  });
  // ********************************** Displaying User picked value from input & display
  // (1) Style
  // $("#resultStyle ").html($("#styleRange").val());
  // Read value on change
  $("#styleRange").change(() => {
    const styleVal = $("input#styleRange").val();
    console.log(styleVal);

    if (styleVal === "1") {
      $("#resultStyle").html(
        `<p class ="text-muted"> my bowel was ${bmStyle[0]} </p>`
      );
    } else if (styleVal === "2") {
      $("#resultStyle").html(
        `<p class ="text-muted"> My bowel was ${bmStyle[1]} </p>`
      );
    } else if (styleVal === "3") {
      $("#resultStyle").html(
        `<p class ="text-muted"> My bowel was ${bmStyle[2]}  </p>`
      );
    } else if (styleVal === "4") {
      $("#resultStyle").html(
        `<p class ="text-muted"> My bowel was ${bmStyle[3]} </p>`
      );
    } else {
      $("#resultStyle").html(
        `<p class ="text-muted"> My bowel was ${bmStyle[4]} </p>`
      );
    }
  });

  // (2) Amount
  $("#amountRange").change(() => {
    const amountVal = $("input#amountRange").val();

    if (amountVal === "1") {
      $("#resultAmount").html(`<p class ="text-muted"> ${bmAmount[0]} </p>`);
    } else if (amountVal === "2") {
      $("#resultAmount").html(`<p class ="text-muted"> ${bmAmount[1]} </p>`);
    } else {
      $("#resultAmount").html(`<p class ="text-muted"> ${bmAmount[2]} </p>`);
    }
  });
  // (3) Speed
  $("#speedRange").change(() => {
    const speedVal = $("input#speedRange").val();

    if (speedVal === "1") {
      $("#resultSpeed").html(`<p class ="text-muted"> less than 5 mins  </p>`);
    } else if (speedVal === "2") {
      $("#resultSpeed").html(`<p class ="text-muted"> 5 to 10 mins  </p>`);
    } else {
      $("#resultSpeed").html(`<p class ="text-muted"> more than 10 mins  </p>`);
    }
  });

  // (4) Comfort Level
  $("#comfortRating").on("click", () => {
    // display clicked value
    const comfortVal = $(".comfort:checked").val();

    if (comfortVal === "1") {
      $("#resultComfort").html(`<p class ="text-muted"> ${bmComfort[0]} </p>`);
    } else if (comfortVal === "2") {
      $("#resultComfort").html(`<p class ="text-muted"> ${bmComfort[1]} </p>`);
    } else if (comfortVal === "3") {
      $("#resultComfort").html(`<p class ="text-muted"> ${bmComfort[2]}</p>`);
    } else if (comfortVal === "4") {
      $("#resultComfort").html(`<p class ="text-muted"> ${bmComfort[3]}</p>`);
    } else {
      $("#resultComfort").html(`<p class ="text-muted"> ${bmComfort[4]}! </p>`);
    }

    // $("#resultComfort").html($("input:checked").val() + " is checked");
  });

  // **********************************  POST user input
  // if user did not change date/time, default to current date/time
  // if user did not pick/change any options, default to mid setting

  $("#BM-add-btn").on("click", () => {
    const pickedDate = $("#datepicker").val();
    console.log(convertedDate, "convertDate");
    let date;
    if (!pickedDate) {
      date = convertedDate;
    } else {
      date = pickedDate;
    }

    if (!date) {
      return false;
    }
    const time = $("#timepicker").val();
    const style = $("#styleRange").val();
    const styleIndex = parseInt(style) - 1;

    const amount = $("#amountRange").val();
    const amountIndex = parseInt(amount) - 1;

    const speed = $("#speedRange").val();
    const speedIndex = parseInt(speed) - 1;
    const comfort = $(".comfort:checked").val();
    const comfortIndex = parseInt(comfort) - 1;
    console.log(comfort, "line 54");
    $.ajax({
      method: "POST",
      url: "/api/bm",
      data: {
        date: date,
        time: time,
        style: bmStyle[styleIndex],
        styleRating: parseInt(style),
        amount: bmAmount[amountIndex],
        amountRating: parseInt(amount),
        speed: bmSpeed[speedIndex],
        speedRating: parseInt(speed),
        comfort: bmComfort[comfortIndex],
        comfortRating: parseInt(comfort),
      },
    }).then((res) => {
      location.reload();
    });
  });
  // ********************************** Getting data from database

  const url = window.location.search;
  let UserId;
  if (url.indexOf("?User_id=") !== -1) {
    UserId = url.split("=")[1];
    getPosts(UserId);
  } else {
    getPosts();
  }
  // this gets all posts from database....
  function getPosts(user) {
    UserId = user || "";
    if (UserId) {
      UserId = "/?User_id=" + UserId;
    }
    $.get("/api/bm" + UserId, (data) => {
      console.log("BMs", data);
      // showing correct data
      bms = data;
      //   console.log(bms[1].date);
      // showing correct data
    });
  }

  // ********************************** Deleting
  $(".deleteBtn").on("click", (event) => {
    const id = $(event.target).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/api/bm/" + id,
    }).then(() => {
      window.location.replace("/myentry");
    });
  });

  //////////////////////////
  // $("#BM-edit-btn").on("click", (event) => {
  // 	const date = $("#datepicker").val();
  // 	const time = $("#timepicker").val();
  // 	const style = $("#styleRange").val();
  // 	const amount = $("#amountRange").val();
  // 	const speed = $("#speedRange").val();
  // 	const comfort = $(".comfort:checked").val();

  // 	const bm = { date, time, style, amount, speed, comfort };
  // 	$.ajax({
  // 		method: "PUT",
  // 		url: "/api/bm",
  // 		data: bm,
  // 	}).then((res) => {
  // 		return res.json(bm);
  // 	});
  // });
});
