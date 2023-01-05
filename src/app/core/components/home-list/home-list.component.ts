import { EventModal } from 'src/app/core/interface/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  @Input() event: EventModal;

  constructor() {}

  ngOnInit() {}
}
