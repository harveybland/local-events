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
    firstname?: string;
    surname?: string;
    email: string;
    password: string
}


export class profile {
    status: boolean;
    user: []
}

export class userEvent {
    firstName?: string;
    surname?: string;
    events: Event[]

}

//Events
export class newEvent {
    userId: number;
    title: string;
    description: string;
    locationName?: string;
    age?: string;
    startDate?: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
    isDeleted?: boolean;
    favourite?: boolean;
}

export class EventModal {
    _id: number;
    userId: number;
    title?: string;
    description?: string;
    locationName?: string;
    age?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    isDeleted?: boolean;
    favourite?: boolean;
}