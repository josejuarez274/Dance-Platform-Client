import { AxiosResponse } from 'axios';

import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import {CreatePaymentIntentResponse} from "api/types/PaymentTypes";

interface PaymentInfo {
    amount: number
}

const PaymentService = {
    createPaymentIntent: (paymentInfo: PaymentInfo): Promise<AxiosResponse<CreatePaymentIntentResponse>> => {
        return axios.post(
            API_ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT,
            paymentInfo,
        )
    }
}

export default PaymentService;