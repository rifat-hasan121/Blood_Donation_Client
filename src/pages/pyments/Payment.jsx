import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(
  "pk_test_51RlWLiP8dtSsTADVbUop6FjIMsdjJnSyKA5eKgwLBSmjJ4SEvrzdMaVsnXEhLjBEUVb6TA2IpYNgnoSh8QiOINBF00LXfuV0v6"
); //pk_test_6pRNASCoBOKtIshFeQd4XMUh

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm/>
       </Elements>
    );
};

export default Payment;