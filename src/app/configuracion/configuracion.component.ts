import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil/perfil.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent implements OnInit {
  usuario: any;
  user: any;
  correoParticipante: string = '';
  nombreUsuario: string = ''; // Agrega esta propiedad
  correoUsuario: any;
  temaClaroActivado= this.configuracionService.tema=='light';

  constructor(
    private modal: NgbModal,
    public configuracionService: ConfiguracionService,
    private perfilService: PerfilService,
    public auth: AuthService
    ){} // Inyecta el servicio

  cambiarModo(event: MatSlideToggleChange) {
    var modo = '';
    if (event.checked) {
      modo = 'light';
    } else { 
      modo = 'dark';
    }
    this.configuracionService.pasarInfo(modo);
  }

  ngOnInit() {
    this.getDatosUsuarioPorAuth(localStorage.getItem("evento_usuario_id"));
    this.configuracionService.traerTema.subscribe((modo:string)=>{
      if(modo=='light'){
        this.temaClaroActivado=true
      }
      else this.temaClaroActivado=false
    })
  }

 getDatosUsuarioPorAuth(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({usuario}: any) => {
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombreUsuario;
      this.correoUsuario = usuario.email;
    });
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



interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}