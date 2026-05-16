import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  username: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error(err)
    });
  }

  joinProject(projectId: number) {
    this.projectService.joinProject(projectId).subscribe({
      next: () => alert('Afiliado ao projeto com sucesso!'),
      error: (err) => console.error(err)
    });
  }
}