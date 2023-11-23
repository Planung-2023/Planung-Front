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
import { forkJoin } from 'rxjs';
import { presentador } from 'src/environments/environment.development';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})

export class ListaEventosComponent implements OnInit {
  invitadoSeleccionado: string = '';
  usuario: Usuario|undefined;
  eventos: Evento[] = [];
  recursos: Recurso[] = [];
  tiposDeRecursos: any = [];
  asistentes: Asistente[] = [];
  mostrarMapa: boolean = false;
  mostrarPopupInvitados = false;
  panelAbierto: string = 'todos';
  apiLoaded: boolean = true;
  display: any;
  invitadosComponent: any;
  participante: Participante|undefined;
  rol: Rol|undefined;
  position = {lat: 34.598613, lng: 58.415632}
  label = {
    color: "red",
    text: "marcador",
  }
  options: google.maps.MapOptions = {
    center: this.position,
    zoom: 15,
  }

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
    this.listaEventosService.getUsuarioId(localStorage.getItem("evento_usuario_id")).subscribe(({usuario}: any) => {
      this.usuario = usuario;
    });
    this.recuperarEventos();
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
    
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
  }

//Traer Eventos
  private recuperarEventos() {
    this.listaEventosService.getEventos(this.usuario?.id).subscribe(data => {
      this.eventos = data;

      const recursosObservables = this.eventos.map(evento =>
        this.listaEventosService.getRecursosByEventoId(evento.id)
      );

      const asistentesObservables = this.eventos.map(evento =>
        this.listaEventosService.getAsistentes(evento.id)
      );

      forkJoin(recursosObservables).subscribe(recursosData => {
        recursosData.forEach((recursos, index) => {
          this.eventos[index].recursos = recursos;
        });

        forkJoin(asistentesObservables).subscribe(asistentesData => {
          asistentesData.forEach((asistentes, index) => {
            this.eventos[index].asistentes = asistentes;
          });

          const estaAceptado = this.eventos.filter(e =>
            e.asistentes?.some(a => a.participante.usuario.id === this.usuario?.id && a.estaAceptado)
          );

          this.eventos = estaAceptado;
        });
      });
    });
  }

//Traer tipo recursos
  nombreTipoRecursoSegunId(id: string|number) {
    return this.tiposDeRecursos.find((t: any ) => t.id == id)?.nombre;
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

  aceptarInvitado(asistente: any, evento: any){
    console.log(asistente);
    var data = {
      nuevoEstado: true,
    }
    this.listaEventosService.aceptarInvitado(asistente, data).subscribe(()=>{
      this.recuperarEventos();
    });
  }
// Métodos para mostrar pop-ups
  showPopupInvitado(invitado: any, evento: Evento) {
    this.invitadoSeleccionado = invitado;
    this.invitadosControlService.soyAdmin = this.esAdministrador(evento);
    this.invitadosControlService.invitado = invitado;
    this.invitadosControlService.usuario = this.usuario;
    this.invitadosControlService.evento = evento;
    this.invitadosControlService.invitadoNombre = invitado.nombre;
    this.invitadosControlService.invitadoApellido = invitado.apellido;
    this.invitadosControlService.showPopupInvitado();
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

  mostrarCardAgregarRecurso(modal: any, evento: Evento) {
    const index = this.eventos.findIndex(i => i===evento)
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    modalRef.result.then(
      (result: any) => {
          const recurso = result.obtenerDatos();
          const recursoAgregar = {
          recursos: [recurso]
          }
          this.recursoService.postRecurso(evento.id,recursoAgregar).subscribe((response:any)=>{
            console.log(response)
            this.eventos[index].recursos.push(response.recursos[0]);
          });
        },
        
      (reason: any) => {}
    );
  }
  validarYCerrarModal(componenteCrearRecurso: any) {
    if ( componenteCrearRecurso.formulario.valid) {
      return true;
    } else {
      
      console.log("ERROR");
      return false;
    }
  }

  showPopupInvitacion(eventoId: string) {
    this.invitacionControlService.setEventoId(eventoId);
    this.invitacionControlService.showPopup();
    
  }

  showPopupRechazarInvitado(modal: any, invitado: any, evento: any){
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    modalRef.result.then(
      (result: any) => {
          this.listaEventosService.eliminarInvitado(evento, invitado).subscribe();
        },
        
      (reason: any) => {}
    );
  }
//Sesgos para la visualización
  formatearHora(hora: string){
      return hora.slice(0, -3);;
    }

  esAdministrador(evento:Evento){
    return evento.asistentes?.find(a => a.participante.usuario.id === this.usuario?.id)?.esAdministrador; 
  }

  usuarioEstaAceptado(evento: Evento){
    return evento.asistentes?.find(a => a.participante.usuario.id === this.usuario?.id)?.estaAceptado;
  }

  redireccionarCrearEvento(): void {
    this.router.navigate(['/eventos', 'crear']);
  }


//Navegaciones a otros Componentes
  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irANotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }

  irAPresentador(): void {
    window.open(`${presentador.url}`);
  }

  visualizarRecurso(evento: any, recurso: Recurso): void {
    this.router.navigate(['/eventos', evento.id, 'recursos', recurso.id ], { state: { recurso: recurso, evento: evento } });
  }

//Google Maps
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.position = (event.latLng.toJSON());
      const coordenadas = event.latLng.toJSON();
    }
  }

  verMapa() {
    this.mostrarMapa = true;
  }

  volverAtras() {
    this.mostrarMapa = false;
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
    window.open(googleMapsLink, '_blank');
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


//Abrir-Cerrar mat-panels
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
  horaInicio: any;
  horaFin: any;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
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