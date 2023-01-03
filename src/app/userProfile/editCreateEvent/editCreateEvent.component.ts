import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { EventModal } from 'src/app/core/interface/user.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserProfileService } from './../userProfile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editCreateEvent',
  templateUrl: './editCreateEvent.component.html',
  styleUrls: ['./editCreateEvent.component.scss'],
})
export class EditCreateEventComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public _router: Router,
    private _jwtService: JwtStorageService,
    private _userProfileService: UserProfileService
  ) {}

  form: FormGroup = this._formBuilder.group({
    title: new FormControl(null),
    category: new FormControl(null),
    description: new FormControl(null),
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    city: new FormControl(null),
    age: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
    startTime: new FormControl(null),
    endTime: new FormControl(null),
  });

  userId: any;
  eventId: any;
  category$: any;
  hasEndDate: boolean = false;
  hasEndTime: boolean = false;

  page: boolean = false;

  ngOnInit() {
    this.category$ = this._userProfileService.getCategorys();
    if (this._router.url != '/ui/myEvents/createEvent') {
      this.page = true;
      this._activatedRoute.params
        .pipe(
          map((params: any) => {
            return params['id'] as number;
          }),
          switchMap((id: any) => {
            this.eventId = id;
            return this._userProfileService.userEvent(id).pipe(
              tap((model: any) => {
                if (model.endTime) {
                  this.hasEndTime = true;
                }
                if (model.endDate) {
                  this.hasEndDate = true;
                }
                let eventModel: EventModal = model;
                this.form.patchValue(eventModel);
              })
            );
          })
        )
        .subscribe();
    }

    let Id = this._jwtService.getUserId();
    this.userId = Id;
  }

  onSubmit() {
    let model = this.model();
    this._userProfileService.createEvent(model).subscribe((data: any) => {
      this._router.navigateByUrl('/ui/myEvents');
    });
  }

  editEvent() {
    let model = this.model();
    this._userProfileService
      .editEvent(this.eventId, model)
      .subscribe((data: any) => {
        this._router.navigateByUrl('/ui/myEvents');
      });
  }

  endDate() {
    this.hasEndDate = !this.hasEndDate;
  }

  endTime() {
    this.hasEndTime = !this.hasEndTime;
  }

  model() {
    return {
      userId: this.userId,
      title: this.form.controls.title.value,
      category: this.form.controls.category.value,
      description: this.form.controls.description.value,
      city: this.form.controls.city.value,
      addressLine1: this.form.controls.addressLine1.value,
      addressLine2: this.form.controls.addressLine2.value,
      age: this.form.controls.age.value,
      startDate: this.form.controls.startDate.value,
      endDate: this.form.controls.endDate.value,
      startTime: this.form.controls.startTime.value,
      endTime: this.form.controls.endTime.value,
      isDeleted: false,
    };
  }
}
