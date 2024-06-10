import  { useContext } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
import { Spinner } from 'keep-react';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY)
const Payment = () => {
    const params = useParams()
const {user} = useContext(AuthContext) ;
const id = params.id ;

    const { isLoading,  error, data: payment_camp  } = useQuery({
        queryKey: [`https://medicamp-server-tau.vercel.app/my-registration-camps/single/${user?._id}`],
        queryFn: async () => {
            const response = await fetch(`https://medicamp-server-tau.vercel.app/my-registration-camps/single/${id}`,{credentials:"include"}); 
            return response.json();
        }
    });


console.log(payment_camp)




if (isLoading) return <Spinner />;
if (error) return <div>Error loading data... please try again later.</div>;




    return (
        <div>
           <Elements stripe={stripePromise} >
            <CheckOutForm payment_camp={payment_camp}></CheckOutForm>
          


           </Elements>
        </div>
    );
};

export default Payment;