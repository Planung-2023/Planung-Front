import { Component, Input } from '@angular/core';
import { InvitadosControlService } from '../invitados-control.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invitados',
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.css']
})
export class InvitadosComponent {
  mostrarPopupInvitado = false;
  usuarioAdmin: boolean;
  @Input() invitadoNombre: string = '';
  @Input() invitadoApellido: string = '';

  constructor(
    private modal: NgbModal,
    public invitadosControlService: InvitadosControlService
    ) {
    this.usuarioAdmin = invitadosControlService.invitado.soyAdmin
  }
  administrador(event: MatSlideToggleChange){
    if(event.checked){
      this.usuarioAdmin = true
    }
    else this.usuarioAdmin = false;
    this.invitadosControlService.invitado.soyAdmin = this.usuarioAdmin;
    console.log(this.invitadosControlService.invitado.soyAdmin)
  }

  guardarInvitado(){
    this.invitadosControlService.actualizarInvitado();
    console.log(this.invitadosControlService.invitado.soyAdmin)
  }
  cartelEliminarUsuario(modal: any) {
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    console.log(this.invitadoApellido, this.invitadoNombre)
    modalRef.result.then(
      (result: any) => {
          this.eliminarUsuario(this.invitadosControlService.invitado)
        },
        
      (reason: any) => {}
    );
  }
  showPopupInvitado() {
    this.invitadosControlService.showPopupInvitado();
  }

  hidePopupInvitado() {
    this.invitadosControlService.closePopupInvitado();
  }

  getFotoPerfil(){
    this.invitadosControlService.getUsuario()
    return 'assets/foto1.jpg';
  }

  eliminarUsuario(invitado: any){
    this.invitadosControlService.eliminarInvitado(invitado)
  }
}

interface Evento {
  id: number;
  nombre: string;
  creador: Participante;
  fecha: Date;
  horaInicio: any;
  horaFin: any;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
  tipoInvitacion: string;
  recursos: Recurso[];
  asistentes: Asistente[];
  descripcion: string;
}

interface Usuario {
  id: number;
  idAuth0: string;
  nombreUsuario: string;
  email: string;
  nombre: string;
  apellido: string;
  fotoPerfil: any;
}

interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadActual: number;
  cantidadNecesaria: number;
  proveedor: string;
  recursoCategoriaId: number;
  colorTarjeta: string;
  eventoId: number;
  categoria: Categoria;
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Creador{
  id: number;
  nombreUsuario: string;
}

interface ubicacion{
  id: number,
  calle: string,
  altura: number,
  localidad: string,
  latitud: number,
  longitud: number,
  ciudad: string
}
interface Asistente {
  id: number;
  activo: boolean;
  participante: Participante;
  rol: Rol;
  estaAceptado: boolean;
  esAdministrador: boolean;
}

interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
  usuario: any;
}

interface Rol {
  id: number;
  nombre: string;
}