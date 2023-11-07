import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-cambiar-imagen',
  templateUrl: './cambiar-imagen.component.html',
  styleUrls: ['./cambiar-imagen.component.css']
})
export class CambiarImagenComponent implements OnInit {
  fotoPerfilUsuario: any;
  nuevoIdFotoPerfil: number = 0;
  usuario: any;
  usuarioId: number = 5;

  constructor(private perfilService: PerfilService) {
  }

  ngOnInit() {
    const usuarioId = 5;
    
    this.perfilService.getDatosUsuario(usuarioId).subscribe((usuario: any) => {
      this.usuario = usuario;
      console.log(usuario.fotoPerfil.nombre);
      this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
    });
  }


  cambiarFoto(idFotoPerfil: number) {
  this.nuevoIdFotoPerfil = idFotoPerfil;
  }

  guardarCambios() {
    this.perfilService.updateFotoPerfilIdUsuario(this.usuarioId, this.nuevoIdFotoPerfil).subscribe(
      (response) => {
        // Actualización exitosa, puedes redirigir o mostrar un mensaje de éxito
        console.log('Foto de perfil actualizada con éxito');
      },
      (error) => {
        // Manejar errores, mostrar mensajes de error, etc.
        console.error('Error al actualizar la foto de perfil', error);
      });
  }  
}