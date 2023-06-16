export interface User {
    id: string;
    username: string;
    login: string;
    firstName: string;
    lastName: string
    email: string;
    phoneNumber: string;
    imageUrl: string;
    activated: boolean;
    langKey: string;
    authorities: string[];
}
