import { Component, Input } from '@angular/core';

import { Alojamiento } from '../../models/alojamiento.model';
import { Cotizacion } from '../../models/cotizacion.model';
import { CotizacionService } from '../../services/cotizacion.service';

@Component({
  selector: 'app-cotizador',
  standalone: false,
  templateUrl: './cotizador.html',
  styleUrl: './cotizador.css',
})
export class Cotizador {
  @Input({ required: true }) alojamiento!: Alojamiento;

  fechaLlegada = '';
  fechaSalida = '';
  huespedes: number | null = 1;

  errores: string[] = [];
  cotizacion: Cotizacion | null = null;

  constructor(private cotizacionService: CotizacionService) {}

  get hoy(): string {
    return this.cotizacionService.hoy();
  }

  // Si el usuario cambia un dato, la cotización anterior deja de ser válida
  alCambiar(): void {
    this.cotizacion = null;
    this.errores = [];
  }

  cotizar(): void {
    this.errores = this.cotizacionService.validar(
      this.alojamiento,
      this.fechaLlegada,
      this.fechaSalida,
      this.huespedes,
    );

    if (this.errores.length === 0 && this.huespedes !== null) {
      this.cotizacion = this.cotizacionService.cotizar(
        this.alojamiento,
        this.fechaLlegada,
        this.fechaSalida,
        this.huespedes,
      );
    } else {
      this.cotizacion = null;
    }
  }
}
