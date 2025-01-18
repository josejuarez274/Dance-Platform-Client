import React, { useState } from 'react';

import {
    Box,
    Typography,
} from "@mui/material";

import { ClassType } from "api/types/ClassesTypes";
import { Dayjs } from "dayjs";

interface CompleteCheckoutProps {
    selectedDate: Dayjs;
    selectedPrice: number;
    selectedClassType: ClassType;
}

const CompleteCheckout = ({
    selectedPrice,
    selectedClassType,
    selectedDate,
}: CompleteCheckoutProps) => {
    return (
        <Box>
            <Typography>Checkout:</Typography>
            <Typography>Class: ${selectedClassType}</Typography>
            <Typography>Price: $${selectedPrice} </Typography>
            <Typography>Date: ${selectedDate.day()}</Typography>
        </Box>
    );
};

export default CompleteCheckout;