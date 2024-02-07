import React from "react";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.module),
    datasets: [
      {
        label: "Number of Questions Answered",
        data: data.map((entry) => entry.questionsAnswered),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "red",
      },
    },
    scale: {},
    animation: false,
    scales: {
      r: {
        grid: {
          color: "#999",
        },
        angleLines: {
          color: "#999",
          lineWidth: 2,
        },
        suggestedMin: 1,
        suggestedMax: 5,
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
