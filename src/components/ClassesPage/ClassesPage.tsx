import React, { useState, useEffect } from 'react';
import { Dayjs } from "dayjs";
import {
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Box,
} from "@mui/material";

import SelectClassOrPass from "components/ClassesPage/Steps/SelectClassOrPass";
import PaymentInfo from "components/Checkout/PaymentInfo";

import { ClassType } from "api/types/ClassesTypes";
import PaymentService from "api/services/PaymentService";
import CompleteCheckout from "components/ClassesPage/Steps/CompleteCheckout";

const steps = [
    {
        label: "Select classes",
        description: "Select a classes to register for. You can also buy a pass to save cash!"
    },
    {
        label: "Payment Info",
        description: "Provide payment info. If you're a member we automatically save your card info for faster checkout!"
    },
    {
        label: "Complete Checkout",
        description: "You're almost done on completing your next step on becoming a dancer! \n Verify all information is correct."
    }
];

const ClassesPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [selectedClassType, setSelectedClassType] = useState(ClassType.BEGINNER);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedAmount, setSelectedAmount] = useState(0);

    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const createPaymentIntent = async () => {
        try {
            const { data } = await PaymentService
                .createPaymentIntent({ amount: selectedAmount * 100 });

            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Error creating payment intent:", error);
            setClientSecret(null);
        }
    };

    useEffect(() => {
        if (selectedAmount !== 0 && selectedDate !== null) {
            createPaymentIntent();
        }
    }, [selectedAmount, selectedDate]);

    return (
        <Box sx={{ width: '100%', marginTop: 10}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel optional={
                            index === steps.length - 1 ? (
                                <Typography variant="caption">Last Step</Typography>
                            ) : null
                        }>
                            {step.label}
                        </StepLabel>

                        <StepContent>
                            <Typography variant="h6">{step.description}</Typography>

                            {index === 0 && (
                                <SelectClassOrPass
                                    selectedDate={selectedDate}
                                    selectedAmount={selectedAmount}
                                    selectedClassType={selectedClassType}
                                    setSelectedClassType={setSelectedClassType}
                                    setSelectedDate={setSelectedDate}
                                    setSelectedAmount={setSelectedAmount}
                                />
                            )}

                            {index === 1 && (
                                <PaymentInfo
                                    selectedAmount={selectedAmount}
                                    clientSecret={clientSecret}
                                />
                            )}

                            { index === 2 && (
                                <CompleteCheckout
                                    selectedDate={selectedDate}
                                    selectedClassType={selectedClassType}
                                    selectedPrice={selectedAmount}
                                / >
                            )}

                            <Box style={{ marginTop: 20 }} sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1}}
                                    disabled={ selectedAmount === 0 || selectedDate === null }
                                >
                                    {index == steps.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1}}>
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ClassesPage;