import { Injectable, Component, Input  } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService} from './auth.service'
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Console } from '@angular/core/src/console';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService,
    private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

          if (this.authService.authenticated) {
                console.log('AUTH SERVICE PASSED')
              return true;
          }else{
  
            console.log('AUTH SERVICE DENIED')
          this.router.navigate(['/login'])
          return false;
          }
    }
}