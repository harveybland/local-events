// Account
export class Login {
  email: string;
  password: string;
}

export class token {
  token: string;
}

// User
export class SignUp {
  email: string;
  password: string;
}

export class User {
  businessName?: string;
  fullName?: string;
  email: string;
  password: string;
}

export class UpdateUser {
  businessName?: string;
  fullName?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  number?: number;
  profileComplete?: boolean;
  createdEvent?: boolean;
}

export class profile {
  status: boolean;
  user: [];
}

//Events
export class newEvent {
  userId: number;
  title: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  age?: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  isDeleted?: boolean;
  favourite?: boolean;
  viewed?: number;
}

export class updateEvent {
  title?: string;
  description?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  age?: string;
  startDate?: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
}

export class EventModal {
  _id: string;
  userId: number;
  title: string;
  description?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  category?: string;
  age?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  isDeleted?: boolean;
  favourites: EventModal[];
  viewed: number;
  isSaved?: boolean;
}

export class EventFav {
  event: EventModal[];
  isSaved: Boolean;
}

// export class updateViewed {
//   viewed?: number;
// }

// export class eventTask {
//   createdEvent?: boolean;
// }
