
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signInWithEmailAndPassword } from 'firebase/auth';
import Auth from '../../../FireBase/Firebase.config';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = ()=> {


  const { setLoading,setUser,setModelHead , setModelMessage,openSuccessModal,openErrorModal} = useContext(AuthContext)

const navigate = useNavigate()

  const validationSchema = yup.object().shape({
   
    email: yup.string().email().required("email is required"),
  
    password: yup.string()
.required('Password is required')

  
    
    })
    
const {register,handleSubmit,formState :{errors}} =useForm({
resolver:yupResolver(validationSchema),



})









const handleLogin = (data) => {



  signInWithEmailAndPassword(Auth,data.email,data.password)
  .then (res=> {
    setLoading(true)
    setUser(res.user)
    const currentUser = res.user.uid ;
    // tokenCrate(currentUser)
    console.log("login succesfully" , res.user) ; 
    setModelHead("Login Sucsessfull") ;
    setModelMessage( `wellcome ${res.user.displayName}`)
    openSuccessModal()
    
   
setLoading(false)

console.log("before navigate")
navigate(location?.state?location.state : '/')
console.log("after navigate")

  })
  .catch(err =>{
    const error = err.message ;
    setModelHead("ERROR") ;
    setModelMessage(error) ;
    openErrorModal()
  })




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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{ mt: 1 }}>
         
<TextField
                   margin="normal"
                 fullWidth
                 id="email"
                 autoFocus
                 type='email'
                 label="Email Address"
                 name="email"
                 autoComplete="email"
                 className='apple'
                 error={Boolean(errors.email?.message)}
                 helperText={errors.email?.message}
                 {...register("email")}
               />

<TextField
                  margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" >
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <Link  to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
  );
}
export default Login;