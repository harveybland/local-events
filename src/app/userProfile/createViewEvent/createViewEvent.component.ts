import { UserProfileService } from './../userProfile.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createViewEvent',
  templateUrl: './createViewEvent.component.html',
  styleUrls: ['./createViewEvent.component.scss']
})
export class CreateViewEventComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    public _router: Router,
    private _userProfileService: UserProfileService) { }

  form: FormGroup = this._formBuilder.group({
    title: new FormControl(null),
    description: new FormControl(null),
    locationName: new FormControl(null),
    age: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    startTime: new FormControl(null),
    endTime: new FormControl(null),
  });

  userDetails: any
  userId: any;

  ngOnInit() {
    this._userProfileService.userProfile().subscribe(res => {
      this.userDetails = res['user'];
      this.userId = this.userDetails._id;
    })
  }

  onSubmit() {
    let model = this.model();
    console.log(model);
    this._userProfileService.createEvent(model).subscribe(data => {
      this._router.navigateByUrl('/ui/myEvents');
    });
  }

  model() {
    return {
      userId: this.userId,
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      locationName: this.form.controls.locationName.value,
      age: this.form.controls.age.value,
      startDate: this.form.controls.startDate.value,
      endDate: this.form.controls.endDate.value,
      startTime: this.form.controls.startTime.value,
      endTime: this.form.controls.endTime.value,
    }
  }

}
