import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil/perfil.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { A2hsService } from 'src/a2hs.service';

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
  prompt: any;
  isPWA: boolean| undefined;

  constructor(
    private modal: NgbModal,
    public configuracionService: ConfiguracionService,
    private perfilService: PerfilService,
    public auth: AuthService,
    public a2hs: A2hsService
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
    this.isPWA = this.a2hs.checkStandalone();
    this.configuracionService.traerTema.subscribe((modo:string)=>{
      if(modo=='light'){
        this.temaClaroActivado=true
      }
      else this.temaClaroActivado=false
    })
    
      // A2HS - START
      this.a2hs.checkUserAgent();
      this.a2hs.trackStandalone();
      window.addEventListener('beforeinstallprompt', (e) => {
  
        // show the add button
        this.a2hs.promptIntercepted = true;
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
        e.preventDefault();
        // Stash the event so it can be displayed when the user wants.
        this.a2hs.deferredPrompt = e;
        this.a2hs.promptSaved = true;
  
      });
      window.addEventListener('appinstalled', (evt) => {
        this.a2hs.trackInstalled();
        // hide the add button
        // a2hs.promptIntercepted = false;
      });
      // A2HS - END
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