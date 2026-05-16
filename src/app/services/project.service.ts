import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  members: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl: string = 'http://localhost:8080/projects';

  constructor(private httpClient: HttpClient) {}

  getProjects() {
    return this.httpClient.get<Project[]>(this.apiUrl);
  }

  createProject(name: string, description: string) {
    return this.httpClient.post<Project>(this.apiUrl, { name, description });
  }

  joinProject(projectId: number) {
    return this.httpClient.post<string>(`${this.apiUrl}/${projectId}/join`, {});
  }

  
}