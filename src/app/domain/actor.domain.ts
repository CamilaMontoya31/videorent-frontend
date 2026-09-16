export class Actor{
    actorId?:number;
    nombreActor?:string;
    apellidosActor?:string;
    
    constructor(id:number, nombre:string, apellidos: string){
        this.actorId = id;
        this.nombreActor = nombre;
        this.apellidosActor = apellidos;
    }
}