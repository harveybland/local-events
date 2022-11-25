import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // url = 'https://oneventsapi.azurewebsites.net/api/'
  url = 'http://localhost:3000/api/'

  // Account
  register() {
    return `${this.url}register`
  }

  login() {
    return `${this.url}authenticate`
  }

  // Profile
  userProfile() {
    return `${this.url}userprofile`
  }

  editProfile(id: string) {
    return `${this.url}editProfile/${id}`
  }

  userEvents(id: string) {
    return `${this.url}userEvents/${id}`
  }

  createEvents() {
    return `${this.url}createEvent`
  }

  deleteEvent(id: string) {
    return `${this.url}deleteEvent/${id}`
  }

  favourites(id: any) {
    return `${this.url}getFavourite/${id}`
  }

  // All events
  events() {
    return `${this.url}events`
  }

  get searchEvent() {
    return `${this.url}searchEvent?`
  }

  event(id: string) {
    return `${this.url}event/${id}`
  }

  editEvent(id: any) {
    return `${this.url}editEvent/${id}`
  }

  editViews(id: any) {
    return `${this.url}views/${id}`
  }

}
