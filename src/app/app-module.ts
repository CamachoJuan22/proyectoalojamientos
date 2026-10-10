import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { AlojamientoCard } from './components/alojamiento-card/alojamiento-card';
import { Cotizador } from './components/cotizador/cotizador';
import { Inicio } from './pages/inicio/inicio';
import { AlojamientoLista } from './pages/alojamiento-lista/alojamiento-lista';
import { AlojamientoDetalle } from './pages/alojamiento-detalle/alojamiento-detalle';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

@NgModule({
  declarations: [
    App,
    Navbar,
    AlojamientoCard,
    Cotizador,
    Inicio,
    AlojamientoLista,
    AlojamientoDetalle,
    MisReservas,
    NoEncontrado,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
