import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pelicula } from '../domain/pelicula.domain';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
 
@Injectable({
    providedIn: 'root'
})
export class PeliculaService {
 
private apiUrl: string = `${environment.API_URL}peliculas`;
 
constructor(private http: HttpClient){}
 
findMovies(titulo: string ='', genero:string=''):Observable<Pelicula[]>{
 
const params= new HttpParams()
.set('titulo',titulo ??'')
.set('genero',genero ??'');
 
//peticion http get
return this.http
.get<Pelicula[] | null>(this.apiUrl,{params})
.pipe(map(response => response ?? []));
}
 
 
}