import { Router } from '@angular/router';
import { UsuarioService } from './../../core/usuario.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'spa-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  display = '';
  listaUsuario: Usuario[] = [];
  displayedColumns: string[] = ['id', 'usuario'];
  @ViewChild('boolean') boleano: boolean = true;
  private componentDestroyed$ = new Subject();
  
  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.router.navigateByUrl('usuarios');
  }

  ngOnDestroy() {
    this.componentDestroyed$.unsubscribe();
  }

  onShowHide(): void {
    if(this.boleano) {
      this.display='flex';
      this.boleano = false;
    } else {
      this.display='none';
      this.boleano = true;
    }
  }

  onNavigate() {
    this.router.navigateByUrl('cadastro');
  }

  excluir(usuario: Usuario): void {
    this.usuarioService.excluir(usuario).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  private listarUsuarios(): void {
    this.usuarioService.listar().subscribe((usuario: Usuario[]) => this.listaUsuario.push(...usuario));
    console.log(this.listaUsuario);
  }
}
