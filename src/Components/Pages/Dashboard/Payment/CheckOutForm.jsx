import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'keep-react';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { Padding } from '@mui/icons-material';
const CheckOutForm =({payment_camp}) => {
  const [clientSecret,setClientSecret] = useState("")
  const [error,setError] = useState("") ;
  const [transactionID,setTransactionID] = useState("")
  const [submit,setSubmit] = useState(false)
    const stripe = useStripe() ;
    const {user,
    
      setModelHead,
      setModelMessage,
     
      openSuccessModal,
     
    } = useContext(AuthContext)
    const elements = useElements() ;
const fees= payment_camp.fees

useEffect(() => {

  axios.post('https://medicamp-server-tau.vercel.app/create-payment-intent',{price:fees})
  .then(res=>{
    const data = res.data ;
    const clientSecret = data.clientSecret ;
    setClientSecret(clientSecret)
   
  })

  return () => {
  
  }
}, [fees])

    const handleSubmit =  async e=>{
        e.preventDefault() ;
        setSubmit(true)
        
        if (!stripe || !elements) {
          console.log("return")
            return;
          }
          const card = elements.getElement(CardElement)
if(card === null){
  console.log("card is null",card) ;
  console.log("return")
  return
}

const {error,paymentMethod} = await stripe.createPaymentMethod({
  type:'card' ,
  card

})

if (error) {
  
  setError(error.message," from payment method")
} else {

  setError("")
}



// confurm payment ; 

const {paymentIntent,error : confirmError} = await stripe.confirmCardPayment(clientSecret,{
  payment_method:{
    card:card ,
    billing_details :{
      email:user?.email || "anonymous",
      name:user?.displayName || "anonymous",
    }
  }
})


 if(confirmError){
  console.log('confirm error')
}else{
 
if(paymentIntent.status === 'succeeded') {
  setTransactionID(paymentIntent.id) ;

const payment = {
  registeredCampID : payment_camp._id,
  ParticipantEmail : user.email ,
  ParticipantName:user.displayName,
  camp_name : payment_camp.name , 
  confirmationStatus : payment_camp.confirmationStatus ,
  fees : fees ,
  date : new Date(),
  campID : payment_camp._id ,
  transactionID: paymentIntent.id ,
  ParticipantUID:payment_camp.ParticipantUID,
  
}
 axios.post('https://medicamp-server-tau.vercel.app/payments',payment)
.then(res=>{

  setModelHead("payment successful") ;
  setModelMessage(`your Transaction ID is ${paymentIntent.id}`) ;
  openSuccessModal()
  console.log(
    'payment saved'
  )

})
.catch(err =>{
  console.log(err.message)
})


}








}





console.log("end")

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            <CardElement className='mb-20'
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
       {error &&  <p className='text-red-500'>error: {error}</p>}
       {transactionID &&  <p className='text-green-500'>succeeded: your transaction ID is {transactionID}</p>}
                <Button disabled={!stripe || !clientSecret || submit || payment_camp?.paymentStatus === "paid"   } className='my-10 ' type='submit'>pay</Button>

            </form>
        </div>
    );
};
CheckOutForm.propTypes = {
  payment_camp:PropTypes.object
}
export default CheckOutForm;