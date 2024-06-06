import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'keep-react';
import React from 'react';

const CheckOutForm = () => {
    const stripe = useStripe() ;
    const elements = useElements()
    const handleSubmit = e=>{
        e.preventDefault() ;
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
          const card = elements.getElement(CardElement)



    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
                <Button className='my-5' type='submit'>pay</Button>
            </form>
        </div>
    );
};

export default CheckOutForm;