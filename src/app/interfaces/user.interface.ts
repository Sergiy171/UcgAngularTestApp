import { UserType } from "../enums/user-type";

export interface User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType;
}
