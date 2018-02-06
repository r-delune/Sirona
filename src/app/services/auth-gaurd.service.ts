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
    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }
    checkLogin(): boolean {
      console.log('AUTH GAURAD CHECKING LOGIN')
      console.log(this.authService)
      console.log(this.authService.userId)
      
        if (this.authService.userId) {
          console.log('Logged in')
            return true;
        }

        console.log('Not Logged in')
        return false;
    }
}