import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEmpresa{
    _id?: string;
  tipoDocumento?: string;
  nombre: string;
  celular?: string;
  numeroDocumento?: string;
  email: string;
  passwordIngreso?: string;
}

@Injectable({
  providedIn: 'root'
})

// Para Angular 
export class EmpresaService {

  private apiUrl = 'http://localhost:8000/api/empresas';

  constructor(private http: HttpClient) {}

  register(empresaData: any):Observable<any> {
    return this.http.post(this.apiUrl, empresaData)
  }

    obtenerEmpresa(id: string):Observable<IEmpresa> {
      return this.http.get<IEmpresa>(`${this.apiUrl}/${id}`)
    }

    login(email: string, passwordIngreso:string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, { email, passwordIngreso});
    }
}

// Para PHP
// export class EmpresaService {

//   private apiUrl = 'http://localhost:8000'; // base URL de la API en PHP

//   constructor(private http: HttpClient) {}

//   // Registro de empresa (usuario)
//   register(empresaData: IEmpresa): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, empresaData);
//   }

//   // Login de empresa (usuario)
//   login(credentials: { email: string; passwordIngreso: string }): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }

//   // Obtener empresa por ID (si lo necesitas más adelante)
//   obtenerEmpresa(id: string): Observable<IEmpresa> {
//     return this.http.get<IEmpresa>(`${this.apiUrl}/empresas/${id}`);
//   }
// }