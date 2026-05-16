import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdmService {
  apiUrl: string = 'http://localhost:8080/adm';

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<UserAdmin[]>(`${this.apiUrl}/users`);
  }

  updateRole(id: number, role: string) {
    return this.httpClient.put(`${this.apiUrl}/users/${id}/role`, { role }, { responseType: 'text' });
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/users/${id}`, { responseType: 'text' });
  }
}