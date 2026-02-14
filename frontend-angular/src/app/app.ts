import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  email = '';
  password = '';
  mensaje = '';
  error = '';
  tareas: any[] = [];
  token = '';
  role = '';
  page = 1;

  editandoId: string | null = null;
  nombreEditado = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {

      const savedToken = localStorage.getItem('token');

      if (savedToken) {
        this.token = savedToken;

        const decoded: any = jwtDecode(savedToken);
        this.role = (decoded.role || '').toLowerCase();

        localStorage.setItem('role', this.role);

        this.cargarTareas();
      }
    }
  }

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {

      this.token = res.token;

      const decoded: any = jwtDecode(res.token);
      this.role = (decoded.role || '').toLowerCase();

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', this.token);
        localStorage.setItem('role', this.role);
      }

      this.mensaje = "Login exitoso ✨";
      this.error = '';
      this.cargarTareas();

    }, () => {
      this.mensaje = "Credenciales incorrectas ❌";
      this.error = '';
    });
  }

  cargarTareas() {
    this.api.getTareas(this.token, this.page)
      .subscribe((res: any) => {
        this.tareas = res.data;
      });
  }

  agregar(nombre: string) {

    if (this.role !== 'admin' && this.role !== 'user') {
      this.error = "No tienes permisos para agregar";
      return;
    }

    if (!nombre) return;

    this.api.createTarea(nombre, this.token)
      .subscribe(() => {
        this.error = '';
        this.cargarTareas();
      }, (err) => {
        this.error = err.error?.message || "Error al agregar";
      });
  }

  eliminar(id: string) {

    if (this.role !== 'admin') {
      this.error = "Solo admin puede eliminar";
      return;
    }

    this.api.deleteTarea(id, this.token)
      .subscribe(() => {
        this.error = '';
        this.cargarTareas();
      }, () => {
        this.error = "Error al eliminar";
      });
  }

  iniciarEdicion(tarea: any) {
    this.editandoId = tarea._id;
    this.nombreEditado = tarea.nombre;
  }

  guardarEdicion(id: string) {

    if (this.role !== 'admin' && this.role !== 'user') {
      this.error = "No tienes permisos para editar";
      return;
    }

    this.api.updateTarea(id, this.nombreEditado, this.token)
      .subscribe(() => {
        this.editandoId = null;
        this.nombreEditado = '';
        this.error = '';
        this.cargarTareas();
      }, () => {
        this.error = "Error al editar";
      });
  }

  cancelarEdicion() {
    this.editandoId = null;
    this.nombreEditado = '';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }

    this.token = '';
    this.role = '';
    this.tareas = [];
    this.mensaje = '';
    this.error = '';
  }
}
