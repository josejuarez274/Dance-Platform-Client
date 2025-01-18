import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import {
    Box,
    CircularProgress,
} from "@mui/material";

const stripePromise = loadStripe("pk_test_51Qi3baBG9tYGehHgln5WSTdSu0SXi1qokPCeVzBVc7UIPfIWRJ9MI6pijF59a7dT48M5q3jEJpTvXaP1w1SYeU0Q00tN4mJ4iW");

interface PaymentInfo {
    selectedAmount: number;
    clientSecret: string | null;
}

const PaymentInfo = ({
    clientSecret,
    selectedAmount
} : PaymentInfo) => {
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    if (!clientSecret) return (
        <Box>
            <CircularProgress />
            <p>Loading payment form...</p>
        </Box>
    );

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm setPaymentStatus={setPaymentStatus} />
                </Elements>
            )}
            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

const PaymentForm = ({ setPaymentStatus }: { setPaymentStatus: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href, // Optional redirect URL
            },
        });

        if (error) {
            setPaymentStatus(`Payment failed: ${error.message}`);
        } else {
            console.warn('*************')
            setPaymentStatus("Payment Succeeded!");
        }
    };

    return (
        <Box>
            <PaymentElement />
        </Box>
    );
};

export default PaymentInfo;
