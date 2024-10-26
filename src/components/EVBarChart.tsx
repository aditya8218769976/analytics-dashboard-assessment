import React, { useState } from "react";
import BarChart from "./Charts";
import { VehicleData } from "../utils/types";

const EVBarChart: React.FC<{ data: VehicleData[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 100;

  if (!Array.isArray(data) || data.length === 0) {
    console.error("Data is either undefined or not an array:", data);
    return <div>No data available</div>;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const series = [
    {
      name: "Electric Range",
      data: paginatedData.map((vehicle) => {
        const range = Number(vehicle["Electric Range"]);
        return !isNaN(range) ? range : 0;
      }),
      labels: paginatedData.map((vehicle) => vehicle.Make),
    },
  ];

  const options = {
    chart: {
      type: "bar" as "bar",
    },
    title: {
      text: "Electric Vehicle Range by Make",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <BarChart options={options} series={series} type="bar" />
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EVBarChart;
