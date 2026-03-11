import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certidao',
  imports: [DatePipe],
  templateUrl: './certidao.html',
  styleUrl: './certidao.scss',
})
export class Certidao {
  dataAtual = new Date();
}
