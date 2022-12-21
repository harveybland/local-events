import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'On Events';

  ngOnInit(): void {
    // let darkMode = false.toString();
    // window.localStorage.setItem('darkMode', darkMode);
  }
}
