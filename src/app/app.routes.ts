import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AdmComponent } from './pages/adm/adm.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: { role: 'gerente' }
  },
  {
    path: 'adm',
    component: AdmComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
];
