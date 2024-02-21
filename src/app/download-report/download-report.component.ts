import { Component, OnInit } from '@angular/core';
import { DialogSecurityComponent } from '../dialogs/dialog-security/dialog-security.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collection, getDocs, orderBy, query } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-download-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-report.component.html',
  styleUrl: './download-report.component.css'
})
export class DownloadReportComponent implements OnInit {

  showButton = false

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.openConfirmationModal();
  }

  openConfirmationModal() {
    const dialogRef = this.dialog.open(DialogSecurityComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) this.showButton = true
      else {
        this.router.navigate(['']);
      }
    });
  }

  async download() {
    const workbook = XLSX.utils.book_new();
    const worksheet = await this.generateWorksheet();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

  async generateWorksheet(): Promise<XLSX.WorkSheet> {
    const usersData = await this.getDocuments();
    const headers = [
      // 'ID', 
      'Nombre', 
      'Asistencia', 
      // 'Fecha'
    ];

    const data: any[][] = [headers];

    usersData.forEach(user => {
      const userData = [
        // user.id,
        user.name,
        user.asistencia ? 'Sí' : 'No',
        // user.fecha ? user.fecha.toDate().toLocaleString() : ''
      ];
      data.push(userData);
    });

    return XLSX.utils.aoa_to_sheet(data);
  }

  async getDocuments(): Promise<any[]> {
    const testCol = collection(this.firestore, "usuarios");
    
    const q = query(testCol, orderBy('fecha', 'asc'));

    try {
      const querySnapshot = await getDocs(q);
      const usersData: any[] = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        usersData.push(userData);
      });
      return usersData;
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      return [];
    }
  }
}
