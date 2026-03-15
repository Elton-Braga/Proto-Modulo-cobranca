import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MOCK_BENEFICIARIOS } from '../../../mock/MOCK_BENEFICIATIO';
//import { MOCK_BENEFICIARIOS } from '../mock-beneficiarios';

@Component({
  selector: 'app-assinatura',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './assinatura.html',
  styleUrl: './assinatura.scss',
})
export class Assinatura {
  @Output() fechar = new EventEmitter<void>();

  beneficiario = MOCK_BENEFICIARIOS[0];

  get titular() {
    return this.beneficiario.titular;
  }

  get conjuge() {
    return this.beneficiario.conjuge;
  }

  get endereco() {
    return this.beneficiario.endereco[0];
  }

  get projeto() {
    return this.beneficiario.projeto_assentamento[0];
  }

  fecharModal(): void {
    this.fechar.emit();
  }
}
