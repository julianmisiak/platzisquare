import {Component, OnInit} from '@angular/core';
import {LugaresService} from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  title = 'platzisquare';

  /*listo = false;
   nombre = '';
   apellido = '';*/


  lat = -34.144991;
  lng =  -58.961641;
  lugares: any = null;

  constructor(private lugaresService: LugaresService) {
    /*   // Espera un determinado tiempo antes de ejecutar una función
       setTimeout(() => {
         this.listo = true;
       }, 3000); */

    this.lugares = lugaresService.getLugares().valueChanges().subscribe(lugares => {
      console.log('lugares: ' + JSON.stringify(lugares));
      /* debugger;  */
      this.lugares = lugares;
    });
  }

  ngOnInit(): void {
  }

  /*  public hacerAlgo() {
      alert('Hacinedo algo');
    }
    */


}
