// api.ts

import csv from "csvtojson";

const loadCSVData = async () => {
  try {
    const response: Response = await fetch("/Electric_Vehicle_Population_Data.csv");
    
    // Convert response to text
    const csvText = await response.text();
    
    // Parse CSV text to JSON
    const jsonData = await csv().fromString(csvText);
    return jsonData;
  } catch (error) {
    console.error("Error loading CSV data:", error);
    return [];
  }
};

export default loadCSVData;
