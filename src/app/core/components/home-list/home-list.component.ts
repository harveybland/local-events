import { UserProfileService } from './../../../userProfile/userProfile.service';
import { JwtStorageService } from './../../service/jwt-storage.service';
import { Router } from '@angular/router';
import { EventModal } from 'src/app/core/interface/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  @Input() event: EventModal;
  userId: any;

  constructor(
    private _router: Router,
    private _jwtService: JwtStorageService,
    private _userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.userId = this._jwtService.getUserId();
  }

  favourite(eventId: any) {
    if (!this.userId) {
      this._router.navigateByUrl('/user/sign-in');
    } else {
      this._userProfileService.addFavourites(this.userId, eventId).subscribe();
    }
  }

  removeFavourite(eventId: any) {
    this._userProfileService.removeFavourite(this.userId, eventId).subscribe();
  }
}
