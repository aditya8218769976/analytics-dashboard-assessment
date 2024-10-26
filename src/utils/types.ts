export interface VehicleData {
  censusTract: string;
  baseMSRP: string | number;
  cafvEligibility: string;
  county: string;
  dolVehicleId: string;
  electricUtility: string;
  electricVehicleType: string;
  legislativeDistrict: string;
 "Model Year": string | number;
  postalCode: string;
  vin: string;
  Make: string;           
  Model: string;
  "Electric Range": string;    
  city: string;
  state: string;
  vehicleLocation: string;
}


 
export interface ChartData {
    make: string;
    model: string;
    electricRange: number;
  }
  