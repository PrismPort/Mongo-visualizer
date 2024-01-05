// components/MyBooleanChart.js
import React, { useEffect, useState } from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ToggleSwitch from "../AtomarComponents/ToggleSwitch";

// Set the override for Doughnut charts
//Chart.overrides.doughnut.plugins.legend.display = false;

const MyBooleanChart = ({ title, dataValues, labels }) => {
  const { updateToggleState } = useGraphContext();
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

  const labelColors = labels.map(
    (label, index) => colors[index % colors.length]
  );

  const sum = dataValues.reduce((a, b) => a + b, 0);

  const data = {
    labels: labels,

    datasets: [
      {
        label: title, // Use the title prop here
        data: dataValues, // Use the dataValues prop here
        backgroundColor: labelColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: title, // Use the title prop here
      },
    },
  };

  // Initialize toggle state
  const [chartToggles, setChartToggles] = useState(
    labels.map((label, index) => ({
      value: label,
      occurance: dataValues[index],
      checked: true,
    }))
  );

  useEffect(() => {
    updateToggleState(title, chartToggles);
  }, []);

  const handleToggleChange = (index) => {
    const updatedChartToggles = chartToggles.map((item, i) => {
      if (index === i) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setChartToggles(updatedChartToggles);

    // Update the toggle state in the GraphContext
    updateToggleState(title, updatedChartToggles);
  };

  return (
    <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
      <div>
        <h2 className="m-4 text-xl bold">{title}</h2>
      </div>
      <Doughnut data={data} options={options} />
      <div className="my-4">
        <table>
          <thead>
            <tr>
              <th className=" px-4">%</th>
              <th className=" px-4">colour</th>
              <th className=" px-4">{title}</th>
              <th className=" px-4">
                selected <br></br> documents
              </th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label, index) => {
              return (
                <tr key={index} className=" h-5">
                  <td>
                    {parseFloat((dataValues[index] / sum) * 100).toFixed(2)}
                  </td>
                  <td className="h-8 flex  justify-center items-center">
                    <div
                      className={`h-4 w-4 rounded-full`}
                      style={{ backgroundColor: labelColors[index] }}
                    ></div>
                  </td>
                  <td className=" text-center">{label}</td>
                  <td>
                    <ToggleSwitch
                      id={`${title}-${index}`}
                      checked={chartToggles[index].checked}
                      onChange={() => handleToggleChange(index)}
                    ></ToggleSwitch>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooleanChart;
