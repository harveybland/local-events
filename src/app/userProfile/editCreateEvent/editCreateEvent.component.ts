import { EventModal } from 'src/app/core/interface/user.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserProfileService } from './../userProfile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editCreateEvent',
  templateUrl: './editCreateEvent.component.html',
  styleUrls: ['./editCreateEvent.component.scss']
})
export class EditCreateEventComponent implements OnInit {
  hasEndDate: boolean = false;
  hasEndTime: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public _router: Router,
    private _userProfileService: UserProfileService) { }

  form: FormGroup = this._formBuilder.group({
    title: new FormControl(null),
    description: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    age: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    startTime: new FormControl(null),
    endTime: new FormControl(null),
  });

  userDetails: any
  userId: any;

  eventId: any;

  ngOnInit() {
    if (this._router.url != '/ui/myEvents/createEvent') {
      this._activatedRoute.params.pipe(
        map(params => {
          return params['id'] as number;
        }),
        switchMap(id => {
          this.eventId = id;
          return this._userProfileService.userEvent(id).pipe(tap(model => {
            console.log(model)
            if (model.startTime) {
              this.hasEndTime = true;
            }
            if (model.startDate) {
              this.hasEndDate = true;
            }
            let eventModel: EventModal = model;
            this.form.patchValue(eventModel)
          }))
        })).subscribe();
    }

    this._userProfileService.userProfile().subscribe(res => {
      this.userDetails = res['user'];
      this.userId = this.userDetails._id;
    })
  }

  onSubmit() {
    let model = this.model();
    this._userProfileService.createEvent(model).subscribe(data => {
      this._router.navigateByUrl('/ui/myEvents');
    });
  }

  editEvent() {
    let model = this.model();
    this._userProfileService.editEvent(this.eventId, model).subscribe(data => {
      this._router.navigateByUrl('/ui/myEvents');
    });
  }

  endDate() {
    this.hasEndDate = !this.hasEndDate
  }

  endTime() {
    this.hasEndTime = !this.hasEndTime
  }

  model() {
    return {
      userId: this.userId,
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      city: this.form.controls.city.value,
      address: this.form.controls.address.value,
      age: this.form.controls.age.value,
      startDate: this.form.controls.startDate.value,
      endDate: this.form.controls.endDate.value,
      startTime: this.form.controls.startTime.value,
      endTime: this.form.controls.endTime.value,
    }
  }

}
