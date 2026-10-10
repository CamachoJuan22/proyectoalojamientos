import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { Alojamiento } from '../models/alojamiento.model';
import { MarketplaceData } from '../models/marketplace-data.model';
import { Resena } from '../models/resena.model';

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private readonly urlDatos = 'assets/data/marketplace-data.json';
  private datos$?: Observable<MarketplaceData>;

  constructor(private http: HttpClient) {}

  // Lee el JSON una sola vez y reutiliza el resultado en las demás consultas
  private cargarDatos(): Observable<MarketplaceData> {
    if (!this.datos$) {
      this.datos$ = this.http
        .get<MarketplaceData>(this.urlDatos)
        .pipe(shareReplay(1));
    }
    return this.datos$;
  }

  // Regla de negocio: no se muestran alojamientos inactivos
  obtenerAlojamientos(): Observable<Alojamiento[]> {
    return this.cargarDatos().pipe(
      map((datos) => datos.alojamientos.filter((a) => a.activo))
    );
  }

  obtenerAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.obtenerAlojamientos().pipe(
      map((lista) => lista.find((a) => a.id === id))
    );
  }

  obtenerResenasPorAlojamiento(alojamientoId: number): Observable<Resena[]> {
    return this.cargarDatos().pipe(
      map((datos) => datos.resenas.filter((r) => r.alojamientoId === alojamientoId))
    );
  }
}
