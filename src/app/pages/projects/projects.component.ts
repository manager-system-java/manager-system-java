import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  projectName: string = '';
  projectDescription: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error(err)
    });
  }

  createProject() {
    if (!this.projectName || !this.projectDescription) return;
    this.projectService.createProject(this.projectName, this.projectDescription).subscribe({
      next: () => {
        this.projectName = '';
        this.projectDescription = '';
        this.loadProjects();
      },
      error: (err) => console.error(err)
    });
  }
}