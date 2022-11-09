import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ThirdPartyModule { }
