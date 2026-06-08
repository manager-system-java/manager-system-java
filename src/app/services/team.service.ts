import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  environment } from '../../environments/environment.development';

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
  apiUrl: string = `${environment.apiUrl}/teams`;

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