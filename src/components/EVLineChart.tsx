// src/components/EVLineChart.tsx
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { VehicleData } from "../utils/types";

// Register necessary Chart.js components
ChartJS.register(PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

interface EVLineChartProps {
  data: VehicleData[];
  selectedCompany: string;
}

const EVLineChart: React.FC<EVLineChartProps> = ({ data, selectedCompany }) => {
  // Filter data by selected company
  const filteredData = data.filter((item) => item.Make === selectedCompany || selectedCompany === "All");

  // Aggregate data by Model Year for the line chart
  const electricRangeByYear = filteredData.reduce((acc, item) => {
    const modelYear = item["Model Year"];
    const electricRange = parseFloat(item["Electric Range"]); // Convert to number

    // Only proceed if the electric range is valid
    if (!isNaN(electricRange)) {
      if (!acc[modelYear]) acc[modelYear] = [];
      acc[modelYear].push(electricRange);
    }
    return acc;
  }, {} as Record<string, number[]>);

  // Process data for the line chart
  const chartData = {
    labels: Object.keys(electricRangeByYear).sort(),
    datasets: [
      {
        label: "Average Electric Range by Model Year",
        data: Object.keys(electricRangeByYear)
          .sort()
          .map((year) => {
            const validRanges = electricRangeByYear[year];
            // Calculate average only if we have valid ranges
            if (validRanges.length > 0) {
              const total = validRanges.reduce((acc, curr) => acc + curr, 0);
              return Math.round(total / validRanges.length);
            }
            return 0; // Return 0 if no valid ranges
          }),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        lineTension: 0.4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartOptions: Partial<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Model Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Electric Range (miles)",
        },
      },
    },
  };

  useEffect(() => {
    // Cleanup function to destroy chart instance on unmount
    return () => ChartJS.getChart("chartID")?.destroy();
  }, []);

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Line id="chartID" data={chartData} options={chartOptions} />
    </div>
  );
};

export default EVLineChart;
