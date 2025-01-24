export interface Class {
    classKey: string;
    name: string;
    description: string;
    classTime: string;
    capacity: number;
    maxCapacity: number;
    price: number;
    instructorName: string;
}

export enum ClassPrices {
    BEGINNER=20,
    INTERMEDIATE=20,
    DAY_PASS=25,
    MONTH_PASS=140,
    PREMIUM_PASS=200,
    PRIVATE=80,
}

export enum ClassType {
    BEGINNER="BEGINNER",
    INTERMEDIATE="INTERMEDIATE",
    PASSES="PASSES",
    PRIVATE="PRIVATE",
}

export const ClassTypeToDescription = {
    BEGINNER:"Beginner Bachata",
    INTERMEDIATE:"Intermediate Bachata",
    PASSES:"Passes",
    PRIVATE:"Private",
}

export enum PassType {
    DAY_PASS="DAY_PASS",
    MONTHLY_PASS="MONTHLY_PASS",
    PREMIUM_PASS="PREMIUM_PASS",
}

export const PassTypeToDescription = {
    DAY_PASS:"Day Pass: Valid for 1 class",
    MONTHLY_PASS:"Monthly Pass: Valid for 8 classes",
    PREMIUM_PASS:"Premium Pass: Valid for 8 classes & Exclusive access to the Dance Platform Premium features",
}

export interface PrivateClass {
    classKey: string;
    userId: string;
    userFirstName: string;
    userLastName: string;
    classTime: string;
    isReserved: boolean;
}