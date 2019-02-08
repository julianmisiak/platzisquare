import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LugaresService {
  API_ENDPOINT = 'https://platzisquare-b8bb1.firebaseio.com';

  lugares: any = [
    {
      id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true,
      nombre: 'Floreria la gardenia', description: 'Descripción del negocio'
    },
    {
      id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: false,
      nombre: 'Donas la pasdita', description: 'Descripción del negocio'
    },
    {
      id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true,
      nombre: 'Veterinaria', description: 'Descripción del negocio'
    },
    {
      id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false,
      nombre: 'Susgi Sihiroll', description: 'Descripción del negocio'
    },
    {
      id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true,
      nombre: 'Hotel la Garcia', description: 'Descripción del negocio'
    },
    {
      id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: true,
      nombre: 'Zapateria el Clavo', description: 'Descripción del negocio'
    }
  ];
  private mensajeError: string;
  private idToken: string;

  constructor(private afDB: AngularFireDatabase, private http: HttpClient, private angularFireAuth: AngularFireAuth) {
    console.log('  angularFireAuth.auth.currentUser: ' + JSON.stringify(angularFireAuth.auth.currentUser));
    angularFireAuth.auth.currentUser.getIdToken(true).then(
      (idToken) => {
        this.idToken = idToken;
      },
      (error) => {
        this.mensajeError = 'Necesitas loguearte Wachin!!!';
        alert(this.mensajeError);
      }
    ).catch(
      (error) => {
        this.mensajeError = 'Elol!!!';
      }
    );
  }

  public getLugares() {
    //  return this.afDB.list('lugares/');
    return this.http.get(this.API_ENDPOINT + '/.json?auth=' + this.idToken).pipe(
      map(resultado => resultado['lugares']
      )
    );
  }

  public buscarLugar(id) {
    return this.lugares.find(lugar => lugar.id == id) || null;
    // return this.lugares.filter(lugar => lugar.id === this.id)[0] || null;
  }

  public guardarLugar(lugar) {
    // this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.API_ENDPOINT + '/lugares.json', lugar, {headers}).subscribe();
  }

  public editarLugar(lugar) {
    console.log('guardado: ' + JSON.stringify(lugar));
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }

  public obtenerGeoData(direccion) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + direccion +
      '&key=AIzaSyD2kuV6IiDXyCg3hrKJXviZ4bU-_befkWk');
  }

  public getLugar(id) {
    return this.afDB.object('lugares/' + id);
  }
}
