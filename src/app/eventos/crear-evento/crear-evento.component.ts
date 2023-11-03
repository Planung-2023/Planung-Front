import { Paso5Component } from './../paso5/paso5.component';
import { Paso4Component } from './../paso4/paso4.component';
import { Paso3Component } from './../paso3/paso3.component';
import { Paso2Component } from './../paso2/paso2.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paso1Component } from '../paso1/paso1.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrearEventoService } from '../crear-evento.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit{
  @ViewChild('paso1', { read: Paso1Component }) paso1Component: Paso1Component | undefined;
  @ViewChild('paso2', { read: Paso2Component }) paso2Component: Paso2Component | undefined;
  @ViewChild('paso3', { read: Paso3Component }) paso3Component: Paso3Component | undefined;
  @ViewChild('paso4', { read: Paso4Component }) paso4Component: Paso4Component | undefined;
  @ViewChild('paso5', { read: Paso5Component }) paso5Component: Paso5Component | undefined;
  @ViewChild('errorModalContent') errorModalContent: any;

  pasoActual: number = 0;
  ultimoPaso: number = 4;
  titulos: string[] = ["Nombre y Fecha","Formalidad y Privacidad","Lugar","Objetos","Confirmación"];
  pasos: any[] = [
    {
      numero: 0,
      titulo: this.titulos[this.pasoActual]
    },
    {
      numero: 1,
      titulo: ""
    },
    {
      numero: 2,
      titulo: ""
    },
    {
      numero: 3,
      titulo: ""
    },
    {
      numero: 4,
      titulo: ""
    }


  ];
  tituloPasoActual: string = this.titulos[this.pasoActual];

  constructor(
    private modal: NgbModal,
    private service: CrearEventoService,
    private sb: FormBuilder,
  ) {}
  
  pasoAnterior(){
    this.pasos[this.pasoActual].titulo = "";
    if(this.pasoActual > 0){
      this.pasoActual--;
    }
    this.pasos[this.pasoActual].titulo = this.titulos[this.pasoActual];
  }
  proximoPaso(){
    this.pasos[this.pasoActual].titulo = "";

    if(this.pasoActual==0){this.traerDatosPaso1();} 
    if(this.pasoActual==1){this.traerDatosPaso2();} 
    if(this.pasoActual==2){this.traerDatosPaso3();} 
    if(this.pasoActual==3){this.traerDatosPaso4();} 
    if(this.pasoActual === 4) {
      this.paso5Component?.setDatos(this.pasarDatos());
    }

    this.pasos[this.pasoActual].titulo = this.titulos[this.pasoActual];
    
    const formularioActual = this.getPasoActual(this.pasoActual)?.formulario;
    if (this.pasoActual <= this.ultimoPaso && formularioActual?.valid) {
      this.pasoActual++;
    } else {
      this.openError(),
      console.log('No está completo el formulario')
    }
  }
  openError() {
    this.modal.open(this.errorModalContent, { centered: true, size: 'md' }).result.then(
      (result) => {
      },
      (reason) => {
      }
    )
  }
  ngOnInit() {
    
  }
  getPasoActual(pasoActual:number){
    if(pasoActual===0){return this.paso1Component;}
    if(pasoActual===1){return this.paso2Component;}
    if(pasoActual===2){return this.paso3Component;}
    if(pasoActual===3){return this.paso4Component;}
    else return this.paso5Component;
  }
    
  irAPaso1(){this.pasoActual = 0;}
  irAPaso2(){this.pasoActual = 1;}
  irAPaso3(){this.pasoActual = 2;}
  irAPaso4(){this.pasoActual = 3;}
  
traerDatosPaso1(): any {
  if (this.paso1Component) {return this.paso1Component.getDatosPaso1();}
  else return {};
}
traerDatosPaso2():any{
  if (this.paso2Component) {return this.paso2Component.getDatosPaso2();}
  else return {};
}
traerDatosPaso3():any{
  if (this.paso3Component) {return this.paso3Component.getDatosPaso3();}
  else return {};
}
traerDatosPaso4():any{
  if (this.paso4Component) {return this.paso4Component.getDatosPaso4();}
  else return {};
}

pasarDatos(){
  return {
    paso1: this.traerDatosPaso1(),
    paso2: this.traerDatosPaso2(),
    paso3: this.traerDatosPaso3(),
    paso4: this.traerDatosPaso4(),
  }
}

crearEvento(){
  const datosOrdenados = new FormGroup({
    evento: this.sb.group({
      nombre: new FormControl(this.pasarDatos().paso1.nombre),
      fecha: new FormControl(this.pasarDatos().paso1.fecha),
      horaInicio: new FormControl(this.pasarDatos().paso1.horaInicio),
      horaFin: new FormControl(this.pasarDatos().paso1.horaFin),
      descripcion: new FormControl(this.pasarDatos().paso1.descripcion),
      tipoEvento: new FormControl(this.pasarDatos().paso2.tipoEvento),
      tipoInvitacion: new FormControl(this.pasarDatos().paso2.tipoInvitacion),
      ubicacion: this.sb.group({
        latitud: new FormControl(this.pasarDatos().paso3.latitud),
        longitud: new FormControl(this.pasarDatos().paso3.longitud),
        ciudad: new FormControl(this.pasarDatos().paso3.ciudad),
        localidad: new FormControl(this.pasarDatos().paso3.barrio),
        calle: new FormControl(this.pasarDatos().paso3.calle),
        altura: new FormControl(this.pasarDatos().paso3.numero)
      }),
      recursos: new FormControl(this.pasarDatos().paso4.recursos),
    })
  });
  
  console.log(datosOrdenados.value);
  this.service.crearEvento(datosOrdenados.value).subscribe({
    next: (v:any) => {
    },
    error: (e:any) => {
      console.log(e);
    },
    complete: () => {
      
    },
  });
  
}
}
