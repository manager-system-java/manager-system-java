import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';
import { TeamService, Team } from '../../services/team.service';
import { AffiliationService, AffiliationRequest } from '../../services/affiliation.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  teams: Team[] = [];
  pendingRequests: AffiliationRequest[] = [];
  username: string = '';

  projectName: string = '';
  projectDescription: string = '';
  projectStartDate: string = '';
  projectEndDate: string = '';
  projectManagerId: number | null = null;

  teamName: string = '';
  teamDescription: string = '';

  selectedTeamId: number | null = null;
  selectedProjectId: number | null = null;

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private affiliationService: AffiliationService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    this.loadProjects();
    this.loadTeams();
    this.loadPendingRequests();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error(err)
    });
  }

  loadTeams() {
    this.teamService.getTeams().subscribe({
      next: (data) => this.teams = data,
      error: (err) => console.error(err)
    });
  }

  loadPendingRequests() {
    this.affiliationService.getPendingRequests().subscribe({
      next: (data) => this.pendingRequests = data,
      error: (err) => console.error(err)
    });
  }

  createProject() {
    if (!this.projectName || !this.projectDescription || !this.projectStartDate || !this.projectEndDate || !this.projectManagerId) return;
    this.projectService.createProject(
      this.projectName,
      this.projectDescription,
      this.projectStartDate,
      this.projectEndDate,
      this.projectManagerId
    ).subscribe({
      next: () => {
        this.projectName = '';
        this.projectDescription = '';
        this.projectStartDate = '';
        this.projectEndDate = '';
        this.projectManagerId = null;
        this.loadProjects();
      },
      error: (err) => console.error(err)
    });
  }

  createTeam() {
    if (!this.teamName || !this.teamDescription) return;
    this.teamService.createTeam(this.teamName, this.teamDescription, []).subscribe({
      next: () => {
        this.teamName = '';
        this.teamDescription = '';
        this.loadTeams();
      },
      error: (err) => console.error(err)
    });
  }

  linkTeamToProject() {
    if (!this.selectedTeamId || !this.selectedProjectId) return;
    this.teamService.addProjectToTeam(this.selectedTeamId, this.selectedProjectId).subscribe({
      next: () => {
        this.selectedTeamId = null;
        this.selectedProjectId = null;
        this.loadTeams();
      },
      error: (err) => console.error(err)
    });
  }

  approveRequest(requestId: number) {
    this.affiliationService.approveRequest(requestId).subscribe({
      next: () => {
        this.loadPendingRequests();
        this.loadProjects();
      },
      error: (err) => console.error(err)
    });
  }

  rejectRequest(requestId: number) {
    this.affiliationService.rejectRequest(requestId).subscribe({
      next: () => this.loadPendingRequests(),
      error: (err) => console.error(err)
    });
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}