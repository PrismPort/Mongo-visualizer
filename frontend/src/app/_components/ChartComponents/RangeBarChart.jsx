import React, { useEffect, useState } from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ToggleSwitch from "../AtomarComponents/ToggleSwitch";

const RangeBarChart = ({ title, dataValues, labels }) => {
  const { updateToggleState, toggleStates } = useGraphContext();

  const [chartToggles, setChartToggles] = useState([]);

  const colors = [
    "grey",
    "green",
    "blue",
    "brown",
    "orange",
    "yellow",
    "red",
    "magenta",
    "cyan",
    "purple",
  ];

  useEffect(() => {
    // Initialize or update the chart toggles based on the data
    setChartToggles(
      labels.map((label, index) => ({
        value: label,
        occurance: dataValues[index],
        checked: toggleStates[title]?.[index]?.checked ?? true, // default to true if not set
      }))
    );
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: dataValues,
        backgroundColor: labels.map(
          (_, index) => colors[index % colors.length]
        ),
        // Additional dataset properties can be added here as needed
      },
    ],
  };

  const options = {
    indexAxis: "x", // 'x' for vertical bars, 'y' for horizontal bars
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: false,
    },
    // Additional chart options can be added here as needed
  };

  console.log("data in Barchart", data);

  return (
    <>
      <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
        <div>
          <h2 className="m-4 text-xl bold">{title}</h2>
        </div>
        <div className="my-bar-chart">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default RangeBarChart;
