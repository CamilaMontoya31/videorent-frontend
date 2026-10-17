import { Routes } from '@angular/router';
import { PeliculaInsertReactiveComponent } from './peliculas/pelicula-insert-reactive.component/pelicula-insert-reactive.component';
import { PeliculaSearch } from './peliculas/pelicula-search/pelicula-search';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'buscar-pelicula' },
    { path: 'buscar-pelicula', component: PeliculaSearch },
    { path: '**', redirectTo: 'buscar-pelicula' },
    { path: '', pathMatch: 'full', redirectTo: 'insertar-pelicula' },
     { path: 'insertar-pelicula', component: PeliculaInsertReactiveComponent },
    { path: '**', redirectTo: 'insertar-pelicula' }

];