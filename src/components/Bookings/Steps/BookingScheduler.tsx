import React, {useEffect, useState} from 'react';

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import dayjs, { Dayjs } from "dayjs";

import ClassesService from "api/services/ClassesService";
import {
    Class,
    ClassPrices,
    ClassType,
    PassType,
    PassTypeToDescription,
    PrivateClass
} from 'api/types/ClassTypes';
import PrivateClassesService from "api/services/PrivateClassesService";

interface SelectClassStepProps {
    selectedClassType: ClassType;
    selectedClass: Class | null;
    selectedDate: Dayjs | null;
    selectedPrivateClass: PrivateClass | null;
    selectedPrivateDateTime: Dayjs | null;
    selectedPassType: PassType;
    selectedAmount: number;
    selectedEmail: string;

    setSelectedClassType: (type: ClassType) => void;
    setSelectedClass: (selectedClass: Class) => void;
    setSelectedDate: (date: Dayjs | null) => void;
    setSelectedPrivateClass: (selectedPrivateClass: PrivateClass) => void;
    setSelectedPrivateDateTime: (date: Dayjs | null) => void;
    setSelectedPassType: (type: PassType) => void;
    setSelectedAmount: (amount: number) => void;
    setSelectedEmail: (email: string) => void;
}

const BookingScheduler = ({
    selectedClassType,
    selectedClass,
    selectedDate,
    selectedPrivateClass,
    selectedPrivateDateTime,
    selectedAmount,
    selectedPassType,
    selectedEmail,

    setSelectedClassType,
    setSelectedClass,
    setSelectedPassType,
    setSelectedDate,
    setSelectedPrivateClass,
    setSelectedPrivateDateTime,
    setSelectedAmount,
    setSelectedEmail,
   }: SelectClassStepProps
) => {
    const [beginnerClasses, setBeginnerClasses] = useState<Class[]>([]);
    const [intermediateClasses, setIntermediateClasses] = useState<Class[]>([]);
    const [beginnerAvailableDates, setBeginnerAvailableDates] = useState([]);
    const [intermediateAvailableDates, setIntermediateAvailableDates] = useState([]);

    const [privateClasses, setPrivateClasses] = useState<PrivateClass[]>([]);
    const [privateAvailableDates, setPrivateAvailableDates] = useState([]);
    const [selectedPrivateDate, setSelectedPrivateDate] = useState<Dayjs | null>(null);
    const [selectedPrivateTime, setSelectedPrivateTime] = useState<Dayjs | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        switch (event.target.value) {
            case ClassType.BEGINNER:
                setSelectedAmount(ClassPrices.BEGINNER);
                break;
            case ClassType.INTERMEDIATE:
                setSelectedAmount(ClassPrices.INTERMEDIATE);
                break;
            case ClassType.PASSES:
                switch (selectedPassType) {
                    case PassType.DAY_PASS:
                        setSelectedAmount(ClassPrices.DAY_PASS);
                        break;
                    case PassType.MONTHLY_PASS:
                        setSelectedAmount(ClassPrices.MONTH_PASS);
                        break;
                    case PassType.PREMIUM_PASS:
                        setSelectedAmount(ClassPrices.PREMIUM_PASS);
                }
            case ClassType.PRIVATE:
                setSelectedAmount(ClassPrices.PRIVATE);
                break;
        }

        setSelectedClassType(event.target.value as ClassType);
        setSelectedDate(null);
        setSelectedPassType(null);
        setSelectedPrivateDate(null);
        setSelectedPrivateDateTime(null);
    };

    const combineDateAndTime = (date: Dayjs | null, time: Dayjs | null): Dayjs => {
        if (date === null || time === null) {
            return null;
        }

        const formattedDate = date.format('YYYY-MM-DD');
        const formattedTime = time.format('HH:mm');

        return dayjs(formattedDate + " " + formattedTime);
    }

    const shouldDisableDates = (date: dayjs.Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');

        switch (selectedClassType) {
            case ClassType.BEGINNER:
                return !beginnerAvailableDates.includes(formattedDate);
            case ClassType.INTERMEDIATE:
                return !intermediateAvailableDates.includes(formattedDate);
        }
    }

    const shouldDisablePrivateDates = (date: dayjs.Dayjs) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const availableDatesFormatted = privateAvailableDates.map(date => dayjs(date).format('YYYY-MM-DD'));

        return !availableDatesFormatted.includes(formattedDate);
    }

    const shouldDisablePrivateTimes = (date: dayjs.Dayjs) => {
        const formattedTime = dayjs(date).format('HH:mm');

        const formattedSelectedDate = dayjs(selectedPrivateDate).format('YYYY-MM-DD');
        const selectedDateTimeSlots = privateAvailableDates
            .filter(date =>
                dayjs(date)
                .format('YYYY-MM-DD') === formattedSelectedDate
            );
        const availableTimesFormatted = selectedDateTimeSlots.map(date => dayjs(date).format('HH:mm'));

        return !availableTimesFormatted.includes(formattedTime);
    }

    const getAvailableClassDates = async () => {
        const { data } = await ClassesService.fetchThisMonthsClasses();

        const beginnerClasses = data
            .filter(classObj => classObj.classKey.includes(ClassType.BEGINNER));
        setBeginnerClasses(beginnerClasses);

        const beginnerDates = beginnerClasses
            .map(classObj => {
                    const delimiterIndex = classObj.classKey.indexOf("_");

                    return classObj.classKey.substring(0, delimiterIndex);
                }
            );
        setBeginnerAvailableDates(beginnerDates);

        const intermediateClasses = data
            .filter(classObj => classObj.classKey.includes(ClassType.INTERMEDIATE));
        setIntermediateClasses(intermediateClasses);

        const intermediateDates = intermediateClasses
            .map(classObj => {
                const delimiterIndex = classObj.classKey.indexOf("_");

                return classObj.classKey.substring(0, delimiterIndex);
            });

        setIntermediateAvailableDates(intermediateDates);
    }

    const getAvailablePrivateDates = async () => {
        const { data } = await PrivateClassesService.fetchThisMonthsClasses();

        console.warn('************ private classes ', data, ' ************')

        const availableDates = data
            .filter(classObj => !classObj.isReserved)
            .map(classObj => {
                const delimiterIndex = classObj.classKey.indexOf("_");

                return classObj.classKey.substring(0, delimiterIndex);
            });

        console.warn('************ available dates ', availableDates, ' ************')

        setPrivateClasses(data);
        setPrivateAvailableDates(availableDates);
    }

    useEffect(() => {
        getAvailableClassDates();
        getAvailablePrivateDates();
    }, []);

    return(
        <Box style={{ marginTop: 10}}>
            <FormControl fullWidth style={{ padding: 4}}>
                <InputLabel>Choose class type</InputLabel>
                <Select label='Choose a class and/or pass' onChange={handleChange}>
                    <MenuItem value={ClassType.BEGINNER}>Beginner Bachata</MenuItem>
                    <MenuItem value={ClassType.INTERMEDIATE}>Intermediate Bachata</MenuItem>
                    <MenuItem value={ClassType.PASSES}>Pass</MenuItem>
                    <MenuItem value={ClassType.PRIVATE}>Private</MenuItem>
                </Select>

                {(
                    selectedClassType === ClassType.BEGINNER ||
                    selectedClassType === ClassType.INTERMEDIATE) && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select a date"
                                disabled={selectedAmount === 0}
                                shouldDisableDate={shouldDisableDates}
                                value={selectedDate}
                                onChange={(newValue) => {
                                    setSelectedDate(newValue);

                                    const selectedBeginnerClass = beginnerClasses
                                        .find(classObj =>
                                            classObj.classKey ===  newValue.format("YYYY-MM-DD") + "_" + selectedClassType
                                        );
                                    const selectedIntermediateClass = intermediateClasses
                                    .find(classObj =>
                                        classObj.classKey ===  newValue.format("YYYY-MM-DD") + "_" + selectedClassType
                                    );

                                    setSelectedClass(selectedBeginnerClass || selectedIntermediateClass);
                                }}
                            />
                                <Stack direction="row" spacing={1} style={{ marginTop: 2}}>
                                    <Chip
                                        label={"Classes begin at " + `${selectedClassType === ClassType.BEGINNER ? "6pm" : "7pm"}`}
                                        color='default'
                                        variant='outlined'
                                        size="medium"
                                    />
                                    <Chip
                                        label={`Price $${selectedClassType === ClassType.BEGINNER ? "1" : "2"}`}
                                        color='success'
                                    />
                                    <Chip
                                        label={`Difficulty`}
                                        color='warning'
                                        icon={ selectedClassType === ClassType.BEGINNER ? <LocalFireDepartmentIcon /> : <FireTruckIcon />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                    )}

                { selectedClassType === ClassType.PASSES && (
                    <Box>
                        <ButtonGroup>
                            <Tooltip title="Valid for one class." arrow>
                                <Button
                                    value={PassType.DAY_PASS}
                                    variant={selectedPassType === PassType.DAY_PASS ? 'contained' : 'outlined' }
                                    onClick={() => {
                                        setSelectedPassType(PassType.DAY_PASS);
                                        setSelectedAmount(ClassPrices.DAY_PASS);
                                    }}
                                >
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant='body1'>Day Pass</Typography>
                                        <Typography variant='body1'>${ClassPrices.DAY_PASS}</Typography>
                                    </Stack>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Valid for 1 month." arrow>
                                <Button
                                    value={PassType.MONTHLY_PASS}
                                    variant={selectedPassType === PassType.MONTHLY_PASS ? 'contained' : 'outlined' }
                                    onClick={() => {
                                        setSelectedAmount(ClassPrices.MONTH_PASS);
                                        setSelectedPassType(PassType.MONTHLY_PASS);
                                    }}
                                >
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant='body1'>Monthly Pass</Typography>
                                        <Typography variant='body1'>${ClassPrices.MONTH_PASS}</Typography>
                                    </Stack>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Valid for 1 month" arrow>
                                <Button
                                    value={PassType.PREMIUM_PASS}
                                    onClick={() => {
                                        setSelectedAmount(ClassPrices.PREMIUM_PASS);
                                        setSelectedPassType(PassType.PREMIUM_PASS);
                                    }}
                                    variant={selectedPassType === PassType.PREMIUM_PASS ? 'contained' : 'outlined' }
                                >
                                    <Stack direction="column" spacing={1}>
                                        <Typography variant='body1'>Premium Pass</Typography>
                                        <Typography variant='body1'>${ClassPrices.PREMIUM_PASS}</Typography>
                                    </Stack>
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                        <Card>
                            <CardContent>
                                <Typography variant='h6' color='info' gutterBottom>
                                    Pass Details
                                </Typography>
                                <Typography variant='body1' color='textPrimary'>
                                    {selectedPassType ? PassTypeToDescription[selectedPassType] : "Select a pass type."}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {selectedClassType === ClassType.PRIVATE && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedPrivateDate}
                            label="Select a day"
                            onChange={(newDate) => {
                                setSelectedPrivateDate(newDate);
                                setSelectedPrivateDateTime(null);
                                setSelectedPrivateTime(null);
                                setSelectedAmount(ClassPrices.PRIVATE);
                            }}
                            shouldDisableDate={shouldDisablePrivateDates}
                        />
                        <MobileTimePicker
                            label="Select a time"
                            value={selectedPrivateTime}
                            disabled={selectedPrivateDate === null}
                            views={['hours']}
                            ampmInClock={true}
                            onChange={(newValue) => {
                                setSelectedPrivateTime(newValue);
                                setSelectedAmount(ClassPrices.PRIVATE);

                                const privateDateTime = combineDateAndTime(selectedPrivateDate, newValue);
                                console.warn('---- ', privateDateTime);
                                setSelectedPrivateDateTime(privateDateTime);
                                const privateClass = privateClasses.find(privateClass =>
                                    privateClass.classKey === privateDateTime.format('YYYY-MM-DDTHH:mm') + "_" + ClassType.PRIVATE
                                );
                                console.warn('---- ', privateClass);
                                //setPrivateClasses(privateClass);
                                setSelectedPrivateClass(privateClass);
                            }}
                            shouldDisableTime={shouldDisablePrivateTimes}
                        />
                    </LocalizationProvider>
                )}

                <Box sx={{ marginTop: 4 }}>
                    <TextField
                        label="Email Address"
                        fullWidth variant='filled'
                        value={selectedEmail}
                        onChange={(event) => setSelectedEmail(event.target.value)}
                        type="email"
                    />
                </Box>
            </FormControl>
        </Box>
    )
};

export default BookingScheduler;