import { Component, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { PerfilService } from '../perfil.service';

@Component({
  selector: "app-ver-perfil",
  templateUrl: "./ver-perfil.component.html",
  styleUrls: ["./ver-perfil.component.css"],
})
export class VerPerfilComponent implements OnInit {
  editandoUsuario = false;
  usuarioEditado: string = "";
  nombreUsuario: string = "";
  usuario: any;
  participante: Participante = {
    id: 1,
    apellido: "",
    mail: "",
    nombre: "",
  };
  nombrePersona: any;
  apellidoPersona: any;
  correoUsuario: any;
  fotoPerfilUsuario: any;

  constructor(private perfilService: PerfilService, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      const authIdentifier = user?.sub;
      this.getUsuarioPorAuthIdentifier(authIdentifier);
    });
  }

  getUsuarioPorAuthIdentifier(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({ usuario }: any) => {
        this.usuario = usuario;
        this.nombreUsuario = usuario.nombreUsuario;
        this.nombrePersona = usuario.nombre;
        this.apellidoPersona = usuario.apellido;
        this.correoUsuario = usuario.email;
        this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
      });
  }

  /* Prueba editar nombre de usuario */
  editarUsuario() {
    this.editandoUsuario = true;
    this.usuarioEditado = this.nombreUsuario;
  }

  guardarUsuarioEditado() {
    this.editandoUsuario = false;
    this.nombreUsuario = this.usuarioEditado;
  }
  /* --------------------------------- */
}

//test
interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}
