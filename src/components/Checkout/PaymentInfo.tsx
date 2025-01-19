import React, { useEffect } from "react";
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

/**
 * To Test Different Cards Navigate to:
 * https://docs.stripe.com/testing
 */

const stripePromise = loadStripe("pk_test_51Qi3baBG9tYGehHgln5WSTdSu0SXi1qokPCeVzBVc7UIPfIWRJ9MI6pijF59a7dT48M5q3jEJpTvXaP1w1SYeU0Q00tN4mJ4iW");

interface PaymentInfo {
    clientSecret: string | null;
    triggerPayNow: boolean;
    setTriggerPayNow: (triggerPayNow: boolean) => void;
    onPaymentStatusChange: (status: "succeeded" | "failed" | "processing") => void;
}

const PaymentInfo = ({
    clientSecret,
    triggerPayNow,
    setTriggerPayNow,
    onPaymentStatusChange,
} : PaymentInfo) => {
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
                    <PaymentForm
                        onPaymentStatusChange={onPaymentStatusChange}
                        triggerPayNow={triggerPayNow}
                        setTriggerPayNow={setTriggerPayNow}
                    />
                </Elements>
            )}
        </div>
    );
};

const PaymentForm = ({
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

export default PaymentInfo;
