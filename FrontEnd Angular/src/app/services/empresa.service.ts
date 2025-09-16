import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEmpresa{
  _id: string;
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:5100/empresas';

  constructor(private http: HttpClient) {}

  register(empresaData: any):Observable<any> {
    return this.http.post(this.apiUrl, empresaData)
  }

    obtenerEmpresa(id: string):Observable<IEmpresa> {
      return this.http.get<IEmpresa>(`${this.apiUrl}/${id}`)
    }
}
