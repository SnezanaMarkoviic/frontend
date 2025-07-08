
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WitService {
  private baseUrl = 'https://api.wit.ai/message';
  private accessToken = 'JOB6M534QBFN7JEFANXMEMI5ONWG2IKN'; // Tvoj Wit.ai API token

  constructor(private http: HttpClient) {}

  sendMessageToWitAi(userMessage: string): Observable<any> {
    const url = `${this.baseUrl}?v=20250702&q=${encodeURIComponent(userMessage)}`;

    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}