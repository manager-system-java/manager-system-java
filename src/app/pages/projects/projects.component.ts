import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';
import { TeamService, Team } from '../../services/team.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  teams: Team[] = [];

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
    private teamService: TeamService
  ) {}

  ngOnInit() {
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
}