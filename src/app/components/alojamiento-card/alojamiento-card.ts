import { Component, Input } from '@angular/core';

import { Alojamiento } from '../../models/alojamiento.model';

@Component({
  selector: 'app-alojamiento-card',
  standalone: false,
  templateUrl: './alojamiento-card.html',
  styleUrl: './alojamiento-card.css',
})
export class AlojamientoCard {
  @Input({ required: true }) alojamiento!: Alojamiento;
}
