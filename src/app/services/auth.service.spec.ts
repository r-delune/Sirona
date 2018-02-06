import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-gaurd.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService, AuthGuardService], (authGuard: AuthGuardService, service: AuthService) => {
   // expect(authGuard.canActivate()).toBeFalsy();
    expect(service).toBeTruthy();
    
  }));
});
