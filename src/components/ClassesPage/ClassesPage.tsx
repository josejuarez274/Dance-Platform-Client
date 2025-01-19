import React, { useContext, useEffect, useState } from 'react';
import { Dayjs } from "dayjs";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import UserContext from "providers/User/UserContext";

import ClassScheduler from "components/ClassesPage/Steps/ClassScheduler";
import PaymentInfo from "components/Checkout/PaymentInfo";
import CheckoutInfo from "components/ClassesPage/Steps/CheckoutInfo";
import WizardButtons from "components/shared/Wizard/WizardButtons";

import { ClassType } from "api/types/ClassesTypes";
import PaymentService from "api/services/PaymentService";

const steps = [
    {
        label: "Select Class or Pass",
        description: "Select a classes to register for. You can also buy a pass to save cash!"
    },
    {
        label: "Verify Shopping Cart",
        description: "Verify all information is correct.",
    },
    {
        label: "Payment Information",
        description: "Provide payment info. If you're a member we automatically save your card info for faster checkout!"
    },
    {
        label: "Checkout Complete",
        description: "Congrats on becoming one step closer to your dancing goals!"
    }
];

// TODO: Cash API CAlls especially calendar

const ClassesPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [selectedClassType, setSelectedClassType] = useState(ClassType.BEGINNER);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedAmount, setSelectedAmount] = useState(20);
    const [selectedEmail, setSelectedEmail] = useState('');

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [clientSecretError, setClientSecretError] = useState(null);
    const [triggerPayNow, setTriggerPayNow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"succeeded" | "failed" | "processing" | null>(null);

    const user = useContext(UserContext);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        if (activeStep === 1) {
            setSelectedAmount(20);
            setSelectedDate(null);
            setClientSecretError(null);
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
        setSelectedClassType(ClassType.BEGINNER);
        setSelectedDate(null);
        setSelectedAmount(20);
        setSelectedEmail('');
        setClientSecret(null);
        setClientSecretError(null);
        setTriggerPayNow(false);
        setPaymentStatus(null);
    };
    const handlePayNow = async () => {
        setTriggerPayNow(true);
    };
    const handlePaymentStatusChange = (status: "succeeded" | "failed" | "processing") => {
        setPaymentStatus(status);

        if (status === 'succeeded') {
            setActiveStep(3);
        }
        if (status === 'failed') {
            console.error('Payment failed');
        }
    };

    const createPaymentIntent = async () => {
        try {
            const { data } = await PaymentService
                .createPaymentIntent({
                    amount: selectedAmount * 100,
                    description: selectedClassType === ClassType.BEGINNER ? "Beginner Bachata" : "Intermediate Bachata",
                    receipt_email: selectedEmail,
                    metadata: {
                        userId: user?.user?.id || 'GUEST',
                        classType: selectedClassType,
                        date: selectedDate.format("YYYY-MM-DD"),
                        instructor: ''
                    }
                });

            if (data.error) {
                setClientSecret(null);
                setClientSecretError(data.error);
                setActiveStep(1);
            } else {
                setClientSecret(data.clientSecret);
            }
        } catch (error) {
            console.error("*****Error creating payment intent:", error);
        }
    };

    useEffect(() => {
        if (activeStep === 2) {
            createPaymentIntent();
        }
    }, [activeStep]);

    return (
        <Box sx={{ width: '100%', marginTop: 10}}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel optional={
                            index === steps.length - 2 ? (
                                <Typography variant="caption">Last Step</Typography>
                            ) : null
                        }>
                            {step.label}
                        </StepLabel>

                        <StepContent>
                            <Typography variant="h6">{step.description}</Typography>

                            { index === 0 && (
                                <>
                                    <ClassScheduler
                                        selectedDate={selectedDate}
                                        selectedAmount={selectedAmount}
                                        selectedClassType={selectedClassType}
                                        selectedEmail={selectedEmail}
                                        setSelectedClassType={setSelectedClassType}
                                        setSelectedDate={setSelectedDate}
                                        setSelectedAmount={setSelectedAmount}
                                        setSelectedEmail={setSelectedEmail}
                                    />
                                    <WizardButtons
                                        handleNext={handleNext}
                                        handleBack={handleBack}
                                        nextButtonText={"Continue"}
                                        nextDisabled={selectedAmount === 0 || selectedDate === null || selectedEmail === ''}
                                        backDisabled={index === 0}
                                        isLoading={false}
                                    />
                                </>
                            )}

                            { index === 1 && (
                                <>
                                    <CheckoutInfo
                                        checkoutInformationTitle={`Class: ${selectedClassType === ClassType.BEGINNER ? "Beginner Bachata" : "Intermediate Bachata" }`}
                                        checkoutInformationPrice={`Price: $${selectedAmount}`}
                                        checkoutInformationDate={`Date: ${selectedDate?.format('YYYY-MM-DD')}`}
                                    />
                                    {clientSecretError &&
                                        <Alert
                                            severity='error'
                                        >
                                            Stripe Error-Error Creating Payment Intent: {clientSecretError}
                                        </Alert>
                                    }
                                    <WizardButtons
                                        handleNext={handleNext}
                                        handleBack={handleBack}
                                        nextButtonText={"Continue"}
                                        nextDisabled={false}
                                        backDisabled={false}
                                        isLoading={false}
                                    />
                                </>
                            )}

                            { index === 2 && (
                                <>
                                    <PaymentInfo
                                        clientSecret={clientSecret}
                                        triggerPayNow={triggerPayNow}
                                        onPaymentStatusChange={handlePaymentStatusChange}
                                        setTriggerPayNow={setTriggerPayNow}
                                    />
                                    <WizardButtons
                                        handleNext={handlePayNow}
                                        handleBack={handleBack}
                                        nextButtonText={"Pay now"}
                                        nextDisabled={clientSecret === null}
                                        backDisabled={false}
                                        isLoading={triggerPayNow}
                                    />
                                </>
                            )}

                            { index === 3 && (
                                <Box sx={{ marginTop: 2 }}>
                                    <Card variant='outlined'>
                                        <Alert
                                            severity='success'
                                            icon={<CheckIcon fontSize='inherit'/>}>
                                            Payment Status: {paymentStatus}
                                            <br />
                                            Payment ID: {clientSecret}
                                        </Alert>
                                        <CardContent>
                                            <CheckoutInfo
                                                checkoutInformationTitle={`Class: ${selectedClassType === ClassType.BEGINNER ? "Beginner Bachata" : "Intermediate Bachata" }`}
                                                checkoutInformationPrice={`Amount Paid: $${selectedAmount}`}
                                                checkoutInformationDate={`Date: ${selectedDate?.format('YYYY-MM-DD')}`}
                                            />
                                        </CardContent>
                                    </Card>

                                    <WizardButtons
                                        handleNext={() => console.log('open new component')}
                                        handleBack={handleReset}
                                        nextButtonText={"Go to Dashboard"}
                                        backButtonText={"Restart"}
                                        nextDisabled={false}
                                        backDisabled={false}
                                        isLoading={false}
                                    />
                                </Box>
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ClassesPage;