import React, { useEffect, useState } from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ToggleSwitch from "../AtomarComponents/ToggleSwitch";

const RangeBarChart = ({ title, dataValues, labels }) => {
  const { updateToggleState, toggleStates } = useGraphContext();

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

  const [chartToggles, setChartToggles] = useState(
    toggleStates[title] ||
      labels.map((label, index) => ({
        value: label,
        occurance: dataValues[index],
        checked: true,
      }))
  );

  useEffect(() => {
    if (toggleStates[title]) {
      const updatedToggles = toggleStates[title].map((toggle, index) => {
        return { ...toggle, occurance: dataValues[index] || 0 };
      });
      setChartToggles(updatedToggles);
    }
  }, [toggleStates, title, dataValues]);

  const handleToggleChange = (index) => {
    const updatedChartToggles = chartToggles.map((item, i) => {
      if (index === i) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setChartToggles(updatedChartToggles);
    updateToggleState(title, updatedChartToggles);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: labelColors,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: false,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center border-4 p-6 rounded-xl">
      <div>
        <h2 className="m-4 text-xl bold">{title}</h2>
      </div>
      <Bar data={data} options={options} />
      <div className="my-4 h-72 w-full overflow-y-scroll">
        <table>
          <thead>
            <tr>
              <th className="px-4">Colour</th>
              <th className="px-4">{title}</th>
              <th className="px-4">Toggle</th>
            </tr>
          </thead>
          <tbody className=" h-64 overflow-auto">
            {labels.map((label, index) => (
              <tr key={index} className="h-5">
                <td className="h-8 flex justify-center items-center">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: labelColors[index] }}
                  ></div>
                </td>
                <td className="text-center">{label}</td>
                <td>
                  <ToggleSwitch
                    id={`${title}-${index}`}
                    checked={chartToggles[index].checked}
                    onChange={() => handleToggleChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RangeBarChart;
