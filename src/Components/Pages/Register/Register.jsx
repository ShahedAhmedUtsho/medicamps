import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Auth from '../../../FireBase/Firebase.config';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useContext, useState } from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button';
import { Divider } from 'keep-react';
import logo from "../../../Assets/logo/light.png";
import { Eye, EyeSlash } from 'phosphor-react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Register = () => {
  const { setLoading, openErrorModal, setModelHead, setModelMessage, openSuccessModal, user, logOut, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eye,setEys] = useState(false) 
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .test('has-tld', 'Email must include a top-level domain', function(value) {
        return /\.[a-zA-Z]{2,}$/.test(value);
      }),
    photoURL: yup.string().required("Photo URL is required"),
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = (data) => {
    const name = data.name;
    const password = data.password;
    const photoURL = data.photoURL;
    const email = data.email;
    const isAdmin = false;

    createUserWithEmailAndPassword(Auth, data.email, data.password)
      .then(res => {
        const uid = res.user.uid;
        const mediUserData = { name, photoURL, email, uid, isAdmin };
        setLoading(true);
        console.log("okey login ", res.user);
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
        updateProfile(Auth.currentUser, {
          displayName: data.name,
          photoURL: data.photoURL
        }).then(() => {
          axios.post('https://medicamp-server-tau.vercel.app/mediusers', mediUserData)
            .then(res => {
              console.log(res.data);
              setModelHead("Registration Complete");
              setModelMessage("Account creation is successful");
              openSuccessModal();
              logOut();
              navigate("/login");
            })
            .catch(err => {
              const error = err.message;
              alert(error);
            });
        }).catch((error) => {
          console.log(error.message, " update error");
        });
      })
      .catch(error => {
        const err = error.message;
        console.log(err);
      });
  };

  const GoogleProvider = new GoogleAuthProvider();
  const GoogleLogin = () => {
    signInWithPopup(Auth, GoogleProvider)
      .then(res => {
        setLoading(true);
        const name = res.user.displayName;
        const email = res.user.email;
        const photoURL = res.user.photoURL;
        const uid = res.user.uid;
        const isAdmin = false;
        const mediUserData = { name, email, photoURL, uid, isAdmin };
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
        axios.post('https://medicamp-server-tau.vercel.app/mediusers', mediUserData)
          .then(res => {
            console.log(res.data);
            setModelHead("Registration Complete");
            setModelMessage("Account creation is successful");
            openSuccessModal();
          })
          .catch(err => {
            if (err.response && err.response.status === 409) {
              setModelHead("Login Successful");
              setModelMessage(`Welcome ${res.user.displayName}`);
              openSuccessModal();
            }
          });

        setUser(res.user);
        navigate('/');
        setLoading(false);
      })
      .catch(error => {
        const err = error.message;
        console.log(err);
        setModelHead("ERROR");
        setModelMessage(error);
        openErrorModal();
      });
  };

  return (
    <div className='min-h-screen min-w-screen relative'>
      <Link className='max-w-32 absolute bottom-5 right-5' to="/">
        <img src={logo} alt="" />
      </Link>
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
            <Typography component="h1" className='apple' variant="h5">
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
                    autoFocus
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
                    label="Photo URL"
                    name="photoURL"
                    autoComplete="photoURL"
                    className='apple'
                    error={Boolean(errors.photoURL?.message)}
                    helperText={errors.photoURL?.message}
                    {...register("photoURL")}
                  />
                </Grid>
                <Grid item xs={12}>
                
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
                  <Link to="/login" className='apple'>
                    Already have an account? Sign in
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
};

export default Register;
