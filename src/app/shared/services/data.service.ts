import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
const urlBase = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
    private storageService: StorageService
  ) {}

  /*GET */
  get<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.get<T>(urlBase + url, {
      headers: httpHeaders,
      params: httpParams,
      observe: 'response',
    });
  }

  /*POST */
  post<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.post<T>(urlBase + url, data, {
      headers: httpHeaders,
      observe: 'response',
    });
  }
  /*PUT */
  put<T>(url: string, data: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.put<T>(urlBase + url, data, {
      headers: httpHeaders,
      observe: 'response',
    });
  }
  /*DELETE */
  delete<T>(url: string, params?: any): Observable<HttpResponse<T>> {
    const httpHeaders: HttpHeaders = this.getHeaders();
    return this.http.delete<T>(urlBase + url, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  getHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    const token = this.securityService.getToken();
    if (token) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return httpHeaders;
  }
}
