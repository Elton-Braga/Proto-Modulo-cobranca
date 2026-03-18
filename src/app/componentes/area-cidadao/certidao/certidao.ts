import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-certidao',
  standalone: true,
  imports: [DatePipe, MatIconModule],
  templateUrl: './certidao.html',
  styleUrl: './certidao.scss',
})
export class Certidao {
  dataAtual = new Date();
}
