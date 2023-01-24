import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  personal = false;
  submitted = false;

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    businessName: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
  });

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    private _userService: UserService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit() {
    if (this._jwtService.isLoggedIn()) {
      this._router.navigateByUrl('/ui/profile');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key)!.hasError('required');
      });
    } else {
      let model = this.userModel();
      this._userService.create(model).subscribe(
        (res) => {
          return this._userService.login(model).subscribe((res) => {
            this.submitted = false;
            this._jwtService.setToken(res['token']);
            this._router.navigateByUrl('/ui/profile');
          });
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else
            this.serverErrorMessages =
              'Something went wrong.Please contact admin.';
        }
      );
    }
  }

  userModel() {
    if (this.personal) {
      return {
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
        businessName: null,
        fullName: this.signUpForm.controls.fullName.value,
        number: this.signUpForm.controls.number.value,
        addressLine1: this.signUpForm.controls.addressLine1.value,
        addressLine2: this.signUpForm.controls.addressLine2.value,
        town: this.signUpForm.controls.town.value,
        profileComplete: false,
      };
    } else {
      return {
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
        businessName: this.signUpForm.controls.businessName.value,
        fullName: null,
        number: this.signUpForm.controls.number.value,
        addressLine1: this.signUpForm.controls.addressLine1.value,
        addressLine2: this.signUpForm.controls.addressLine2.value,
        town: this.signUpForm.controls.town.value,
        profileComplete: false,
      };
    }
  }
}
