import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import { AxiosResponse } from 'axios';
import { Booking } from "api/types/BookingTypes";

const BookingService = {
    createBooking: (booking: Booking): Promise<AxiosResponse<Booking>> => {
        return axios.post(
            API_ENDPOINTS.BOOKINGS.CREATE_BOOKING,
            booking,
        );
    }
};

export default BookingService;