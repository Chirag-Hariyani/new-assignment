
import { useState, useEffect } from 'react'; // Adjusted spacing here
import axios from 'axios'; // Adjusted spacing here
import ReactApexChart from 'react-apexcharts'; // Import ReactApexChart

import Box from '@mui/material/Box'; // Adjusted spacing here 
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography'; // Adjusted spacing here
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// import Iconify from 'src/components/iconify'; // Adjusted spacing here
import { TopProducts as ProductsView } from 'src/sections/top-products/view/index'; // Adjusted spacing her
import LineChart from '../app-customers-by-device';
// import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
import AppComparisionVisits from '../app-coparionchart';
// ----------------------------------------------------------------------

export default function AppView() {
  const [dashBoardCounts, setDashboardCounts] = useState({});
  const [performanceDetails, setPerformanceDetails] = useState({});
  const [communityFeedBackDetails, setCommunityFeedBackDetails] = useState({});
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);


  const fetchPerformance = async () => {
    try {
      const response = await axios.get('http://3.227.101.169:8020/api/v1/sample_assignment_api_3/', {
        auth: { username: 'trial', password: 'assignment123' },
        headers: { 'Content-Type': 'application/json' },
      });
      setPerformanceDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCommunityFeedback = async () => {
    await axios
      .get('http://3.227.101.169:8020/api/v1/sample_assignment_api_5/', {
        auth: {
          username: 'trial',
          password: 'assignment123',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle success
        setCommunityFeedBackDetails(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  const fetchDashboardData = async () => {
    await axios
      .get('http://3.227.101.169:8020/api/v1/sample_assignment_api_1/', {
        auth: {
          username: 'trial',
          password: 'assignment123',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle success
        setDashboardCounts(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
  useEffect(() => {
    fetchDashboardData();
    fetchPerformance();
    fetchCommunityFeedback();
  }, []);


  useEffect(() => {
    if (performanceDetails && performanceDetails.score !== undefined) {
      const { score, title, message } = performanceDetails;
      const updatedOptions = {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: [title],
        headers: [message]
      };

      const updatedSeries = [score];

      setOptions(updatedOptions);
      setSeries(updatedSeries);
    }
  }, [performanceDetails]);



  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Purchases"
            total={dashBoardCounts?.purchases || 0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Revenue"
            total={dashBoardCounts?.revenue || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Refunds"
            total={dashBoardCounts?.refunds || 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppComparisionVisits />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card p={2} sx={{ width: "100%", ml: 2, mt: 1 }} >
            {performanceDetails && performanceDetails.score !== undefined && (
              <Box id="chart">
                <ReactApexChart options={options} series={series} type="radialBar" height={350} />
              </Box>
            )}
            <Divider flexItem variant='middle' />
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontSize: "16px" }}>Your  performance is better than others</Typography>
              <Button sx={{ fontSize: "12px", borderRadius: "20px", textTransform: 'capitalize', mt: 1 }} variant='outlined' color='inherit'>Improve your score</Button>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <LineChart />
        </Grid>

        {/* Community Feedback */}
        <Grid xs={12} md={6} lg={4}>
          {/*  */}

          <Card sx={{
            height: '100%',
          }}>
            <Typography sx={{ my: '2rem', textAlign: 'center' }}>Community Feedback</Typography>
            <Typography variant='h6' sx={{ my: '2rem', textAlign: 'center' }}>Mostly Positive</Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {communityFeedBackDetails && (
                <Grid container spacing={1}>
                  <Grid xs={12} md={6} lg={4}>
                    <Box
                      sx={{
                        width: communityFeedBackDetails.negative,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: '#e984bceb',
                        '&:hover': {
                          bgcolor: '#e984bceb',
                        },
                      }}
                    />
                    <Box sx={{ m: 1 }}>
                      <Typography>{communityFeedBackDetails.negative}</Typography>
                      <Typography>Negative</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} lg={4}>
                    <Box
                      sx={{
                        width: communityFeedBackDetails.neutral,
                        height: 8,
                        borderRadius: 1,
                        ml: '50px',
                        bgcolor: '#e9e06fc7',
                        '&:hover': {
                          bgcolor: '#e9e06fc7',
                        },
                      }}
                    />
                    <Box sx={{ m: 1 }}>
                      <Typography>{communityFeedBackDetails.neutral}</Typography>
                      <Typography >neutral</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} lg={4}>
                    <Box
                      sx={{
                        width: communityFeedBackDetails.positive,
                        height: 8,
                        borderRadius: 1,
                        ml: '50px',
                        bgcolor: '#51ff9fd1',
                        '&:hover': {
                          bgcolor: '#51ff9fd1',
                        },
                      }}
                    />
                    <Box sx={{ m: 1 }}>
                      <Typography>{communityFeedBackDetails.positive}</Typography>
                      <Typography variant='subtitle2'>positive</Typography></Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Card>


          {/* <AppTrafficBySite
            title="Community Feedback"
            list={[
              {
                name: 'Negative',
                value: communityFeedBackDetails.negative,
                icon: <Iconify icon="eva:minus-circle-fill" color="#FF0000" width={32} />,
              },
              {
                name: 'Positive',
                value: communityFeedBackDetails.positive,
                icon: <Iconify icon="eva:plus-circle-fill" color="#00CC00" width={32} />,
              },
              {
                name: 'Natural',
                value: communityFeedBackDetails.neutral,
                icon: <Iconify icon="eva:plus-circle-fill" color="#006097" width={32} />,
              },
            ]}
          /> */}

        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <ProductsView />
        </Grid>
      </Grid>
    </Container >
  );
}


