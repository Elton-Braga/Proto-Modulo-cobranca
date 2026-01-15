import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export interface AlertDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

@Component({
  selector: 'app-alert-dialog',
  imports: [
    // ... other modules
    MatDialogModule,
    NgIf,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Atenção' }}</h2>

    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button
        type="button"
        *ngIf="data.showCancel"
        (click)="close(false)"
        class="btn btn-secondary"
      >
        {{ data.cancelText || 'Não' }}
      </button>

      <button type="button" (click)="close(true)" class="btn btn-primary">
        {{ data.confirmText || 'OK' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class AlertDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  close(result: boolean): void {
    this.dialogRef.close(result);
  }
}
