export class User {
    id: string;
    userName: string;
    email: string;
    createdOn?: string;
    isAdmin: boolean;
    userDetails: UserDetails;
    displayName: string;
    phoneNumber: string;
    photoUrl: string;
}

export class UserDetails {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    phoneNumber: string;
    address1: string;
    address2?: string;
    zip: string;
}