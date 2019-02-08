import {Component, OnInit} from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import swal from 'sweetalert2';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        backgroundColor: 'green',
        transform: 'rotate3d(0, 0, 0, 0deg)'
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: '#870000',
        transform: 'rotate3d(5, 10, 20, 0deg)',
        borderRadius: '5px'
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000)),
    ])
  ]

})

export class LugaresComponent implements OnInit {
  title = 'platzisquare';
  /*listo = false;
   nombre = '';
   apellido = '';*/
  lat = -34.144991;
  lng = -58.961641;
  lugares: any = null;
  state = 'inicial';

  constructor(private lugaresService: LugaresService) {
    /*   // Espera un determinado tiempo antes de ejecutar una función
       setTimeout(() => {
         this.listo = true;
       }, 3000); */

    lugaresService.getLugares().subscribe(
      (res: any) => {
        this.lugares = Object.keys(res).map((key) => {
          this.state = 'final';
          return res[key];
        });
      }, error => {
        console.log('error: ' + JSON.stringify(error));
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Ah ocurrido un error esperado, pero con fiaca para corregirrlo',
          footer: '<a href>Rajemos Negro!!!</a>'
        });
      }
    );
  }

  public animar() {
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }

  ngOnInit(): void {
  }


  animacionInicia(event) {
    console.log('Iniciado: ' + event);
  }

  animacionTermina(event) {
    console.log('Terminado: ' + event);
  }
}
