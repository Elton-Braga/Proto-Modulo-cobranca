import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-emitir-gru',
  templateUrl: './emitir-gru.html',
  styleUrls: ['./emitir-gru.scss'],
})
export class EmitirGRU {
  beneficiario: string | null | any;

  constructor() {
    const dado = sessionStorage.getItem('beneficiarioSelecionado');
    this.beneficiario = dado ? JSON.parse(dado) : null;
    console.log('Beneficiário carregado:', this.beneficiario);
  }
}
