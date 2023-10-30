import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil.service';
import { ListaEventosService } from 'src/app/eventos/lista-eventos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  nombreUsuario: string = '';
  usuario: any;


  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    const usuarioId = 1; // Reemplaza esto con el ID del usuario que desees obtener
    
    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getNombreDeUsuario(usuarioId).subscribe((usuario: any) => {
      this.nombreUsuario = usuario.nombreUsuario;
    });

    
  }
}








 /*
  constructor(public auth: AuthService) {}

  verToken(){
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log(claims);
    });
  }
  /*/

