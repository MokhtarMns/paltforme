import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const TimeSpentChart = () => {
  // Sample data (replace with your actual data)
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Time Spent (hours)",
        backgroundColor: "#767D8A",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 0,
        borderRadius: 4,
        hoverBackgroundColor: "hsl(182, 63%, 33%)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [3, 4, 5, 2, 6, 7, 8], // Replace with your actual time spent data
      },
    ],
  };

  const options = {
    plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          color: "red",
        },
      },
    scales: {
      x: {
        categorySpacing: 2, // Adjust the spacing between ticks
        grid: {
            display: false, // Hide the grid lines on the y-axis
          },
        
      },
      y: {
        beginAtZero: true,
        ticks: {
            display: false, // Hide ticks on the x-axis
          },
       
      },
    },
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default TimeSpentChart;
