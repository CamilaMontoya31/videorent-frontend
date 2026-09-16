import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly fb = inject(FormBuilder);
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
      .subscribe(peliculas => this.resultados.set(peliculas));
  }

  limpiar(): void {
    this.searchForm.reset({ titulo: '', genero: '' });
    this.resultados.set([]);
    this.loading.set(false);
    this.searched.set(false);
    this.error.set(null);
  }

  //interesante el _ yellow
  trackByPeliculaId(_: number, pelicula: Pelicula): number {
    return pelicula.peliculaId ?? _;
    // return pelicula.peliculaId; en ppt
  }
}


