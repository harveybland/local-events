export class User {
    firstname: string;
    surname: string;
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