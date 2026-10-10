import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Alojamiento } from '../../models/alojamiento.model';
import { Resena } from '../../models/resena.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-alojamiento-detalle',
  standalone: false,
  templateUrl: './alojamiento-detalle.html',
  styleUrl: './alojamiento-detalle.css',
})
export class AlojamientoDetalle implements OnInit {
  alojamiento?: Alojamiento;
  resenas: Resena[] = [];
  imagenSeleccionada = '';

  cargando = true;
  hayError = false;

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
  ) {}

  ngOnInit(): void {
    // Se suscribe al parámetro de la ruta para reaccionar si el id cambia
    this.route.paramMap.subscribe((params) => {
      this.cargarAlojamiento(Number(params.get('id')));
    });
  }

  private cargarAlojamiento(id: number): void {
    this.cargando = true;
    this.hayError = false;
    this.alojamiento = undefined;
    this.resenas = [];

    // Un id no numérico o menor que 1 se trata como "no encontrado"
    if (!Number.isInteger(id) || id <= 0) {
      this.cargando = false;
      return;
    }

    forkJoin({
      alojamiento: this.alojamientoService.obtenerAlojamientoPorId(id),
      resenas: this.alojamientoService.obtenerResenasPorAlojamiento(id),
    }).subscribe({
      next: ({ alojamiento, resenas }) => {
        this.alojamiento = alojamiento;
        this.resenas = resenas;
        this.imagenSeleccionada = alojamiento?.imagenPrincipal ?? '';
        this.cargando = false;
      },
      error: () => {
        this.hayError = true;
        this.cargando = false;
      },
    });
  }

  seleccionarImagen(imagen: string): void {
    this.imagenSeleccionada = imagen;
  }
}
