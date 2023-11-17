import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { ListaEventosService } from '../lista-eventos.service';
import { InvitacionControlService } from '../invitacion-control.service';
import { InvitadosControlService } from '../invitados-control.service';
import { RecursosService } from 'src/app/recursos/recursos.service';
import { Time } from '@angular/common';
import {} from 'googlemaps';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})

export class ListaEventosComponent implements OnInit {
  invitadoSeleccionado: string = '';
  usuario: Usuario|undefined;
  eventos: any[] = [];
  recursos: Recurso[] = [];
  tiposDeRecursos: any = [];
  asistentes: Asistente[] = [];
  mostrarMapa: boolean = false;
  mostrarPopupInvitados = false;
  panelAbierto: string = 'todos';
  apiLoaded: boolean = true;
  display: any;
  position = {lat: 34.598613, lng: 58.415632}
  label = {
    color: "red",
    text: "marcador",
  }
  options: google.maps.MapOptions = {
    center: this.position,
    zoom: 17,
  };
  invitadosComponent: any;
  participante: Participante|undefined;
  
  Rol: Rol|undefined;

  constructor(
    private modal: NgbModal,
    private router: Router,
    private listaEventosService: ListaEventosService,
    private invitacionControlService: InvitacionControlService,
    private invitadosControlService: InvitadosControlService,
    private recursoService: RecursosService,
    private dialog: MatDialog,
    public auth0: AuthService,
  ) {}
  
  ngOnInit() {
      this.auth0.user$.subscribe((user) => {
      const authIdentifier = user?.sub;
      this.listaEventosService.getUsuarioId(authIdentifier).subscribe(({usuario}: any) => {
        this.usuario = usuario;
    });
    })
    this.recursoService.tiposDeRecursos().subscribe({
      next: v => {
        this.tiposDeRecursos = v;
      },
      error: e => {
        console.log(e);
        this.mockearTiposDeRecursos();
      },
      complete: () => {},
    });
    this.recuperarEventos();
    console.log(this.recuperarEventos())
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  // Método para mostrar el popup
  showPopup() {
    this.invitacionControlService.showPopup();
  }

  showPopupInvitado(nombreInvitado: string, apellidoInvitado: string, evento: Evento) {
    this.invitadoSeleccionado = nombreInvitado;
    this.invitadosControlService.soyAdmin = this.esAdministrador(evento);
    this.invitadosControlService.usuarioId = this.usuario?.id;
    this.invitadosControlService.invitadoNombre = nombreInvitado;
    this.invitadosControlService.invitadoApellido = apellidoInvitado;
    this.invitadosControlService.showPopupInvitado();
  }

  mostrarInvitado(nombreInvitado: string) {
    this.invitadoSeleccionado = nombreInvitado;
  }

    //ejemplo
  private recuperarEventos() {
    this.listaEventosService.getEventos(this.usuario?.id).subscribe(data => {
      this.eventos = data;
      this.eventos.forEach(evento => this.listaEventosService.getRecursosByEventoId(evento.id).subscribe(
        (data: Recurso[]) => {
          evento.recursos = data;
        }
      ))
  
      this.eventos.forEach(evento => this.listaEventosService.getAsistentes(evento.id).subscribe(
        (data: Asistente[]) => {
          
          evento.asistentes = data;
      }))
    }
    );
  }

  formatearHora(hora: string): string {
    return hora.slice(0, 5);
  }

  esAdministrador(evento:Evento){
    return evento.asistentes?.find(a => a.participante.usuario.id === this.usuario?.id)?.esAdministrador; 
  }


  redireccionarCrearEvento(): void {
    this.router.navigate(['/eventos', 'crear']);
  }


  agregarRecurso(evento: any): void {
    this.router.navigate(['/eventos', evento.id, 'recursos', 'crear']);
  }

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irANotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }

  visualizarRecurso(evento: any, recurso: Recurso): void {
    this.router.navigate(['/eventos', evento.id, 'recursos', recurso.id ], { state: { recurso: recurso } });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.position = (event.latLng.toJSON());
      const coordenadas = event.latLng.toJSON();
    }
  }

  verMapa() {
    this.mostrarMapa = true;
  }

  cartelIrAMaps(modal: any, ubicacion: any) {
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    modalRef.result.then(
      (result: any) => {
          this.irAMaps(ubicacion)
        },
        
      (reason: any) => {}
    );
  }

  irAMaps(ubicacion: any) {
    var googleMapsLink: string = "";
    if(ubicacion.latitud!=null && ubicacion.longitud!=null){
      const coordsString: string = ubicacion.latitud + "," + ubicacion.longitud;
      googleMapsLink = `https://www.google.com/maps?q=${coordsString}`;      
    }
    else {
      const ubicacionString:string = (ubicacion.calle + " " + ubicacion.altura +  ", " + ubicacion.ciudad + ", " + ubicacion.localidad)
      googleMapsLink = `https://www.google.com/maps?q=${ubicacionString}`;
    }
    console.log(googleMapsLink);
    window.open(googleMapsLink, '_blank');
  }

  volverAtras() {
    this.mostrarMapa = false;
  }
  mostrarCardAgregar(modal: any, evento: Evento) {
    const index = this.eventos.findIndex(i => i===evento)
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    modalRef.result.then(
      (result: any) => {
          // Si es una adición normal, agregar el nuevo recurso
          const recurso = result.obtenerDatos();
          const recursoAgregar = {
            recursos: [recurso]
          }
          this.eventos[index].recursos.push(recurso);
          this.recursoService.postRecurso(evento.id,recursoAgregar).subscribe((response:any)=>{console.log(response)});
        },
        
      (reason: any) => {}
    );
  }

  private mockearTiposDeRecursos() {
    this.tiposDeRecursos = [
      { id: 1, nombre: 'Bebida' },
      { id: 2, nombre: 'Mobiliario' },
      { id: 3, nombre: 'Comida' },
      { id: 4, nombre: 'Juego' },
      { id: 5, nombre: 'Tecnología' },
      { id: 6, nombre: 'Otro' },
    ];
  }

  nombreTipoRecursoSegunId(id: string|number) {
    return this.tiposDeRecursos.find((t: any ) => t.id == id)?.nombre;
  }

  validarYCerrarModal(componenteCrearRecurso: any) {
    if ( componenteCrearRecurso.formulario.valid) {
      return true;
    } else {
      
      console.log("ERROR");
      return false;
    }
  }

  openMapDialog(evento:Evento) {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '80%',
      height: '50%',
      data: {
        position: this.position,
        options: this.options,
      },
    });
    this.position.lat=evento.ubicacion.latitud;
    this.position.lng=evento.ubicacion.longitud;
  }

  abrirPanel(panel: string) {
    this.panelAbierto = panel;
  }

  cerrarPanel(panel: string) {
    if (this.panelAbierto === panel) {
      this.panelAbierto = 'todos';
    }
  }
}

//Agregado para pruebas
interface Evento {
  id: number;
  nombre: string;
  creador: Participante;
  fecha: Date;
  horaInicio: Date;
  horaFin: Date;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
  recursos: Recurso[];
  asistentes: Asistente[];
}

interface Usuario {
  id: number;
  idAuth0: string;
  nombreUsuario: string;
  email: string;
  nombre: string;
  apellido: string;
  fotoPerfilId: any;
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
  longitud: number
}
interface Asistente {
  id: number;
  activo: boolean;
  participante: Participante;
  rol: Rol;
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