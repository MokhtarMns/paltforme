import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const TaskChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Tasks",
        data: data.map((entry) => entry.tasksSolved),
        fill: true,
        backgroundColor: "#22CFCF20",
        borderColor: "#22CFCF",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  
    // Modify the axis by adding scales
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: false,
          beginAtZero : true
        },
  
        // to remove the x-axis grid
        grid: {
          drawBorder: true,
          display: true,
          color: "#999"
        },

      },
      // to remove the y-axis labels
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        // to remove the y-axis grid
        grid: {
          drawBorder: true,
          display: true,
          color: "#999"
        },
      },
    },
  };
  return (
    <div>
      <Line data={chartData} options={options}  />
    </div>
  );
};

export default TaskChart;
