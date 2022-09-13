import { Injectable }                                                                from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable }                                                           from 'rxjs';
import {
  StateService
}                                                                                    from '../data/state.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {

  constructor(
    private readonly stateService: StateService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.stateService.state.pipe(map(state => {
      console.log('[LoggedInGuard] check logged in');
      if (state.uiState?.isLoggedIn) return true;

      return this.router.createUrlTree(['/login']);
    }));
  }

}
