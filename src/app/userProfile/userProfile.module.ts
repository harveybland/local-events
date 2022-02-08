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
    ThirdPartyModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserProfileComponent,
    ProfileComponent
  ]
})
export class UserProfileModule { }
