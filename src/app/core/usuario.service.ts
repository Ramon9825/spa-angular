import { Router } from '@angular/router';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const url: string = 'http://localhost:3000/usuarios/';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  listar(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(url);
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(url, usuario);
  }

  excluir(usuario: Usuario): Observable<void> {
    return this.httpClient.delete<void>(url + usuario.id);
  }
}
