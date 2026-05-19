import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { TeamService, Team } from '../../services/team.service';
import { AffiliationService } from '../../services/affiliation.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  teams: Team[] = [];
  username: string = '';

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private affiliationService: AffiliationService,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    this.loadProjects();
    this.loadTeams();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => this.toastr.error('Erro ao carregar projetos')
    });
  }

  loadTeams() {
    this.teamService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (err) => this.toastr.error('Erro ao carregar equipes')
    });
  }

  requestAffiliation(projectId: number) {
    this.affiliationService.requestAffiliation(projectId).subscribe({
      next: () => this.toastr.success('Solicitação enviada! Aguarde aprovação do gerente.'),
      error: () => this.toastr.error('Erro ao enviar solicitação')
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}