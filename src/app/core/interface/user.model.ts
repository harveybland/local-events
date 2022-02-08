export class User {
    fullName: string;
    email: string;
    password: string
}

export class Login {
    email: string;
    password: string
}

export class token {
    token: string
}

export class profile {
    status: boolean;
    user: []
}