import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  managerName: string;
  members: string[];
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

  createProject(name: string, description: string, startDate: string, endDate: string, managerId: number) {
    return this.httpClient.post<Project>(this.apiUrl, { name, description, startDate, endDate, managerId });
  }

  joinProject(projectId: number) {
    return this.httpClient.post<Project>(`${this.apiUrl}/${projectId}/join`, {});
  }
}