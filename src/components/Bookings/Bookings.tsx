import React, {useContext, useEffect, useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import {Alert, Box, Card, CardContent, Step, StepContent, StepLabel, Stepper, Typography,} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import UserContext from "providers/User/UserContext";

import BookingScheduler from "components/Bookings/Steps/BookingScheduler";
import PaymentForm from "components/Checkout/PaymentForm";
import CheckoutInfo from "components/Bookings/Steps/CheckoutInfo";
import WizardButtons from "components/shared/Wizard/WizardButtons";

import {
    Class,
    ClassType,
    ClassTypeToDescription,
    PassType,
    PassTypeToDescription,
    PrivateClass
} from "api/types/ClassTypes";
import PaymentService from "api/services/PaymentService";
import {Booking, ClassPassTypeToBookingType} from "api/types/BookingTypes";
import BookingService from "api/services/BookingService";

const steps = [
    {
        label: "Select: Class, Pass, or Private",
        description: "Select a class to register for. You can also buy a pass to save cash! If you need more 1-1 time book a private."
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
const Bookings = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [selectedClassType, setSelectedClassType] = useState(ClassType.BEGINNER);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedPassType, setSelectedPassType] = useState<PassType | null>(null);
    const [selectedPrivateClass, setSelectedPrivateClass] = useState<PrivateClass | null>(null);
    const [selectedPrivateDateTime, setSelectedPrivateDateTime] = useState<Dayjs | null>(null);
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [selectedEmail, setSelectedEmail] = useState('');

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [clientSecretError, setClientSecretError] = useState(null);
    const [triggerPayNow, setTriggerPayNow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<"succeeded" | "failed" | "processing" | null>(null);
    const [createBookingOnPaymentSuccess, setCreateBookingOnPaymentSuccess] = useState(false);

    const user = useContext(UserContext);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        if (activeStep === 1) {
            setSelectedAmount(1);
            setSelectedDate(null);
            setClientSecretError(null);
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
        setSelectedClassType(ClassType.BEGINNER);
        setSelectedDate(null);
        setSelectedAmount(1);
        setSelectedEmail('');
        setClientSecret(null);
        setClientSecretError(null);
        setTriggerPayNow(false);
        setPaymentStatus(null);
        setCreateBookingOnPaymentSuccess(false);
    };

    const handlePayNow = async () => {
        setTriggerPayNow(true);
    };
    const handlePaymentStatusChange = (
        status: "succeeded" | "failed" | "processing"
    ) => {
        setPaymentStatus(status);

        if (status === 'succeeded') {
            setActiveStep(3);
            setCreateBookingOnPaymentSuccess(true);
        }
        if (status === 'failed') {
            console.error('Payment failed');
        }
    };
    const createPaymentIntent = async () => {
        const getPaymentBodyFromClassType = () => {
            switch (selectedClassType) {
                case ClassType.BEGINNER:
                case ClassType.INTERMEDIATE:
                    return {
                        amount: selectedAmount * 100,
                        description: ClassTypeToDescription[selectedClassType],
                        receipt_email: selectedEmail,
                        metadata: {
                            userId: user?.user?.id || 'GUEST' + "_" + selectedClassType + "_" + selectedEmail,
                            classType: selectedClassType,
                            date: selectedDate?.format("YYYY-MM-DD"),
                            instructor: ''
                        }
                    }
                case ClassType.PASSES:
                    return {
                        amount: selectedAmount * 100,
                        description: PassTypeToDescription[selectedPassType],
                        receipt_email: selectedEmail,
                        metadata: {
                            userId: user?.user?.id || 'GUEST' + "_" + selectedClassType + "_" + selectedEmail,
                            classType: selectedClassType,
                        }
                    }
                case ClassType.PRIVATE:
                    return {
                        amount: selectedAmount * 100,
                        description: "Private",
                        receipt_email: selectedEmail,
                        metadata: {
                            userId: user?.user?.id || 'GUEST' + "_" + selectedClassType + "_" + selectedEmail,
                            classType: selectedClassType,
                            date: selectedDate?.format("YYYY-MM-DD"),
                            instructor: ''
                        }
                    }
            }
        }

        try {
            const paymentInfo = getPaymentBodyFromClassType();
            const { data } = await PaymentService.createPaymentIntent(paymentInfo);

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

    const handleCreateBooking = async (
        bookingInfo: Booking) => {
        const bookingResponse = await
            BookingService.createBooking(bookingInfo);
        console.warn('_______', bookingResponse);
    }
    useEffect(() => {
        if (createBookingOnPaymentSuccess) {
            console.warn('------: classtype ', selectedClassType );
            console.warn('------: privateclass ', selectedPrivateClass )
            const bookingInfo: Booking = {
                stripePaymentId: '',
                paymentDate: new Date(),
                amount: selectedAmount,
                email: selectedEmail,

                userId: user?.user?.id || "GUEST" + "_" + selectedEmail,
                classId: selectedClass?.classKey,
                passId: '', // handled by service
                privateClassKey: selectedClassType === ClassType.PRIVATE ? selectedPrivateClass?.classKey : '',

                bookingDate: new Date(),
                bookingType: selectedClassType === ClassType.PASSES ?
                    ClassPassTypeToBookingType[selectedPassType] :
                    ClassPassTypeToBookingType[selectedClassType]
                ,
            };

            handleCreateBooking(bookingInfo);
        }
    }, [createBookingOnPaymentSuccess]);

    console.log(selectedClassType, selectedPassType, selectedDate, selectedAmount, selectedEmail);

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
                                    <BookingScheduler
                                        selectedClass={selectedClass}
                                        selectedDate={selectedDate}
                                        selectedPrivateClass={selectedPrivateClass}
                                        selectedPrivateDateTime={selectedPrivateDateTime}
                                        selectedAmount={selectedAmount}
                                        selectedClassType={selectedClassType}
                                        selectedPassType={selectedPassType}
                                        selectedEmail={selectedEmail}
                                        setSelectedClassType={setSelectedClassType}
                                        setSelectedClass={setSelectedClass}
                                        setSelectedPassType={setSelectedPassType}
                                        setSelectedDate={setSelectedDate}
                                        setSelectedPrivateClass={setSelectedPrivateClass}
                                        setSelectedPrivateDateTime={setSelectedPrivateDateTime}
                                        setSelectedAmount={setSelectedAmount}
                                        setSelectedEmail={setSelectedEmail}
                                    />
                                    <WizardButtons
                                        handleNext={handleNext}
                                        handleBack={handleBack}
                                        nextButtonText={"Continue"}
                                        nextDisabled={
                                            (
                                                (selectedClassType === ClassType.BEGINNER || selectedClassType === ClassType.INTERMEDIATE) &&
                                                (selectedAmount === 0 || selectedDate === null || selectedEmail === '')
                                            ) ||
                                            (
                                                selectedClassType === ClassType.PASSES &&
                                                (selectedAmount === 0 || selectedPassType === null || selectedEmail === '')
                                            ) ||
                                            (
                                                selectedClassType === ClassType.PRIVATE &&
                                                (selectedPrivateDateTime === null || selectedEmail === '')
                                            )
                                        }

                                        backDisabled={index === 0}
                                        isLoading={false}
                                    />
                                </>
                            )}

                            { index === 1 && (
                                <>
                                    <CheckoutInfo
                                        checkoutInformationTitle={
                                             selectedClassType === ClassType.PASSES ? PassTypeToDescription[selectedPassType] :
                                             selectedClassType === ClassType.PRIVATE ? "Private" :
                                             `Class: ${selectedClassType === ClassType.BEGINNER ? "Beginner Bachata" : "Intermediate Bachata" }`
                                        }
                                        checkoutInformationPrice={`Price: $${selectedAmount}`}
                                        checkoutInformationDate={
                                            selectedClassType === ClassType.PRIVATE ?
                                                selectedPrivateDateTime &&
                                                `Date: ${dayjs(selectedPrivateDateTime).format('YYYY-MM-DD hh:mm A')}`
                                                :
                                            selectedDate && `Date: ${selectedDate?.format('YYYY-MM-DD')}`
                                        }
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
                                    <PaymentForm
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
                                                checkoutInformationTitle={
                                                    selectedClassType === ClassType.PASSES ? PassTypeToDescription[selectedPassType] :
                                                        selectedClassType === ClassType.PRIVATE ? "Private" :
                                                            `Class: ${selectedClassType === ClassType.BEGINNER ? "Beginner Bachata" : "Intermediate Bachata" }`
                                                }
                                                checkoutInformationPrice={`Price: $${selectedAmount}`}
                                                checkoutInformationDate={
                                                    selectedClassType === ClassType.PRIVATE ?
                                                        selectedPrivateDateTime &&
                                                        `Date: ${dayjs(selectedPrivateDateTime).format('YYYY-MM-DD hh:mm A')}`
                                                        :
                                                        selectedDate && `Date: ${selectedDate?.format('YYYY-MM-DD')}`
                                                }
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

export default Bookings;