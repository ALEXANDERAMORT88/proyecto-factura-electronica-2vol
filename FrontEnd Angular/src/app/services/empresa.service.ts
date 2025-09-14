import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:5100/api/empresas';

  constructor(private http: HttpClient) { }

  register(userData: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
}
