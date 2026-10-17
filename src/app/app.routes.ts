import { Routes } from '@angular/router';
import { PeliculaInsertReactiveComponent } from './peliculas/pelicula-insert-reactive.component/pelicula-insert-reactive.component';
import { PeliculaSearch } from './peliculas/pelicula-search/pelicula-search';


export const routes: Routes = [
    { path: 'buscar-pelicula', component: PeliculaSearch },
    { path: 'insertar-pelicula', component: PeliculaInsertReactiveComponent }
];