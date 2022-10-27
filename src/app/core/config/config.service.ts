import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  //Events
  events() {
    return 'http://localhost:3000/api/events'
  }

}
