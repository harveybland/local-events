import { ComponentsModule } from './../core/modules/components.module';
import { FavouritesComponent } from './favourites/favourites.component';
import { ViewEventComponent } from './viewEvent/viewEvent.component';
import { EditCreateEventComponent } from './editCreateEvent/editCreateEvent.component';
import { MaterialModule } from './../core/modules/material.module';
import { MyEventsComponent } from './myEvents/myEvents.component';
import { CoreModule } from './../core/modules/core.module';
import { AuthGuard } from './../core/auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ThirdPartyModule } from './../core/modules/third-party.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './userProfile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'myEvents',
        component: MyEventsComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'myEvents/createEvent',
        component: EditCreateEventComponent,
      },
      {
        path: 'myEvents/editEvent/:id',
        component: EditCreateEventComponent,
      },
      {
        path: 'myEvents/viewEvent/:id',
        component: ViewEventComponent,
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ThirdPartyModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent,
    MyEventsComponent,
    EditCreateEventComponent,
    ViewEventComponent,
    FavouritesComponent,
    CalendarComponent,
    SettingsComponent,
  ],
})
export class UserProfileModule {}
