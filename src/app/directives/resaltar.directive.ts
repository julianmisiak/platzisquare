import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective implements OnInit {
  @Input('appResaltar') plan: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.plan = '';
  }

  ngOnInit(): void {
    if (this.plan === 'pagado') {
      this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
      this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
    }
  }

}
