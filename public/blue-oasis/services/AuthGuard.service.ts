import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import AdminService from './User.service';

@Injectable()
class AuthGuard implements CanActivate {

    public constructor(private __router: Router, private __adminService: AdminService) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.__adminService.isLoggedIn().map((value: boolean) => {
            if (value === false) {
                this.__router.navigate(['/signin']);
                return false;
            }

            return true;
        });
    }
}

export default AuthGuard;
