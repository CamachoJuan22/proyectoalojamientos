import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { Navbar } from './components/navbar/navbar';
import { Inicio } from './pages/inicio/inicio';
import { AlojamientoLista } from './pages/alojamiento-lista/alojamiento-lista';
import { AlojamientoDetalle } from './pages/alojamiento-detalle/alojamiento-detalle';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

@NgModule({
  declarations: [
    App,
    Navbar,
    Inicio,
    AlojamientoLista,
    AlojamientoDetalle,
    MisReservas,
    NoEncontrado,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
