import { CoreModule } from './../core/modules/core.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ThirdPartyModule } from '../core/modules/third-party.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ThirdPartyModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,
    SignUpComponent,
    SignInComponent
  ]
})
export class UserModule { }
