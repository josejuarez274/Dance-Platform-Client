import axios from '../axiosConfig';
import API_ENDPOINTS from "api/endpoints";
import {Axios, AxiosResponse} from 'axios';
import { PrivateClass } from "/api/types/ClassTypes";

const PrivateClassesService = {
    fetchThisMonthsClasses: (): Promise<AxiosResponse<PrivateClass[]>> => {
        try {
            return axios.get(
                API_ENDPOINTS.PRIVATE_CLASSES.GET_MONTHLY_AVAILABLE_CLASSES,
            );
        } catch (e) {
            console.log(e);
            return new Promise((resolve, reject) => {
                reject(e);
            });
        }
    }
}

export default PrivateClassesService;