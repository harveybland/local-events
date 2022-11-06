import { SideBarComponent } from './../side-bar/side-bar.component';
import { HeaderComponent } from './../header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SideBarComponent
  ],
  declarations: [
    HeaderComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
