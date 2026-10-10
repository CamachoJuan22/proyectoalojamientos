import { Component, OnInit } from '@angular/core';

import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  destacados: Alojamiento[] = [];
  cargando = true;
  hayError = false;

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    this.alojamientoService.obtenerAlojamientos().subscribe({
      next: (lista) => {
        // Los destacados son los 3 alojamientos activos con mejor calificación
        this.destacados = [...lista]
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, 3);
        this.cargando = false;
      },
      error: () => {
        this.hayError = true;
        this.cargando = false;
      },
    });
  }
}
