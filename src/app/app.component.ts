import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'On Events';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    let darkmode = window.localStorage.getItem('darkMode');
    if (darkmode == 'true') {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }
}
