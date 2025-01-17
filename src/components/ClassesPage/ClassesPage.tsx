import React, { useState } from 'react';
import {Dayjs} from "dayjs";
import {
    Typography,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Box,
} from "@mui/material";

import SelectClassStep from "components/ClassesPage/Steps/SelectClassStep";
import { ClassType } from "api/types/ClassesTypes";

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const handleReset = () => {
        setActiveStep(0);
    }

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
                                <SelectClassStep
                                    selectedDate={selectedDate}
                                    selectedClassType={selectedClassType}
                                    setSelectedClassType={setSelectedClassType}
                                    setSelectedDate={setSelectedDate}
                                />
                            )}
                            <Box style={{ marginTop: 20 }} sx={{ mb: 2 }}>
                                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1}}>
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