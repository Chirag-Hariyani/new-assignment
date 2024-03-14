import axios from 'axios'; // Adjusted spacing here
import Chart from 'react-apexcharts';
import React, { useState, useEffect } from 'react'; // Adjusted spacing here
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'; // Adjusted spacing here

const LineChart = () => {
  const [apiResponse, setApiResponse] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // Extracting dates, unique counts, and cumulative tweets from the data
  const dates = apiResponse.map((entry) => formatDate(entry?.date2));
  const uniqueCounts = apiResponse.map((entry) => entry?.unique_count);
  const cumulativeTweets = apiResponse.map((entry) => entry?.cumulative_tweets);

  const fetchCustomersByDeviceData = async () => {
    await axios
      .get('http://3.227.101.169:8020/api/v1/sample_assignment_api_4/', {
        auth: {
          username: 'trial',
          password: 'assignment123',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchCustomersByDeviceData();
  }, []);
  // Configuring the chart options
  const options = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dates,
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: [
      {
        title: {
          text: 'Unique Count',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Cumulative Tweets',
        },
      },
    ],
  };

  // Configuring the series data
  const series = [
    {
      name: 'Unique Count',
      data: uniqueCounts,
    },
    {
      name: 'Cumulative Tweets',
      data: cumulativeTweets,
    },
  ];

  return (
    <Card>
      <CardHeader title="Customers By Device" subheader="Customers" />
      <Box sx={{ mx: 3 }}>
        <Chart options={options} series={series} type="line" height={350} />
      </Box>
    </Card>
  );
};

export default LineChart;
