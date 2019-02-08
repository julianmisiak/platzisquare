import {Component, OnInit, ɵcontainerRefreshStart} from '@angular/core';
import {LugaresService} from '../services/lugares.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  lugar: any = {};
  id: any = null;

  searchField: FormControl;
  results$: Observable<any>;

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private  http: HttpClient) {
    this.id = this.route.snapshot.params.id;

    if (this.id !== 'new') {
      this.lugaresService.getLugar(this.id).valueChanges().subscribe(lugar => {
        this.lugar = lugar;
      });
    }

    const _URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .pipe(switchMap(query => this.http.get(`${_URL}?address=${query}`))
        , map((response: any) => response.results)
      );

    this.results$.subscribe();
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
