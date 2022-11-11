import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserProfileService } from './../userProfile.service';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interface/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any;
  userId: any;

  constructor(private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    private _formBuilder: FormBuilder,

    public _router: Router) { }

  form: FormGroup = this._formBuilder.group({
    businessName: new FormControl(null),
    fullName: new FormControl(null),
    address: new FormControl(null),
    town: new FormControl(null),
    number: new FormControl(null),
  });


  ngOnInit() {
    this._userProfileService.userProfile().subscribe(res => {
      this.userDetails = res['user']
      this.userId = this.userDetails._id;
      let userModel: User = this.userDetails;
      this.form.patchValue(userModel)
    })
  }

  onSubmit() {
    let model = this.model();
    this._userProfileService.editProfile(this.userId, model).subscribe();
  }

  model() {
    return {
      businessName: this.form.controls.businessName.value,
      fullName: this.form.controls.fullName.value,
      address: this.form.controls.address.value,
      town: this.form.controls.town.value,
      number: this.form.controls.number.value,
    }
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/sign-in']);
  }

}
