import {
    ClassType,
    PassType,
} from "api/types/ClassTypes";

export enum BookingType {
    SINGLE_CLASS,
    DAY_PASS,
    MONTHLY_PASS,
    PREMIUM_PASS,
    PRIVATE_LESSON,
}

export const ClassPassTypeToBookingType = {
    [ClassType.BEGINNER]: BookingType.SINGLE_CLASS,
    [ClassType.INTERMEDIATE]: BookingType.SINGLE_CLASS,
    [PassType.DAY_PASS]: BookingType.DAY_PASS,
    [PassType.MONTHLY_PASS]: BookingType.MONTHLY_PASS,
    [PassType.PREMIUM_PASS]: BookingType.PREMIUM_PASS,
    [ClassType.PRIVATE]: BookingType.PRIVATE_LESSON,
}

export interface Booking {
    email: string;
    stripePaymentId: string;
    amount: number;
    paymentDate: Date;

    userId: string;
    classId: string;
    passId?: string;
    privateClassKey: string;

    bookingType: BookingType;
    bookingDate: Date;
}
