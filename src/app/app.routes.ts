import { Routes } from '@angular/router';
import { PeliculaSearch } from './peliculas/pelicula-search/pelicula-search';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'buscar-pelicula' },
    { path: 'buscar-pelicula', component: PeliculaSearch },
    { path: '**', redirectTo: 'buscar-pelicula' },

];