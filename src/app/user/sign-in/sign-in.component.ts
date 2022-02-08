import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required
  ]);

  signInForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  serverErrorMessages: string;

  constructor(private _userService: UserService,
    public _router: Router) { }

  ngOnInit() {
    if (this._userService.isLoggedIn()) {
      this._router.navigateByUrl('/ui/profile');
    }
  }

  onSubmit() {
    let model = this.loginModel();
    this._userService.login(model).subscribe(res => {
      this._userService.setToken(res['token']);
      this._router.navigateByUrl('/ui/profile');
    }, err => {
      this.serverErrorMessages = err.error.message;

    });
  }

  loginModel() {
    return {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
    }
  }

}
