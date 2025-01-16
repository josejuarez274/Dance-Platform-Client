import React, { useState, useEffect } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    MenuItem,
    Select,
    FormControl,
    Box,
    InputLabel,
    SelectChangeEvent,
    Stack,
    Chip,
} from '@mui/material';
import dayjs, {Dayjs} from "dayjs";

import ClassesService from "api/services/ClassesService";
import { ClassType } from 'api/types/ClassesTypes';

interface SelectClassStepProps {
    selectedDate: Dayjs | null;
    selectedClassType: ClassType;
    setSelectedDate: (date: Dayjs | null) => void;
    setSelectedClassType: (type: ClassType) => void;
}

const SelectClassStep = ({
    selectedDate,
    selectedClassType,
    setSelectedClassType,
    setSelectedDate }: SelectClassStepProps
) => {
    const [beginnerAvailableDates, setBeginnerAvailableDates] = useState([]);
    const [intermediateAvailableDates, setIntermediateAvailableDates] = useState([]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedClassType(event.target.value as ClassType);
        setSelectedDate(null);
    };

    const shouldDisableDates = (date: dayjs.Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');

        switch (selectedClassType) {
            case ClassType.BEGINNER:
                return !beginnerAvailableDates.includes(formattedDate);
            case ClassType.INTERMEDIATE:
                return !intermediateAvailableDates.includes(formattedDate);
        }
    }

    const getAvailableClassDates = async () => {
        const { data } = await ClassesService.fetchThisMonthsClasses();

        const beginnerDates = data
            .filter(classObj => classObj.classKey.includes(ClassType.BEGINNER))
            .map(classObj => {
                    const delimiterIndex = classObj.classKey.indexOf("_");

                    return classObj.classKey.substring(0, delimiterIndex);
                }
            );
        const intermediateDates = data
            .filter(classObj => classObj.classKey.includes(ClassType.INTERMEDIATE))
            .map(classObj => {
                const delimiterIndex = classObj.classKey.indexOf("_");

                return classObj.classKey.substring(0, delimiterIndex);
            });

        setBeginnerAvailableDates(beginnerDates);
        setIntermediateAvailableDates(intermediateDates);
    }
    useEffect(() => {
        getAvailableClassDates();
    }, []);

    return(
        <Box style={{ marginTop: 10}}>
            <FormControl fullWidth style={{ padding: 4}}>
                <InputLabel>Choose a class or pass</InputLabel>
                <Select label='Choose a class and/or pass' onChange={handleChange}>
                    <MenuItem value={ClassType.BEGINNER}>{ClassType.BEGINNER}</MenuItem>
                    <MenuItem value={ClassType.INTERMEDIATE}>{ClassType.INTERMEDIATE}</MenuItem>
                    <MenuItem value={ClassType.PASSES}>{ClassType.PASSES}</MenuItem>
                </Select>

                {(
                    selectedClassType === ClassType.BEGINNER ||
                    selectedClassType === ClassType.INTERMEDIATE) && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select a date"
                                shouldDisableDate={shouldDisableDates}
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                            />
                                <Stack direction="row" spacing={1} style={{ marginTop: 2}}>
                                    <Chip
                                        label={"Classes begin at " + `${selectedClassType === ClassType.BEGINNER ? "6pm" : "7pm"}`}
                                        color='default'
                                        variant='outlined'
                                        size="medium"
                                    />
                                    <Chip
                                        label={`Price $25`}
                                        color='success'
                                    />
                                </Stack>
                            </LocalizationProvider>)
                }
            </FormControl>
        </Box>
    )
};

export default SelectClassStep;