import { Button,Input } from 'keep-react';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ErrorMessage } from '@hookform/error-message';


const Login = () => {

const validationSchema = yup.object().shape({
name: yup.string().required("Name is required"),
email: yup.string().email().required("email is required"),
photoURL: yup.string().required("photoURL is required"),
gender:yup.string().required("Select your gender").label("Gender"),
department:yup.string().required("select your department")

})



const {register,handleSubmit,formState:{errors}} =useForm({
    resolver:yupResolver(validationSchema),

})



    const handelRegister = data =>{
       
        alert(JSON.stringify(data))

    }
    return (
        <div className=' w-full h-screen flex justify-center items-center'>
             <form onSubmit={handleSubmit(handelRegister)} className='flex border-2 p-2 w-96 flex-col gap-5' >
                <label htmlFor="name" >Name</label>
                <Input
                 type="text" 
                 name="name" 
                 id="name" 
                 required
                 placeholder='your name'
                 {...register("name")}
                  />
               
                    
                  <ErrorMessage 
                  errors={errors} name={'name'}
                  render={(m)=> <p className='text-red-500'> {m.message}
                </p>

                  }
                  
                 />
                    
                    
                    

                 

                <label htmlFor="email" >Email</label>


                <Input
                 type="email"
                  name="email"
                   id="email" 
                   required
                   placeholder='your email'
                   {...register("email")} 
                   
                   />
                    <ErrorMessage 
                  errors={errors} name={'email'}
                  render={(m)=> <p className='text-red-500'> {m.message}
                </p>

                  }
                  
                 />
 
                   <label htmlFor="email" >photoURL</label>


                <Input
                 type="text"
                  name="photoURL"
                   id="photoURL" 
                   required
                   placeholder='your photoURL'
                   {...register("photoURL")} 
                   
                   />
 <ErrorMessage 
                  errors={errors} name={'photoURL'}
                  render={(m)=> <p className='text-red-500'> {m.message}
                </p>

                  }
                  
                 />



<div className='flex flex-col'>
    <label htmlFor="gender ">gender</label>
    <select name="gender" id="gender" {...register("gender")} className='p-2 border'>
    <option value=""> select your gender</option>
<option value="male">male</option>
<option value="female">female</option>

    </select>

</div>
<ErrorMessage 
                  errors={errors} name={'gender'}
                  render={(m)=> <p className='text-red-500'> {m.message}
                </p>

                  }
                  
                 />
<div >

<label htmlFor="department"></label>

<input className=" ml-5" value="CSE" name='department' type="radio" id='CSE' {...register("department")} />
<label className=" ml-2" htmlFor="CSE">CSE</label>

<input className=" ml-5" value="EEE" name='department' type="radio" id='EEE' {...register("department")} />
<label  className=" ml-2" htmlFor="EEE">EEE</label>

<input className=" ml-5" value="BBA"  name='department' type="radio" id='BBA' {...register("department")} />
<label className=" ml-2" htmlFor="BBA">BBA</label>



</div> 

<ErrorMessage 
                  errors={errors} name={'department'}
                  render={(m)=> <p className='text-red-500'> {m.message}
                </p>

                  }
                  
                 />


                <Button type='submit'>Sign Up</Button>
                
                
             </form>
            
        </div>
    );
};

export default Login;