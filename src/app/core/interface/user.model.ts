// Account
export class Login {
    email: string;
    password: string
}

export class token {
    token: string
}

// User
export class SignUp {
    email: string;
    password: string
}

export class User {
    businessName?: string;
    fullName?: string;
    email: string;
    password: string
}

export class UpdateUser {
    businessName?: string;
    fullName?: string;
    address?: string;
    town?: string;
    number?: number;
}


export class profile {
    status: boolean;
    user: []
}

//Events
export class newEvent {
    userId: number;
    title: string;
    description: string;
    address?: string;
    city?: string;
    age?: string;
    startDate?: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
    isDeleted?: boolean;
    favourite?: boolean;
}

export class EventModal {
    _id: string;
    userId: number;
    title?: string;
    description?: string;
    address?: string;
    city?: string;
    age?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    isDeleted?: boolean;
    favourite?: boolean;
}