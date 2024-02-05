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
        backgroundColor: "#37415540",
        borderColor: "#374155aa",
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
        },
  
        // to remove the x-axis grid
        grid: {
          drawBorder: true,
          display: true,
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
