import {Component} from '@angular/core';
import {AutorizacionService} from './services/autorizacion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLogged = false;
  loggedUser: any = null;

  constructor(private autorizacionService: AutorizacionService, private router: Router) {
    this.autorizacionService.isLogged().subscribe((result) => {
        if (result && result.uid) {
          this.isLogged = true;
          setTimeout(() => {
            this.loggedUser = this.autorizacionService.getUser().currentUser.displayName;
          }, 500);
        } else {
          this.isLogged = false;
          this.router.navigate(['login']);
        }
      }, (error2) => {

        this.isLogged = false;
        console.log(error2);
      }
    );
  }

  public logout() {
    this.autorizacionService.logout();
  }
}
