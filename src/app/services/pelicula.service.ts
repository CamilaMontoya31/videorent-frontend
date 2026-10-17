import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pelicula } from '../domain/pelicula.domain';
 
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
   // Method to save a new pelicula

  // Método modificado con catchError
  guardarPelicula(pelicula: any): Observable<any> { 
    return this.http.post<any>(this.apiUrl, pelicula).pipe(
      catchError(this.handleError) // Intercepta el error aquí
    );
  }

  // Método privado para procesar el error
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error en el servicio:', error);
    // Retorna un error observable con un mensaje amigable para el componente
    return throwError(() => new Error('Error al comunicarse con el servidor.'));
  }
  

}
