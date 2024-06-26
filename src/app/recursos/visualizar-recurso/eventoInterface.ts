export interface Evento {
    id:             number;
    nombre:         string;
    ubicacion:      Ubicacion;
    fechaHora:      string;
    eventoAnterior: null;
    esVisible:      boolean;
    tipoEvento:     string;
    creador:        Creador;
}

export interface Creador {
    id:            number;
    nombreUsuario: string;
}

export interface Ubicacion {
    id:        number;
    calle:     string;
    altura:    number;
    localidad: string;
    latitud:   number;
    longitud:  number;
}
