import { Injectable } from '@angular/core';

import { Alojamiento } from '../models/alojamiento.model';
import { Cotizacion } from '../models/cotizacion.model';

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  // Regla de negocio: la tarifa de servicio es el 10 % del subtotal
  private readonly PORCENTAJE_TARIFA_SERVICIO = 0.1;

  // Fecha actual en formato yyyy-MM-dd, usando la zona horaria local
  hoy(): string {
    const ahora = new Date();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    return `${ahora.getFullYear()}-${mes}-${dia}`;
  }

  // Convierte yyyy-MM-dd en una fecha local (evita desfases por zona horaria)
  private convertirFecha(fecha: string): Date {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  calcularNoches(fechaLlegada: string, fechaSalida: string): number {
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const diferencia =
      this.convertirFecha(fechaSalida).getTime() - this.convertirFecha(fechaLlegada).getTime();
    return Math.round(diferencia / milisegundosPorDia);
  }

  // Devuelve la lista de errores. Si está vacía, la cotización es válida
  validar(
    alojamiento: Alojamiento,
    fechaLlegada: string,
    fechaSalida: string,
    huespedes: number | null,
  ): string[] {
    const errores: string[] = [];

    if (!fechaLlegada) {
      errores.push('Selecciona la fecha de llegada.');
    } else if (fechaLlegada < this.hoy()) {
      errores.push('La fecha de llegada no puede ser anterior a la fecha actual.');
    }

    if (!fechaSalida) {
      errores.push('Selecciona la fecha de salida.');
    } else if (fechaLlegada && fechaSalida <= fechaLlegada) {
      errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
    }

    if (huespedes === null || !Number.isInteger(huespedes) || huespedes <= 0) {
      errores.push('El número de huéspedes debe ser un número entero mayor que cero.');
    } else if (huespedes > alojamiento.capacidad) {
      errores.push(
        `El número de huéspedes no puede superar la capacidad del alojamiento (${alojamiento.capacidad}).`,
      );
    }

    if (alojamiento.precioNoche <= 0) {
      errores.push('El precio por noche del alojamiento no es válido.');
    }

    return errores;
  }

  // Se debe llamar solo después de validar sin errores
  cotizar(
    alojamiento: Alojamiento,
    fechaLlegada: string,
    fechaSalida: string,
    huespedes: number,
  ): Cotizacion {
    const noches = this.calcularNoches(fechaLlegada, fechaSalida);
    const subtotal = noches * alojamiento.precioNoche;
    const tarifaLimpieza = alojamiento.tarifaLimpieza;
    const tarifaServicio = Math.round(subtotal * this.PORCENTAJE_TARIFA_SERVICIO);
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    return {
      alojamientoId: alojamiento.id,
      fechaLlegada,
      fechaSalida,
      huespedes,
      noches,
      precioNoche: alojamiento.precioNoche,
      subtotal,
      tarifaLimpieza,
      tarifaServicio,
      total,
    };
  }
}
