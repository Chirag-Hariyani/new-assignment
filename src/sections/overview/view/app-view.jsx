
import { useState, useEffect } from 'react'; // Adjusted spacing here
import axios from 'axios'; // Adjusted spacing here
import Box from '@mui/material/Box'; // Adjusted spacing here
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography'; // Adjusted spacing here

import Iconify from 'src/components/iconify'; // Adjusted spacing here
import { TopProducts as ProductsView } from 'src/sections/top-products/view/index'; // Adjusted spacing her
import LineChart from '../app-customers-by-device';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppComparisionVisits from '../app-coparionchart';
// ----------------------------------------------------------------------

export default function AppView() {
  const [dashBoardCounts, setDashboardCounts] = useState({});
  const [performanceDetails, setPerformanceDetails] = useState({});
  const [communityFeedBackDetails, setCommunityFeedBackDetails] = useState({});

  const fetchPerformance = async () => {
    await axios
      .get('http://3.227.101.169:8020/api/v1/sample_assignment_api_3/', {
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
        setPerformanceDetails(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
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

        <Grid xs={12} md={6} lg={4}>
          {performanceDetails && (
            <AppCurrentVisits
              title={performanceDetails?.title || ''}
              message={performanceDetails?.message || ''}
              chart={{
                series: [
                  { label: performanceDetails?.title || '', value: performanceDetails?.score || 0 },
                ],
              }}
            />
          )}
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <LineChart />
        </Grid>

        {/* Community Feedback */}
        <Grid xs={12} md={6} lg={4}>
          {/*  */}
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
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Box
                sx={{
                  width: communityFeedBackDetails.neutral,
                  height: 8,
                  borderRadius: 1,
                  bgcolor: '#e9e06fc7',
                  '&:hover': {
                    bgcolor: '#e9e06fc7',
                  },
                }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Box
                sx={{
                  width: communityFeedBackDetails.positive,
                  height: 8,
                  borderRadius: 1,
                  bgcolor: '#51ff9fd1',
                  '&:hover': {
                    bgcolor: '#51ff9fd1',
                  },
                }}
              />
            </Grid>
            {/*  */}
          </Grid>

          {communityFeedBackDetails && (
            <AppTrafficBySite
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
            />
          )}
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <ProductsView />
        </Grid>
      </Grid>
    </Container>
  );
}
