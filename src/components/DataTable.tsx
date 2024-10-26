import React, { useState } from "react";
import { VehicleData } from "../utils/types";

interface DataTableProps {
  data: VehicleData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Electric Range</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.Make}</td>
              <td>{vehicle.Model}</td>
              <td>{vehicle["Electric Range"]}</td>
              <td>{vehicle.city}</td>
              <td>{vehicle.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
