import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserProfileService } from './../userProfile.service';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interface/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userDetails: any;
  userId: any;
  update = false;
  complete: boolean;

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    private _formBuilder: FormBuilder,

    public _router: Router
  ) {}

  form: FormGroup = this._formBuilder.group({
    businessName: new FormControl(null),
    fullName: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    town: new FormControl(null),
    number: new FormControl(null),
  });

  ngOnInit() {
    this._userProfileService.userProfile().subscribe((res) => {
      this.userDetails = res['user'];
      this.userId = this.userDetails._id;
      this.complete = this.userDetails.profileComplete;

      // adding to local storage
      this._jwtService.setUserId(this.userId);
      this._jwtService.setProfile(Boolean(this.complete));

      let userModel: User = this.userDetails;
      this.form.patchValue(userModel);
    });
  }

  onSubmit() {
    let model = this.model();
    this._userProfileService.editProfile(this.userId, model).subscribe();
    this.update = true;
  }

  model() {
    let completeProfile =
      !!this.form.controls.fullName.value &&
      !!this.form.controls.addressLine1.value &&
      !!this.form.controls.addressLine2.value &&
      !!this.form.controls.town.value &&
      !!this.form.controls.number.value;

    if (!!completeProfile) {
      this.complete = true;
    } else {
      this.complete = false;
    }

    return {
      businessName: this.form.controls.businessName.value,
      fullName: this.form.controls.fullName.value,
      addressLine1: this.form.controls.addressLine1.value,
      addressLine2: this.form.controls.addressLine2.value,
      town: this.form.controls.town.value,
      number: this.form.controls.number.value,
      profileComplete: this.complete,
    };
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/user/sign-in']);
  }
}
