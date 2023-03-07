import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialogue',
  templateUrl: './confirmation-dialogue.component.html',
  styleUrls: ['./confirmation-dialogue.component.css'],
})
export class ConfirmationDialogueComponent {
  justUpdate = true;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {

  }
  onNoClick(): void {
    this.justUpdate = false;
    this.dialogRef.close();
  }
}
