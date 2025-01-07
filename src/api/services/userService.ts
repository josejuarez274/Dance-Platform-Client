import axios from "../axiosConfig";
import API_ENDPOINTS from "../endpoints";

const UserService = {
    fetchUserData: (token: string) => {
        return axios.get(
            API_ENDPOINTS.USER.GET_USER_DATA,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}

export default UserService;