import { JwtStorageService } from './../service/jwt-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private _jwtService: JwtStorageService) { }

  ngOnInit() {
    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

}
