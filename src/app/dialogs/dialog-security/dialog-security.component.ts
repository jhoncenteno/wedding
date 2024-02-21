import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dialog-security',
  standalone: true,
  imports: [
    // NgbModalModule, 
    CommonModule,
    FormsModule, 
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dialog-security.component.html',
  styleUrl: './dialog-security.component.css'
})
export class DialogSecurityComponent {

  
  textoConfirmacion: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogSecurityComponent>,
  ) { }

  ngOnInit(): void {
  }

  onEnterPress() {
    if (this.textoConfirmacion === 'CONFIRMAR') {
      this.dialogRef.close(true);
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
