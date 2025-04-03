import { AxiosResponse } from 'axios';

import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import {
    CreatePaymentIntentResponse
} from "api/types/PaymentTypes";
import { ClassType } from "/api/types/ClassTypes";

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

interface SavePaymentMethodInfo {
    customerId: string;
    paymentMethodId: string;
}

const PaymentService = {
    createPaymentIntent: (paymentInfo: PaymentInfo): Promise<AxiosResponse<CreatePaymentIntentResponse>> => {
        return axios.post(
            API_ENDPOINTS.PAYMENTS.CREATE_PAYMENT_INTENT,
            paymentInfo,
        )
    },
    savePaymentMethod: (paymentMethod: SavePaymentMethodInfo): Promise<AxiosResponse<any>> => {
        return axios.post(
          API_ENDPOINTS.PAYMENTS.SAVE_PAYMENT_METHOD,
          paymentMethod,
        )
    },
    getSavedPaymentMethods: (stripeCxId: string): Promise<AxiosResponse<any>> => {
        return axios.get(
          API_ENDPOINTS.PAYMENTS.GET_SAVED_PAYMENT_METHODS + "/" + `${stripeCxId}`
        )
    }
}

export default PaymentService;