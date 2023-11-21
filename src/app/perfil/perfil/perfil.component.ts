import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil.service';
import { ListaEventosService } from 'src/app/eventos/lista-eventos.service';
import { PerfilStorageService } from '../perfil-storage.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  @ViewChild('errorModalContent') errorModalContent: any;
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  usuario: any;
  formulario = new FormGroup({
    nombreUsuario: new FormControl(this.nombreUsuario, [Validators.required]),
    apellidoUsuario: new FormControl(this.apellidoUsuario, [Validators.required])
  });
  correoParticipante: string = '';
  fotoPerfilUsuario: string = '';
  correoUsuario: any;

  constructor(
    private modal: NgbModal,
    private perfilService: PerfilService,
    private perfilStorageService: PerfilStorageService,
    public auth: AuthService,
    public usuarioService: UsuarioService
    ) {}

  ngOnInit() {
    this.getUsuarioPorAuthIdentifier(localStorage.getItem("evento_usuario_id"));
  }

  getUsuarioPorAuthIdentifier(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({usuario}: any) => {
      this.perfilStorageService.usuario = usuario;
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombre;
      this.apellidoUsuario = usuario.apellido;
      this.correoUsuario = usuario.email;
      this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
    });
  }

  mostrarCardAgregar(modal: any) {
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    modalRef.result.then(
      (result: any) => {
        console.log(this.formulario.getRawValue())
        this.perfilService.actualizarUsuario(this.usuario, this.formulario.getRawValue()).subscribe();
        
      },
      (reason: any) => {}
    );
  }
  validarYCerrarModal() {
      if ( this.formulario.valid) {
        return true;
      } else {
        //alert('Completar los Campos');
        this.activarError();
        return false;
      }
    }

    activarError(){
      this.modal.open(this.errorModalContent, { centered: true, size: 'sm'}).result.then(
        (result: any) => {
          
        },
        (reason: any) => {}
      )
    }

    cartelCerrarSesion(modal: any){
      const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
      modalRef.result.then(
        (result: any) => {
            this.cerrarSesion()
          },
          
        (reason: any) => {}
      );
    }
  
    cerrarSesion() {
      this.auth.logout();
    }
}

//test
interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}


 /*
  constructor(public auth: AuthService) {}

  verToken(){
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log(claims);
    });
  }
  /*/

  /*
  // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getDatosUsuario(usuarioId).subscribe((usuario: any) => {
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombreUsuario;
      console.log(usuario.fotoPerfil.nombre);
      this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
    });
    
    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getDatosParticipante(participanteId).subscribe((res: any) => {
      this.participante = res.participante; 
      this.nombreParticipante = this.participante.nombre;
      this.apellidoParticipante = this.participante.apellido;
      this.correoParticipante = this.participante.mail;
    });
  */
