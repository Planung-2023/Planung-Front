import { Component } from '@angular/core';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-cambiar-imagen',
  templateUrl: './cambiar-imagen.component.html',
  styleUrls: ['./cambiar-imagen.component.css']
})
export class CambiarImagenComponent {
  fotoPerfilPrincipal: string;

  constructor(private perfilService: PerfilService) {
    this.fotoPerfilPrincipal = this.perfilService.getFotoPerfil();
  }

  cambiarFoto(nuevaFoto: string) {
    this.perfilService.setFotoPerfil(nuevaFoto);
    this.fotoPerfilPrincipal = nuevaFoto;
  }
}