import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY)
const Payment = () => {
    
    return (
        <div>
           <Elements stripe={stripePromise} >
            <CheckOutForm></CheckOutForm>


           </Elements>
        </div>
    );
};

export default Payment;