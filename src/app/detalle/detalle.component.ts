import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LugaresService} from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  id = 1;
  lugar: any = {};

  constructor(private route: ActivatedRoute, private lugarService: LugaresService) {
    console.log(this.route.snapshot.params.id);
    console.log(this.route.snapshot.queryParams.action2);
    console.log(this.route.snapshot.queryParams.referer);

    this.id = this.route.snapshot.params.id;
    this.lugar = lugarService.buscarLugar(this.id);
  }

  ngOnInit() {
  }

}
