// components/MyBooleanChart.js
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const MyBooleanChart = ({ title, dataValues, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: title, // Use the title prop here
        data: dataValues, // Use the dataValues prop here
        backgroundColor: ["green", "grey"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title, // Use the title prop here
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MyBooleanChart;
