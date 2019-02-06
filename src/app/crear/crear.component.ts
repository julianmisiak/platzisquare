import {Component, OnInit} from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  lugar: any = {};
  id: any = null;

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);

    if (this.id !== 'new') {
      this.lugaresService.getLugar(this.id).valueChanges().subscribe(lugar => {
        this.lugar = lugar;
      });
    }
  }

  ngOnInit() {
  }

  guardarLugar() {
    const direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;

    this.lugaresService.obtenerGeoData(direccion).subscribe((result: any) => {
   //   this.lugar.lat = result.results[0].geometry.location.lat;
     // this.lugar.lng = result.results[0].geometry.location.lng;

      if (this.id !== 'new') {
        this.lugaresService.editarLugar(this.lugar);
      } else {
        this.lugar.id = Date.now();
        this.lugaresService.guardarLugar(this.lugar);
      }

      alert('Negocio Guardado con Éxito!');
      this.lugar = {};
    });

  }
}
