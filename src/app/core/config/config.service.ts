import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  // url = 'https://oneventsapi.azurewebsites.net/api/'
  // url = 'https://eventsapi.azurewebsites.net/api/';
  url = 'http://localhost:8080/api/';

  // Account
  register() {
    return `${this.url}register`;
  }

  login() {
    return `${this.url}authenticate`;
  }

  // Profile
  userProfile() {
    return `${this.url}userprofile`;
  }

  editProfile(id: string) {
    return `${this.url}editProfile/${id}`;
  }

  userEvents(id: any) {
    return `${this.url}userEvents/${id}`;
  }

  createEvents() {
    return `${this.url}createEvent`;
  }

  deleteUser(id: any) {
    return `${this.url}user/${id}`;
  }

  deleteEvent(userId: any, eventId: string) {
    return `${this.url}deleteEvent/${userId}/${eventId}`;
  }

  favourites(id: any) {
    return `${this.url}getFavourite/${id}`;
  }

  addFavourites(userId: any, eventId: any) {
    return `${this.url}addFavourite/${userId}/${eventId}`;
  }

  removeFavourite(userId: any, eventId: any) {
    return `${this.url}removeFavourite/${userId}/${eventId}`;
  }

  // All events
  events() {
    return `${this.url}events`;
  }

  get searchEvent() {
    return `${this.url}searchEvent?`;
  }

  event(id: string) {
    return `${this.url}event/${id}`;
  }

  editEvent(id: any) {
    return `${this.url}editEvent/${id}`;
  }

  editViews(id: any) {
    return `${this.url}views/${id}`;
  }

  eventTask(id: any) {
    return `${this.url}eventTask/${id}`;
  }
}
