import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { TeamService, Team } from '../../services/team.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  teams: Team[] = [];
  username: string = '';

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    this.loadProjects();
    this.loadTeams();
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

  joinProject(projectId: number) {
    this.projectService.joinProject(projectId).subscribe({
      next: () => this.loadProjects(),
      error: (err) => console.error(err)
    });
  }
}