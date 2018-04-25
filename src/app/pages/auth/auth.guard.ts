import {Injectable} from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
// import {Authservice} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
      console.log('Active');
    if (sessionStorage.getItem('currentUser')) {

        // logged in so return true
        return true;
    }
    //not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;

      // return this.authService.isAuthenticated().then(
      //   (authenticated: boolean) => {
      //     if (authenticated){
      //       return true;
      //     }
      //     else{
      //       this.router.navigate(['/']);
      //     }
      //   }
      // );
      // return false;
    }
}
