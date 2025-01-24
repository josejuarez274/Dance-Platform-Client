import React from 'react';

import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
} from "@mui/material";

interface CompleteCheckoutProps {
    checkoutInformationTitle: string;
    checkoutInformationPrice: string;
    checkoutInformationDate: string;
}

const CheckoutInfo = ({
    checkoutInformationTitle,
    checkoutInformationPrice,
    checkoutInformationDate,
}: CompleteCheckoutProps) => {
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography gutterBottom sx={{
                        color: 'text.secondary',
                        fontSize: 18,
                    }}>{checkoutInformationTitle}</Typography>
                    <Typography>{checkoutInformationPrice} </Typography>
                    <Typography>{checkoutInformationDate}</Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Box>
    );
};

export default CheckoutInfo;