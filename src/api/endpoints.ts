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

    export const PRIVATE_CLASSES = {
        GET_MONTHLY_AVAILABLE_CLASSES: "/api/private-classes/thisMonth"
    }

    export const PAYMENTS = {
        CREATE_PAYMENT_INTENT: '/api/payments/create-payment-intent'
    }

    export const BOOKINGS = {
        CREATE_BOOKING: '/api/bookings/create-booking'
    }
}

export default API_ENDPOINTS;