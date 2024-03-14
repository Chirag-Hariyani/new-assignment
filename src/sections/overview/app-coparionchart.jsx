import React from 'react';
import Chart from 'react-apexcharts'; // Adjusted spacing here
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'; // Adjusted spacing here
import localData from 'src/staticData.json'; // Adjusted spacing here

const ChartComponent = () => {
    const data=[localData.comparisons][0];
  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.map(item => item.Month),
    },
  };

  const series = [
    { name: 'This Year', data: data.map(item => item.This_year) },
    { name: 'Last Year', data: data.map(item => item.Last_year) },
    
  ];

  return (
    <Card>
      <CardHeader title="Comparisons" subheader="Comparisons to Last Year" />
      <Box sx={{ mx: 3 }}>
      <Chart options={options} series={series} type="line" width={600} height={400} /> 
      </Box>    
    </Card>
  );
};

export default ChartComponent;
