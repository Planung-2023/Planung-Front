import { Component, OnInit, numberAttribute } from '@angular/core';
import { PerfilService } from '../perfil.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-imagen',
  templateUrl: './cambiar-imagen.component.html',
  styleUrls: ['./cambiar-imagen.component.css']
})
export class CambiarImagenComponent implements OnInit {
  fotoPerfilUsuario: any;
  nuevoIdFotoPerfil: number = 1;
  usuario: any;
  usuarioId: number = 5;
  foto1='foto-perfil-pingüino.jpg';
  foto2='foto1.jpg';
  foto3='gigachad1.jpg';
  foto4='chad1.jpeg';
  foto5='girl-chad.jpg';
  foto6='foto-perfil-6.jpg';
  foto7='foto-perfil-5.jpg';
  foto8='chad3.jpg';
  foto9='foto-perfil-2.png';

  constructor(private perfilService: PerfilService, public auth: AuthService, private router: Router) {
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
      console.log(this.fotoPerfilUsuario)
  }


  cambiarFoto(idFotoPerfil: number) {
    var idFoto= 1;
    if(idFotoPerfil===1){
      this.fotoPerfilUsuario=this.foto1
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===2){
      this.fotoPerfilUsuario=this.foto2
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===3){
      this.fotoPerfilUsuario=this.foto3
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===4){
      this.fotoPerfilUsuario=this.foto4
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===5){
      this.fotoPerfilUsuario=this.foto5
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===6){
      this.fotoPerfilUsuario=this.foto6
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===7){
      this.fotoPerfilUsuario=this.foto7
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===8){
      this.fotoPerfilUsuario=this.foto8
      idFoto=idFotoPerfil;
    }
    if(idFotoPerfil===9){
      this.fotoPerfilUsuario=this.foto9
      idFoto=idFotoPerfil;
    }
    this.nuevoIdFotoPerfil=idFoto;
    console.log(this.nuevoIdFotoPerfil)
  }

  guardarCambios() {
    this.perfilService.updateFotoPerfilIdUsuario(this.usuarioId, this.nuevoIdFotoPerfil).subscribe(()=>{
      this.navegarAEventos();
    });
  }  
  
navegarAEventos() {
  this.router.navigate(['/perfil']);
}
}