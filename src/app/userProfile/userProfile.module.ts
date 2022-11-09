import { MaterialModule } from './../core/modules/material.module';
import { CreateViewEventComponent } from './createViewEvent/createViewEvent.component';
import { MyEventsComponent } from './myEvents/myEvents.component';
import { CoreModule } from './../core/modules/core.module';
import { AuthGuard } from './../core/auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ThirdPartyModule } from './../core/modules/third-party.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './userProfile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'myEvents',
        component: MyEventsComponent
      },
      {
        path: 'createEvent',
        component: CreateViewEventComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'profile'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ThirdPartyModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent,
    MyEventsComponent,
    CreateViewEventComponent
  ]
})
export class UserProfileModule { }
