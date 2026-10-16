import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Actor } from '../domain/actor.domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private http = inject(HttpClient); // inyección de HttpClient
  private url:string = environment.API_URL;
 
  actores = this.http.get<Actor[]>(`${this.url}actores`);

  constructor() { }

  // Método para obtener los actores de manera reactiva
  getActores(): Observable<Actor[]> {
    return this.actores;
  }

}
