import { CoreModule } from './../core/modules/core.module';
import { EventsListComponent } from './eventsList/eventsList.component';
import { RouterModule, Routes } from '@angular/router';
import { ThirdPartyModule } from './../core/modules/third-party.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'events',
        component: EventsListComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'events'
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
    MainComponent
  ]
})
export class MainModule { }
