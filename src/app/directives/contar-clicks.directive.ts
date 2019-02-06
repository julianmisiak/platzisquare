import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  // 'a' es para hiperLinks e hipervínculos
  selector: 'li[appContarClicks]'
})
export class ContarClicksDirective {
  clickN = 0;

  // HostListener: escucha eventos de parte del usuario
  //     - click: eventos de html, puede set también onMove
  //     - $event.target: campura el eventos, como vemos puede ser btn.

  // Permiter editar el hatm a partir de la directiva(contar-clicks)
  @HostBinding('style.opacity') opacity: number;

  @HostListener('click', ['$event.target']) onCLick(btn) {
    console.log('a', btn, 'Número de Click: ', this.clickN++);
    this.opacity += .1;
  }


  constructor() {
    this.opacity = .1;
  }

}
