import { EventModal } from './../../interface/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  @Input() events: EventModal;

  constructor() {}

  ngOnInit() {
    console.log(this.events);
    console.log(1);
  }
}
