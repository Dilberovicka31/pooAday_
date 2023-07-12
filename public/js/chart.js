function getChart(user) {
	UserId = user || "";
	if (UserId) {
		UserId = "/?User_id=" + UserId;
	}
	$.get("/api/bm" + UserId, function (data) {
		console.log("BMs", data);
		// showing correct data
		bms = data;
		console.log(bms[1].date);
		// showing correct data
		const comfortArray = bms.map((bm) => bm.comfortRating);
		console.log(comfortArray, "array");
		const totalComfort = comfortArray.reduce((prev, curr) => {
			console.log(curr, "prev");
			return prev + curr;
		}, 0);

		const aveComfort = totalComfort / bms.length;

		const comfortCount = new Map(
			[...new Set(comfortArray)].map((x) => [
				x,
				comfortArray.filter((y) => y === x).length,
			])
		);
		console.log(comfortCount.get(4), "sdfsdfsdfsdfsf");
		const comfortCountArr = [
			comfortCount.get(1),
			comfortCount.get(2),
			comfortCount.get(3),
			comfortCount.get(4),
			comfortCount.get(5),
		];
		console.log(comfortCountArr, "countsssss");

		var ctx = document.getElementById("myChart0").getContext("2d");
		var myChart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: [
					"very uncomfortable",
					"uncomfortable",
					"it's okay",
					"nice",
					"great",
				],
				datasets: [
					{
						label: "my comfort level",
						data: comfortCountArr,
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(255, 206, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(255, 159, 64, 0.2)",
						],
						borderColor: [
							"rgba(255, 99, 132, 1)",
							"rgba(54, 162, 235, 1)",
							"rgba(255, 206, 86, 1)",
							"rgba(75, 192, 192, 1)",
							"rgba(153, 102, 255, 1)",
							"rgba(255, 159, 64, 1)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				// scales: {
				// 	xAzes: [
				// 		{
				// 			type: "time",
				// 			time: {
				// 				unit: "month",
				// 			},
				// 			distribution: "linear",
				// 		},
				// 	],
				// 	yAxes: [
				// 		{
				// 			ticks: {
				// 				beginAtZero: true,
				// 			},
				// 		},
				// 	],
				// },
			},
		});
	});
}

getChart();
