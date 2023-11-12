import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { AuthService } from '@auth0/auth0-angular';

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

  constructor(private perfilService: PerfilService, public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      const authIdentifier = user?.sub;
      this.getFotoPorAuth(authIdentifier);
    });
  }

  getFotoPorAuth(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({ usuario }: any) => {
        this.usuario = usuario;
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