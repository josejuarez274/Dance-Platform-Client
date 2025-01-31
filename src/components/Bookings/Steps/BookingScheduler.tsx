import React, { useEffect, useState } from 'react';

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Fade,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterIcon from '@mui/icons-material/Water';
import ClassIcon from '@mui/icons-material/Class';
import EmailIcon from '@mui/icons-material/Email';

import ClassesService from "api/services/ClassesService";
import {
  Class,
  ClassPrices,
  ClassType,
  PassType,
  PassTypeToDescription,
  PrivateClass,
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

const BookingScheduler = (
  {
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
  const [isLoading, setIsLoading] = useState(true);
  const [chipIndexes, setChipIndexes] = useState<number[]>([]);

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

  const combineDateAndTime = (
    date: Dayjs | null,
    time: Dayjs | null): Dayjs => {

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
    const { data } = await ClassesService
      .fetchThisMonthsClasses();

    const beginnerClasses = data
      .filter(classObj =>
        classObj.classKey.includes(ClassType.BEGINNER));
    setBeginnerClasses(beginnerClasses);

    const beginnerDates = beginnerClasses
      .map(classObj => {
          const delimiterIndex = classObj.classKey.indexOf("_");

          return classObj.classKey.substring(0, delimiterIndex);
        }
      );
    setBeginnerAvailableDates(beginnerDates);

    const intermediateClasses = data
      .filter(classObj =>
        classObj.classKey.includes(ClassType.INTERMEDIATE));
    setIntermediateClasses(intermediateClasses);

    const intermediateDates = intermediateClasses
      .map(classObj => {
        const delimiterIndex = classObj.classKey.indexOf("_");

        return classObj.classKey.substring(0, delimiterIndex);
      });

    setIntermediateAvailableDates(intermediateDates);
  }

  const getAvailablePrivateDates = async () => {
    const { data } = await PrivateClassesService
      .fetchThisMonthsClasses();

    const availableDates = data
      .filter(classObj => !classObj.isReserved)
      .map(classObj => {
        const delimiterIndex = classObj.classKey.indexOf("_");

        return classObj.classKey.substring(0, delimiterIndex);
      });

    setPrivateClasses(data);
    setPrivateAvailableDates(availableDates);
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAvailableClassDates(), getAvailablePrivateDates()]);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (
      selectedClassType === ClassType.BEGINNER ||
      selectedClassType === ClassType.INTERMEDIATE
    ) {
      setChipIndexes([]);

      const timer = setInterval(() => {
        setChipIndexes((prev) => {
          if (prev.length < 3) {
            return [...prev, prev.length];
          }

          clearInterval(timer);
          return prev;
        });
      }, 300);

      return () => clearInterval(timer);
    }
  }, [selectedClassType]);

  if (isLoading) {
    return (
      <Box>
        <Skeleton animation='wave' variant='rectangular' height={20}/>
        <br/>
        <Skeleton animation='wave' variant='rectangular' height={40}/>
        <Skeleton animation='pulse' variant='circular' width={40} height={40}/>
        <br/>
        <Skeleton animation='wave' variant='rectangular' height={100}/>
      </Box>
    );
  }

  return (
    <Box style={{ marginTop: 10 }}>
      <FormControl fullWidth style={{ padding: '4px' }}>
        <Stack direction="column" spacing={2}>
          <InputLabel
            sx={{ padding: '4px' }}>
            Choose class type
            <ClassIcon
              fontSize='small'
              sx={{ justifySelf: 'flex-end', marginLeft: '4px' }}/>
          </InputLabel>
          <Select
            sx={{ padding: '4px', marginBottom: '16px' }}
            label='Choose a class and/or pass'
            required
            value={selectedClassType}
            onChange={handleChange}>
            <MenuItem value={ClassType.BEGINNER}>
              Beginner Bachata
            </MenuItem>
            <MenuItem value={ClassType.INTERMEDIATE}>
              Intermediate Bachata
            </MenuItem>
            <MenuItem value={ClassType.PASSES}>
              Pass
            </MenuItem>
            <MenuItem value={ClassType.PRIVATE}>
              Private
            </MenuItem>
          </Select>

          {(
            selectedClassType === ClassType.BEGINNER ||
            selectedClassType === ClassType.INTERMEDIATE) && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={selectedAmount === 0}
                shouldDisableDate={shouldDisableDates}
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);

                  const selectedBeginnerClass = beginnerClasses
                    .find(classObj =>
                      classObj.classKey === newValue?.format("YYYY-MM-DD") + "_" + selectedClassType
                    );
                  const selectedIntermediateClass = intermediateClasses
                    .find(classObj =>
                      classObj.classKey === newValue?.format("YYYY-MM-DD") + "_" + selectedClassType
                    );

                  setSelectedClass(selectedBeginnerClass || selectedIntermediateClass);
                }}
              />
              <Stack
                direction="row"
                spacing={.5}>
                {chipIndexes.includes(0) && (
                  <Fade in={true} timeout={500}>
                    <Chip
                      label={"Classes begin at " + `${selectedClassType === ClassType.BEGINNER ? "6pm !!" : "7pm !!"}`}
                      color='info'
                      variant='filled'
                      size="medium"
                      sx={{ color: '#000' }}
                    />
                  </Fade>
                )}
                {chipIndexes.includes(1) && (
                  <Fade in={true} timeout={500}>
                    <Chip
                      label={`Price: $${selectedAmount}`}
                      sx={{ color: 'white', backgroundColor: '#228B22' }}
                    />
                  </Fade>
                )}
                {chipIndexes.includes(2) && (
                  <Fade in={true} timeout={500}>
                    <Chip
                      label={`Difficulty`}
                      color='error'
                      sx={{ color: '#000', marginRight: '400px' }}
                      icon={selectedClassType === ClassType.BEGINNER ? <WaterIcon/> : <LocalFireDepartmentIcon/>}
                    />
                  </Fade>
                )}
              </Stack>
            </LocalizationProvider>
          )}

          {selectedClassType === ClassType.PASSES && (
            <Box>
              <ButtonGroup sx={{ boxShadow: 1 }}>
                <Tooltip title="Valid for one class." arrow>
                  <Button
                    value={PassType.DAY_PASS}
                    variant={selectedPassType === PassType.DAY_PASS ? 'contained' : 'outlined'}
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
                    variant={selectedPassType === PassType.MONTHLY_PASS ? 'contained' : 'outlined'}
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
                    variant={selectedPassType === PassType.PREMIUM_PASS ? 'contained' : 'outlined'}
                  >
                    <Stack direction="column" spacing={1}>
                      <Typography variant='body1'>Premium Pass</Typography>
                      <Typography variant='body1'>${ClassPrices.PREMIUM_PASS}</Typography>
                    </Stack>
                  </Button>
                </Tooltip>
              </ButtonGroup>
              <Card sx={{ boxShadow: 1 }}>
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
                  setSelectedPrivateDateTime(privateDateTime);

                  const privateClass = privateClasses.find(privateClass =>
                    privateClass.classKey === privateDateTime.format('YYYY-MM-DDTHH:mm') + "_" + ClassType.PRIVATE
                  );
                  setSelectedPrivateClass(privateClass);
                }}
                shouldDisableTime={shouldDisablePrivateTimes}
              />
            </LocalizationProvider>
          )}

          <Box sx={{ marginTop: '10px' }}>
            <TextField
              fullWidth
              label='Enter your email address'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position={'start'}>
                      <EmailIcon fontSize='small'/>
                    </InputAdornment>
                  )
                }
              }}
              required
              variant='filled'
              value={selectedEmail}
              onChange={(event) => setSelectedEmail(event.target.value)}
              type="email"
            />
          </Box>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default BookingScheduler;