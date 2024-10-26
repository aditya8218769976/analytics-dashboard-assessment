import React from "react";
import { VehicleData } from "../utils/types";

interface VehicleCardProps {
  data: VehicleData[];
}

const VehicleCard: React.FC<VehicleCardProps> = ({ data }) => {
  return (
    <div className="vehicle-cards">
      {data.slice(0, 4).map((vehicle, index) => (
        <div key={index} className="vehicle-card">
          <h3>{vehicle.Make}</h3>
          <p>Model: {vehicle.Model}</p>
          <p>Range: {vehicle["Electric Range"]}</p>
          <p>City: {vehicle.city}</p>
          <p>Type: {vehicle.electricVehicleType}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleCard;
