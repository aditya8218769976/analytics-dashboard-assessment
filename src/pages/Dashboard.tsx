import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import loadCSVData from "../utils/loadCSV";
import { VehicleData } from "../utils/types";
import EVBarChart from "../components/EVBarChart";
import EVLineChart from "../components/EVLineChart";
import Filter from "../components/Filter";
import Loader from "../components/Loader"; // Import the Loader component

const Dashboard = () => {
  const [data, setData] = useState<VehicleData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const getData = async () => {
      try {
        const result: VehicleData[] = await loadCSVData();

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const uniqueCompanies = Array.from(new Set(data.map((vehicle) => vehicle.Make)));

  const filteredItems = selectedCompany === "All" ? data : data.filter((item) => item.Make === selectedCompany);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    setCurrentPage(1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 4, textAlign: "center", backgroundColor: "#e3f2fd", boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#1976d2" }}>
              Total Vehicles
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
              {data.length + 1}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 4, textAlign: "center", backgroundColor: "#e3f2fd", boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#1976d2" }}>
              Unique Companies
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
              {uniqueCompanies.length}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 4, textAlign: "center", backgroundColor: "#e3f2fd", boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold", color: "#1976d2" }}>
              Average Electric Range
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0d47a1" }}>
              {(() => {
                const validRanges = filteredItems.map((item) => parseFloat(item["Electric Range"])).filter((range) => !isNaN(range));
                if (validRanges.length > 0) {
                  const total = validRanges.reduce((acc, curr) => acc + curr, 0);
                  return Math.round(total / validRanges.length);
                }
                return 0;
              })()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Filter selectedCompany={selectedCompany} onCompanyChange={handleCompanyChange} companies={uniqueCompanies} />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "60px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box width="50%" height="25%">
              <EVBarChart data={filteredItems} />
            </Box>
            <Box width="50%" height="25%">
              <EVLineChart data={filteredItems} selectedCompany={selectedCompany} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="vehicle data table">
              <TableHead>
                <TableRow>
                  {["Make", "Model", "Year", "Electric Range"].map((header) => (
                    <TableCell key={header} sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.vin} sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}>
                    <TableCell>{item.Make}</TableCell>
                    <TableCell>{item.Model}</TableCell>
                    <TableCell>{item["Model Year"]}</TableCell>
                    <TableCell>{item["Electric Range"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Pagination count={Math.ceil(filteredItems.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
