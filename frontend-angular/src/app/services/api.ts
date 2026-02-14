import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getTareas(token: string, page: number = 1) {
    return this.http.get(`${this.apiUrl}/tareas?page=${page}&limit=5`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  createTarea(nombre: string, token: string) {
    return this.http.post(
      `${this.apiUrl}/tareas`,
      { nombre },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }

  // 🔥 NUEVO MÉTODO PARA EDITAR
  updateTarea(id: string, nombre: string, token: string) {
    return this.http.put(
      `${this.apiUrl}/tareas/${id}`,
      { nombre },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }
    );
  }

  deleteTarea(id: string, token: string) {
    return this.http.delete(`${this.apiUrl}/tareas/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
