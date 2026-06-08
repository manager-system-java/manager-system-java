import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
  apiUrl: string = `${environment.apiUrl}/affiliations`;

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