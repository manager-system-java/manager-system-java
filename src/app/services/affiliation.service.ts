import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AffiliationRequest {
  id: number;
  userName: string;
  projectName: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {
  apiUrl: string = 'http://localhost:8080/affiliations';

  constructor(private httpClient: HttpClient) {}

  requestAffiliation(projectId: number) {
    return this.httpClient.post(`${this.apiUrl}/request/${projectId}`, {}, { responseType: 'text' });
  }

  getPendingRequests() {
    return this.httpClient.get<AffiliationRequest[]>(`${this.apiUrl}/pending`);
  }

  approveRequest(requestId: number) {
    return this.httpClient.put(`${this.apiUrl}/approve/${requestId}`, {}, { responseType: 'text' });
  }

  rejectRequest(requestId: number) {
    return this.httpClient.put(`${this.apiUrl}/reject/${requestId}`, {}, { responseType: 'text' });
  }
}