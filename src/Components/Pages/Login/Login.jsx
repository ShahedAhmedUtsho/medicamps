
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Auth from '../../../FireBase/Firebase.config';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import GoogleButton from 'react-google-button';
import { Divider } from 'keep-react';

import logo from "../../../Assets/logo/light.png"
import axios from 'axios';
import { Eye, EyeSlash } from 'phosphor-react';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = ()=> {
const [eye,setEys] = useState(false)

  const { setLoading,setUser,setModelHead , setModelMessage,openSuccessModal,openErrorModal} = useContext(AuthContext)

const navigate = useNavigate()
const location = useLocation()

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
// jwtjwtjwt
    const user = res.user.uid ;
    const jwtUser = {user} ;
    console.log(jwtUser)


    axios.post('https://medicamp-server-tau.vercel.app/jwt',jwtUser,{withCredentials:true})
    .then(res=>{
      const data = res.data ;
      console.log(data) ;

    })
    // jwtjwtjwt




    // const currentUser = res.user.uid ;
    // tokenCrate(currentUser)
    console.log("login succesfully" , res.user) ; 
    setModelHead("Login Sucsessfull") ;
    setModelMessage( `wellcome ${res.user.displayName}`)
    openSuccessModal()
    
   
setLoading(false)


navigate(location?.state?location.state : '/')


  })
  .catch(err =>{
    const error = err.message ;
    setModelHead("ERROR") ;
    setModelMessage(error) ;
    openErrorModal()
  })




};



const GoogleProvider = new GoogleAuthProvider() ;
const GoogleLogin = ()=>{
  signInWithPopup(Auth,GoogleProvider)
  .then(res => {
    setLoading(true)
   const name = res.user.displayName ;
   const email = res.user.email ;
   const photoURL = res.user.photoURL ; 
   const uid = res.user.uid ;
   const isAdmin = false ;
   const mediUserData = {name,email,photoURL,uid,isAdmin}
 // jwtjwtjwt


 const user = res.user.uid ;
 const jwtUser = {user} ;
 console.log(jwtUser)

 
 axios.post('https://medicamp-server-tau.vercel.app/jwt',jwtUser,{withCredentials:true})
 .then(res=>{
   const data = res.data ;
   console.log(data) ;

 })
 // jwtjwtjwt
   axios.post('https://medicamp-server-tau.vercel.app/mediusers',  mediUserData )
   .then(res=>{


    

     setModelHead("Registration Complete");
             setModelMessage("Account creation is successful");
             openSuccessModal();
            
           
   })
   .catch(err =>{
   
     if (err.response && err.response.status === 409) {
      setModelHead("Login Sucsessfull") ;
     setModelMessage( `wellcome ${res.user.displayName}`)
     openSuccessModal(); 
  } 
    
   })








    // const currentUser = res.user.uid ;
      // tokenCrate(currentUser)
    // console.log(currentUser)

    setUser(res.user)
    navigate(location?.state?location.state : '/') ;
  
    setLoading(false);
 
    

  })
.catch(error => {
  const err = error.message ;
  console.log(err);
  setModelHead("ERROR") ;
  setModelMessage(error) ;
  openErrorModal()
})

}



  return (
   <div className='min-h-screen min-w-screen  relative'>
    <Link className='max-w-32 absolute bottom-5 right-5' to="/">
    <img src={logo}  alt="" />
    </Link>
   
     <ThemeProvider  theme={defaultTheme}>
      <Container component="main" maxWidth="xs"  >
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

<div className='relative'>
<TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={eye?"text":"password"}
                  id="password"
                  autoComplete="new-password"
                  className='apple'
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password")}
                />
               <span onClick={()=>{setEys(!eye)}} className=' absolute right-5 text-[#b8b8b8] top-9'> {eye?<Eye  size={19} />:<EyeSlash size={19} />}</span>
</div>

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
          <Divider className='my-2'>Or</Divider>
        
        <GoogleButton
        label='Continue with Google'
  onClick={GoogleLogin}
/>
          
         
        </Box>
      
      </Container>
    </ThemeProvider>

   </div>
  );
}
export default Login;