import { useFormik } from "formik"; // Adjusted spacing here
import { useState } from 'react'; // Adjusted spacing here
import axios from 'axios'; // Adjusted spacing here
import * as Yup from 'yup'; // Adjusted spacing here
import { useSnackbar } from "notistack"; // Adjusted spacing here
import { useRouter } from 'src/routes/hooks'; // Adjusted spacing here


// import Logo from 'src/components/logo';
import Box from '@mui/material/Box'; // Adjusted spacing here
import { bgGradient } from 'src/theme/css'; // Adjusted spacing here
import Iconify from 'src/components/iconify'; // Adjusted spacing here
import Link from '@mui/material/Link'; // Adjusted spacing here
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from "@mui/material/CircularProgress";
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';



// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const textInitValues = {
    userName:"",
    password:""
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: textInitValues,
    validationSchema: Yup.object({
      userName: Yup.string().required("User Name is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {        
        await axios.post('http://3.227.101.169:8020/api/v1/login',{
      "email": "string",
      "phone_number": "string",
      "input_code": 0,password:values.password,username:values.userName})
      .then(response => {
        if(response?.data.message==="Incorrect Username" || response?.data.message==="Incorrect Password"){
          setLoading(false); 
          enqueueSnackbar(response?.data.message, {
            variant: "error",
          });
        }else{
        // Handle success
        enqueueSnackbar(response?.data.message, {
          variant: "success",
        });
        localStorage.removeItem('userLogin')
        localStorage.setItem('userLogin','Y')
         router.push('/');
        }
       
      })
      .catch(error => {
        enqueueSnackbar("Failed to Login", {
          variant: "error",
        });
      });
      } catch (error) {
        enqueueSnackbar("Failed to Login", {
          variant: "error",
        });
        setLoading(false); 
      } 
      finally{
        setLoading(false);
      }
       
    },
  });
  const renderForm = (
    
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
      
        <TextField name="userName" label="User Name"  
        value={formik.values.userName}
         onChange={formik.handleChange}
         error={formik.touched.userName && Boolean(formik.errors.userName)}
         helperText={formik.touched.userName && formik.errors.userName} />

        <TextField
          name="password"
          label="Password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password} 
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={formik.handleSubmit}
      >
        {loading ? <CircularProgress size={20} /> : "Login"}
      </LoadingButton>
      </form>
  
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Portal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
