import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../core/usuario.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'spa-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit, OnDestroy {
  display = '';
  @ViewChild('boolean') boleano: boolean = true;
  cadastro!: FormGroup;
  private componentDestroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.criarFormulario(this.criarUsuarioEmBranco());
    this.router.navigateByUrl('cadastro');
  }

  ngOnDestroy() {
    this.componentDestroyed$.unsubscribe();
  }

  onNavigate() {
    this.router.navigateByUrl('usuarios');
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

  salvar(): void {
    const usuario = this.cadastro.getRawValue() as Usuario;
    if(usuario.urlImagem === null) {
      usuario.urlImagem = 'https://d29fhpw069ctt2.cloudfront.net/icon/image/37746/preview.svg';
    }
    this.usuarioService.salvar(usuario).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  private criarUsuarioEmBranco(): Usuario {
    return {
      nome: null,
      email: null,
      urlImagem: null,
      siteUsuario: null,
      data: null
    } as unknown as Usuario;
  }

  private criarFormulario(usuario: Usuario): void {
    this.cadastro = this.fb.group({
      nome: [usuario.nome,[Validators.required]],
      email: [usuario.email, [Validators.required]],
      urlImagem: [usuario.urlImagem],
      siteUsuario: [usuario.siteUsuario],
      data: [usuario.data, [Validators.required]]
    });
    console.log(this.cadastro);
  }

}
