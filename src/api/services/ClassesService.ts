import axios from "../axiosConfig";
import API_ENDPOINTS from "api/endpoints";
import { AxiosResponse } from "axios";
import { Class } from "/api/types/ClassTypes";

const ClassesService = {
    fetchThisMonthsClasses: (): Promise<AxiosResponse<Class[]>> => {
        return axios.get(
            API_ENDPOINTS.CLASSES.GET_MONTHLY_CLASSES,
        )
    }
}

export default ClassesService;