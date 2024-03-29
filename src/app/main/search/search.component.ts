import { UserProfileService } from './../../userProfile/userProfile.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MainService } from './../main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private _mainService: MainService,
    private _formBuilder: FormBuilder,
    private _userProfileService: UserProfileService
  ) {}

  event$ = this._mainService.event$;
  category$: any;

  searched: boolean = false;
  list: boolean = false;

  form: FormGroup = this._formBuilder.group({
    title: new FormControl(null),
    category: new FormControl(null),
    city: new FormControl(null),
    age: new FormControl(null),
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });

  ngOnInit() {
    this.category$ = this._userProfileService.getCategorys();
  }

  onSubmit() {
    this.searched = true;
    this.list = true;
    this._mainService
      .searchEvent(
        this.form.controls.title.value,
        this.form.controls.category.value,
        this.form.controls.city.value,
        this.form.controls.startDate.value
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // console.log(this.event$)
  }
}
