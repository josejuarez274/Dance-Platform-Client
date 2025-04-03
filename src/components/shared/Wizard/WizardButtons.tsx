import React from "react";
import {
    Box,
    Button, CircularProgress,
} from "@mui/material";

interface WizardButtonProps {
    handleNext: () => void;
    handleBack: () => void;
    nextButtonText: string;
    nextDisabled: boolean;
    backDisabled: boolean;
    isLoading: boolean;
    backButtonText?: string;
}

const WizardButtons = ({
   handleNext,
   handleBack,
   nextButtonText,
   nextDisabled,
   backDisabled,
   isLoading,
   backButtonText,
}: WizardButtonProps) => {
    return (
        <Box style={{ marginTop: 20 }} sx={{ mb: 2 }}>
                {isLoading && nextButtonText ?
                    <CircularProgress></CircularProgress>
                    :
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                            mt: 1,
                            mr: 1,
                            color: '',
                            background: '#000',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                        }}
                        disabled={ nextDisabled }>
                        {nextButtonText}
                    </Button>
                }
            <Button
                disabled={backDisabled}
                onClick={handleBack}
                sx={{
                    mt: 1,
                    mr: 1,
                    color: '#000',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}>
                {backButtonText || 'Back'}
            </Button>
        </Box>
    );
}

export default WizardButtons;