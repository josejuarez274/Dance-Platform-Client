import { AxiosResponse } from 'axios';

import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import {
    CreatePaymentIntentResponse
} from "api/types/PaymentTypes";
import { ClassType } from "/api/types/ClassTypes"

interface PaymentInfo {
    amount: number;
    description: string;
    receipt_email: string;
    metadata: {
        userId: string;
        classType: ClassType;
        date?: string;
        instructor?: string;
    },
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