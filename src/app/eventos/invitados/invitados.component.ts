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
    return 'assets/foto-perfil-3.png';
  }

  eliminarUsuario(invitado: any){
    this.invitadosControlService.eliminarInvitado(invitado)
  }
}
