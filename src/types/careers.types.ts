// src/types/careers.types.ts

export type CareerJob = {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    tags: string[];
};

export type ApplicationForm = {
    name: string;
    email: string;
    mobile: string;
    address: string;
    pincode: string;
    resume: string;
};

export type Department =
    | "All"
    | "Engineering"
    | "Mobile"
    | "Design"
    | "Infrastructure";