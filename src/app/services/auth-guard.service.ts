import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authToken = sessionStorage.getItem('auth-token');
    const userRole = sessionStorage.getItem('role');
    const requiredRole = next.data['role'];
  
    if (!authToken) {
      this.router.navigate(['/login']);
      return false;
    }
  
    if (!requiredRole) {
      return true;
    }
  
    // Admin acessa tudo
    if (userRole === 'admin') {
      return true;
    }
  
    // Gerente acessa home e projects
    if (userRole === 'gerente' && (requiredRole === 'colaborador' || requiredRole === 'gerente')) {
      return true;
    }
  
    // Colaborador acessa só home
    if (userRole === 'colaborador' && requiredRole === 'colaborador') {
      return true;
    }
  
    this.router.navigate(['/login']);
    return false;
  }
}
