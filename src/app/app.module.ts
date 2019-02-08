import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {ResaltarDirective} from './directives/resaltar.directive';
import {ContarClicksDirective} from './directives/contar-clicks.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {DetalleComponent} from './detalle/detalle.component';
import {LugaresComponent} from './lugares/lugares.component';
import {ContactoComponent} from './contacto/contacto.component';
import {LugaresService} from './services/lugares.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {CrearComponent} from './crear/crear.component';
import {HttpClientModule} from '@angular/common/http';
import {LinkifystrPipe} from './pipes/linkifystr.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import {AutorizacionService} from './services/autorizacion.service';
import {MyGuardService} from './services/my-guard.service';

const appRoutes: Routes = [
  {path: '', component: LugaresComponent},
  {path: 'lugares', component: LugaresComponent},
  {path: 'detalle/:id', component: DetalleComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'crear/:id', component: CrearComponent, canActivate: [MyGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent}
];

export const firebaseConfig = {
  apiKey: 'AIzaSyAMD5wGnK0tBJIiW5ABPxsBISsIRgkYYSo',
  authDomain: 'platzisquare-b8bb1.firebaseapp.com',
  databaseURL: 'https://platzisquare-b8bb1.firebaseio.com',
  storageBucket: 'platzisquare-b8bb1.appspot.com',
  messagingSenderId: '419520125512'
};


@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD2kuV6IiDXyCg3hrKJXviZ4bU-_befkWk'
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [LugaresService, AutorizacionService, MyGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
