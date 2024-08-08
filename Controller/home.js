// Pie Chart
var ctxP = document.getElementById("pieChart").getContext("2d");
var myPieChart = new Chart(ctxP, {
  type: "pie",
  data: {
    labels: ["Business", "Testing", "Development"],
    datasets: [
      {
        data: [44, 32, 16, 8],
        backgroundColor: ["#46BFBD", "#FDB45C", "#949FB1"],
        hoverBackgroundColor: ["#5AD3D1", "#FFC870", "#A8B3C5"],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Bar Chart
var ctxB = document.getElementById("barChart").getContext("2d");
var myBarChart = new Chart(ctxB, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Received",
        data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Pending",
        data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
