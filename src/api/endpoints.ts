namespace API_ENDPOINTS {
    export const USER = {
        GET_USER_DATA: "/api/users/whoAmI",
    }

    export const AUTH = {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register"
    }

    export const CLASSES = {
        GET_MONTHLY_CLASSES: "/api/classes/thisMonth"
    }
}

export default API_ENDPOINTS;