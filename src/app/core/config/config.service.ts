import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // Account
  register() {
    return 'http://localhost:3000/api/register'
  }

  login() {
    return 'http://localhost:3000/api/authenticate'
  }

  // Profile
  userProfile() {
    return 'http://localhost:3000/api/userprofile'
  }

  userEvents(id: string) {
    return `http://localhost:3000/api/userEvents/${id}`
  }

  createEvents() {
    return `http://localhost:3000/api/createEvent`
  }

  deleteEvent(id: string) {
    return `http://localhost:3000/api/deleteEvent/${id}`
  }

  // All events
  events() {
    return 'http://localhost:3000/api/events'
  }

  event(id: string) {
    return `http://localhost:3000/api/event/${id}`
  }

}
