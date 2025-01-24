import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
    loadStripe,
    Stripe,
} from "@stripe/stripe-js";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import {
    Box,
    CircularProgress,
} from "@mui/material";

/**
 * To Test Different Testing Credit Cards Navigate to:
 * https://docs.stripe.com/testing
 */

let stripePromise: Promise<Stripe>;

if (window.location.hostname === "localhost") {
    stripePromise = loadStripe("pk_test_51Qi3baBG9tYGehHgln5WSTdSu0SXi1qokPCeVzBVc7UIPfIWRJ9MI6pijF59a7dT48M5q3jEJpTvXaP1w1SYeU0Q00tN4mJ4iW")
} else {
    stripePromise = loadStripe("pk_live_51Qi3baBG9tYGehHgixBUqLVCkj3WBURoFcODMvNfOOUODfMyBziWhKr3WoxNtUyubgIlXTMxlpTMsoqOMuyYR2iX00LNhuHb1G");
}

interface PaymentFormProps {
    clientSecret: string | null;
    triggerPayNow: boolean;
    setTriggerPayNow: (triggerPayNow: boolean) => void;
    onPaymentStatusChange: (status: "succeeded" | "failed" | "processing") => void;
}

const PaymentForm = ({
    clientSecret,
    triggerPayNow,
    setTriggerPayNow,
    onPaymentStatusChange,
} : PaymentFormProps) => {
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
                    <PaymentFormHelper
                        onPaymentStatusChange={onPaymentStatusChange}
                        triggerPayNow={triggerPayNow}
                        setTriggerPayNow={setTriggerPayNow}
                    />
                </Elements>
            )}
        </div>
    );
};

const PaymentFormHelper = ({
    onPaymentStatusChange,
    triggerPayNow,
    setTriggerPayNow,
}: {
    onPaymentStatusChange: (status: "succeeded" | "failed" | "processing") => void;
    triggerPayNow: boolean;
    setTriggerPayNow: (triggerPayNow: boolean) => void;
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async () => {
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
            },
            redirect: "if_required",
        });

        if (error) {
            onPaymentStatusChange('failed');
        } else if (paymentIntent?.status === 'succeeded') {
            onPaymentStatusChange('succeeded');
        } else {
            onPaymentStatusChange('processing');
        }

        setTriggerPayNow(false);
    };

    useEffect(() => {
        if (triggerPayNow) {
            submitPayment();
        }
    }, [triggerPayNow]);

    return (
        <Box>
            <PaymentElement />
        </Box>
    );
};

export default PaymentForm;
