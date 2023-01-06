import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // @Output() selectTheme = new EventEmitter();

  checkbox = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    let darkmode = window.localStorage.getItem('darkMode');
    if (darkmode == 'true') {
      this.checkbox = true;
      this.document.body.classList.add('dark-theme');
    } else {
      this.checkbox = false;
      this.document.body.classList.remove('dark-theme');
    }
  }

  darkMode(e: any) {
    if (e.currentTarget.checked == true) {
      let darkMode = true.toString();
      window.localStorage.setItem('darkMode', darkMode);
      this.document.body.classList.add('dark-theme');
      // this.selectTheme.emit(true);
    } else {
      let darkMode = false.toString();
      window.localStorage.setItem('darkMode', darkMode);
      this.document.body.classList.remove('dark-theme');
      // this.selectTheme.emit(false);
    }
  }

  delete() {}
}
