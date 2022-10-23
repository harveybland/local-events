import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ui',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./userProfile/userProfile.module').then(o => o.UserProfileModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(o => o.MainModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(o => o.UserModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
