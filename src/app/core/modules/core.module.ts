import { MaterialModule } from './material.module';
import { SideBarComponent } from './../side-bar/side-bar.component';
import { HeaderComponent } from './../header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
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
