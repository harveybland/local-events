// Account
export class Login {
    email: string;
    password: string
}

export class token {
    token: string
}

// User
export class User {
    firstname: string;
    surname: string;
    email: string;
    password: string
}

export class profile {
    status: boolean;
    user: []
}

//Events
export class Event {
    _id: number;
    title: string;
    description: string;
    locationName: string;
}