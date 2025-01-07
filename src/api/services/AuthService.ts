import axios from "../axiosConfig";
import API_ENDPOINTS  from "../endpoints";
import { User } from "api/types/UserTypes";

const AuthService = {
    login: (credentials: { email: string, password: string }) => {
        return axios.post(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials);
    },
    register: (user: User )=> {
        return axios.post(
            API_ENDPOINTS.AUTH.REGISTER,
            user,
        );
    },
};

export default AuthService;