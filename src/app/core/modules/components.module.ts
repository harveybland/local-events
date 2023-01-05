import { HomeListComponent } from './../components/home-list/home-list.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { EventListComponent } from './../components/event-list/event-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [EventListComponent, HomeListComponent],
  exports: [EventListComponent, HomeListComponent],
})
export class ComponentsModule {}
