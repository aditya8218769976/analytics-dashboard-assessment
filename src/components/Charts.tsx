import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  options: any;
  series: { name: string; data: number[]; labels: string[] }[];
  type: string;
}

const BarChart: React.FC<BarChartProps> = ({ options, series }) => {
  if (series.length === 0) {
    return null;
  }

  const chartData = {
    labels: series[0].labels,
    datasets: [
      {
        label: series[0].name,
        data: series[0].data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
