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

export enum ClassType {
    BEGINNER="BEGINNER",
    INTERMEDIATE="INTERMEDIATE",
    PASSES="PASSES",
}