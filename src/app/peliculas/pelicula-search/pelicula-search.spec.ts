import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaSearch } from './pelicula-search';

describe('PeliculaSearch', () => {
  let component: PeliculaSearch;
  let fixture: ComponentFixture<PeliculaSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculaSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
