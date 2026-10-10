import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { AlojamientoLista } from './pages/alojamiento-lista/alojamiento-lista';
import { AlojamientoDetalle } from './pages/alojamiento-detalle/alojamiento-detalle';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'alojamientos', component: AlojamientoLista },
  { path: 'alojamientos/:id', component: AlojamientoDetalle },
  { path: 'mis-reservas', component: MisReservas },
  { path: '**', component: NoEncontrado },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
