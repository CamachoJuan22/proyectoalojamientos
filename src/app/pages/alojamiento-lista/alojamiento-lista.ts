import { Component, OnInit } from '@angular/core';

import { Alojamiento } from '../../models/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-alojamiento-lista',
  standalone: false,
  templateUrl: './alojamiento-lista.html',
  styleUrl: './alojamiento-lista.css',
})
export class AlojamientoLista implements OnInit {
  alojamientos: Alojamiento[] = [];
  ciudades: string[] = [];
  tipos: string[] = [];

  cargando = true;
  hayError = false;

  filtroCiudad = '';
  filtroTipo = '';
  filtroHuespedes: number | null = null;
  filtroPrecioMax: number | null = null;

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    this.alojamientoService.obtenerAlojamientos().subscribe({
      next: (lista) => {
        this.alojamientos = lista;
        this.ciudades = [...new Set(lista.map((a) => a.ciudad))].sort();
        this.tipos = [...new Set(lista.map((a) => a.tipo))].sort();
        this.cargando = false;
      },
      error: () => {
        this.hayError = true;
        this.cargando = false;
      },
    });
  }

  get alojamientosFiltrados(): Alojamiento[] {
    return this.alojamientos.filter((a) => {
      const coincideCiudad = !this.filtroCiudad || a.ciudad === this.filtroCiudad;
      const coincideTipo = !this.filtroTipo || a.tipo === this.filtroTipo;
      const coincideHuespedes =
        !this.filtroHuespedes || this.filtroHuespedes <= 0 || a.capacidad >= this.filtroHuespedes;
      const coincidePrecio =
        !this.filtroPrecioMax || this.filtroPrecioMax <= 0 || a.precioNoche <= this.filtroPrecioMax;

      return coincideCiudad && coincideTipo && coincideHuespedes && coincidePrecio;
    });
  }

  limpiarFiltros(): void {
    this.filtroCiudad = '';
    this.filtroTipo = '';
    this.filtroHuespedes = null;
    this.filtroPrecioMax = null;
  }
}
