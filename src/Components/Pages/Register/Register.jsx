
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"











// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const   Register= () => {

    
    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("email is required"),
        photoURL: yup.string().required("photoURL is required"),
        password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
      
        
        })
        
const {register,handleSubmit,formState :{errors}} =useForm({
    resolver:yupResolver(validationSchema),



})









  const handleRegister = (data) => {
   alert(JSON.stringify(data))
   console.log(data)
  };










  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1"  className='apple' variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleRegister)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>


            <Grid item xs={12}>
                <TextField
               
                  fullWidth
                  id="Name"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                  className='apple'
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                 {...register("name")}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                 
                  fullWidth
                  id="email"
                  type='email'
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className='apple'
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  id="photoURL"
                  label="photoURL"
                  name="photoURL"
                  autoComplete="photoURL"
                  className='apple'
                  error={Boolean(errors.photoURL?.message)}
                  helperText={errors.photoURL?.message}
                  {...register("photoURL")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className='apple'
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
               
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel className='apple'
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className='apple' >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}



export default Register;