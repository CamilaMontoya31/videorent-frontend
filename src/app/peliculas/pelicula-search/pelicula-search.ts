import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';
import { Pelicula } from '../../domain/pelicula.domain';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-pelicula-search',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pelicula-search.html',
  styleUrls: ['./pelicula-search.css']
})
export class PeliculaSearch {
  private readonly fb = inject(FormBuilder); //inyecta el form, es como un Autowired
  private readonly peliculaService = inject(PeliculaService);
  private readonly destroyRef = inject(DestroyRef);

  readonly searchForm = this.fb.nonNullable.group({
    titulo: '',
    genero: '',
  });


  readonly resultados = signal<Pelicula[]>([]);
  readonly loading = signal(false);
  readonly searched = signal(false);
  readonly error = signal<string | null>(null);
  
 //testing
  buscar_profe():void{
    console.log("Buscando peliculas con titulo: ", 
      this.searchForm.get('titulo')?.value, 
      " y genero: ", this.searchForm.get('genero')?.value);
  }

  buscar(): void {
    const { titulo, genero } = this.searchForm.getRawValue();

    this.loading.set(true);
    this.searched.set(true);
    this.error.set(null);

    this.peliculaService
      .findMovies(titulo.trim(), genero.trim())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.error.set('No se pudieron cargar las películas.');
          return of([] as Pelicula[]);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((peliculas) => this.resultados.set(peliculas)); 
      console.log(this.resultados());
      console.log(this.error());
  }

   limpiar(): void {
    this.searchForm.reset({ titulo: '', genero: '' });
    this.resultados.set([]);
    this.loading.set(false);
    this.searched.set(false);
    this.error.set(null);
  }

  trackByPeliculaId(index: number, pelicula: Pelicula): number {
    return pelicula.peliculaId ?? index;
  }
}


