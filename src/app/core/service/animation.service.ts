import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  animation() {
    const targets = document.querySelectorAll('.animation');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, options);

    targets.forEach((target) => {
      observer.observe(target);
    });

    function callback(entries: any, observer: any) {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          addActiveClass(entry.target);
        } else if (!entry.isIntersecting) {
          removeActiveClass(entry.target);
        }
      });
    }

    function addActiveClass(element: any) {
      element.classList.add('on');
    }

    function removeActiveClass(element: any) {
      element.classList.remove('on');
    }
  }

}
