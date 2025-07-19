import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); 

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
       </Elements>
    );
};

export default Payment;