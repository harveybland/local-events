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

export class userEvent {
    firstname: string;
    surname: string;
    event: Event[]
}

//Events
export class Event {
    _id: number;
    title?: string;
    description?: string;
    locationName?: string;
}