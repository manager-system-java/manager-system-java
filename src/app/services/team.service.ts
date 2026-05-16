import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Team {
  id: number;
  name: string;
  description: string;
  members: string[];
  projects: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl: string = 'http://localhost:8080/teams';

  constructor(private httpClient: HttpClient) {}

  getTeams() {
    return this.httpClient.get<Team[]>(this.apiUrl);
  }

  createTeam(name: string, description: string, memberIds: number[]) {
    return this.httpClient.post<Team>(this.apiUrl, { name, description, memberIds });
  }

  addProjectToTeam(teamId: number, projectId: number) {
    return this.httpClient.post<Team>(`${this.apiUrl}/${teamId}/projects/${projectId}`, {});
  }
}