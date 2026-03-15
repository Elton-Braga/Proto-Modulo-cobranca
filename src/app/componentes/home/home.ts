import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Assinatura } from '../area-cidadao/assinatura/assinatura';
//import { Assinatura } from '../assinatura/assinatura';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Assinatura],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  abrirModal = false;

  abrirAssinatura(): void {
    this.abrirModal = true;
  }

  fecharModal(): void {
    this.abrirModal = false;
  }
}
